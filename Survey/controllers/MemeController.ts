import { RouterContext, create, verify, getNumericDate } from '../deps.ts';
import Meme from '../models/Meme.ts';

class MemeController {
  async getAllForUser({ request, response }: { request: any; response: any }) {
    // TODO
    response.body = await Meme.findByUser('1');
  }

  async getSingle({ request, response }: { request: any; response: any }) {

  }

  async create({ request, response }: { request: any; response: any }) {
    const body = request.body();
    const { name, description } = await body.value;

    // TODO
    const meme = new Meme('1', name, description);
    await meme.create();

    response.status = 201;
    response.body = meme;
  }

  async update({ request, response }: { request: any; response: any }) {

  }

  async delete({ request, response }: { request: any; response: any }) {

  }
}

const memeController = new MemeController();
export default memeController;