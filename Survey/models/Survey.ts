import { surveyCollection } from "../mongo.ts";

export default class Survey {
  public id?: string = '';

  constructor(
    public userId: string,
    public name: string,
    public description: string
  ){

  }

  static async findByUser(userId: string) {
    return surveyCollection.find({userId}, { noCursorTimeout:false });
  }

  async create() {
    delete this.id;
    const $obj = await surveyCollection.insertOne(this);
    
    this.id = $obj.toString(); // MongoDB get inserted ID
    return this;
  }
}