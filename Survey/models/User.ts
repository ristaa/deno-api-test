import { usersCollection } from "../mongo.ts";

export default class User {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;

  constructor({id = "", name = "", email = "", password = ""}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async findOne(params: object) {
    const user = await usersCollection.findOne(params, { noCursorTimeout:false });
    if(user){
      user.id = user._id.toString();
      delete user._id;
      return new User(user);
    }
    return;
  }

  async save() {
    delete this.id;
    const $obj = await usersCollection.insertOne(this);
    
    this.id = $obj.toString(); // MongoDB get inserted ID
    return this;
  }
}