import { RouterContext, create, verify, getNumericDate } from '../deps.ts';
import type { Header, Payload } from '../deps.ts';
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import User from '../models/User.ts';

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

const header: Header = {
  alg: "HS512",
  typ: "JWT"
}

class AuthController {
  async login({ request, response }: { request: any; response: any }) {
    const body = request.body();
    const {email, password} = await body.value;
    if(!email || !password) {
      response.status = 422;
      response.body = { message: "Please provide email or password" };
      return;
    }

    let user = await User.findOne({email});
    if(!user) {
      response.status = 422;
      response.body = { message: "User does not exist" };
      return;
    }

    if(!bcrypt.compareSync(password, user.password)){
      response.status = 422;
      response.body = { message: "Incorrect password" };
      return;
    }
    
    const payload: Payload = {
      iss: user.email,
      exp: getNumericDate(60 * 60)
    }

    const jwt = await create(header, payload, key);

    response.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      jwt
    }

  }

  async register({ request, response }: { request: any; response: any }) {
    const body = request.body();
    const {name, email, password} = await body.value;
    
    let user = await User.findOne({email});
    if(user) {
      response.status = 422;
      response.body = {message: "Email is already used."};
      return;
    }

    const hashPass = bcrypt.hashSync(password);
    user = new User({name, email, password: hashPass});
    await user.save();
    response.status = 201;
    response.body = {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}

const authController = new AuthController();

export default authController;
