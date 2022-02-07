import { RouterContext, create, verify, getNumericDate } from '../deps.ts';
import Survey from '../models/Survey.ts';

class SurveyController {
  async getAllForUser({ request, response }: { request: any; response: any }) {
    // TODO
    response.body = await Survey.findByUser('1');
  }

  async getSingle({ request, response }: { request: any; response: any }) {

  }

  async create({ request, response }: { request: any; response: any }) {
    const body = request.body();
    const { name, description } = await body.value;

    // TODO
    const survey = new Survey('1', name, description);
    await survey.create();

    response.status = 201;
    response.body = survey;
  }

  async update({ request, response }: { request: any; response: any }) {

  }

  async delete({ request, response }: { request: any; response: any }) {

  }
}

const surveyController = new SurveyController();
export default surveyController;