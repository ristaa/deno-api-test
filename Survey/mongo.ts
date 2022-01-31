import {MongoClient} from "./deps.ts";

const client = new MongoClient();
// TODO: Set mongodb uri in .env file with dotenv lib
await client.connect("mongodb+srv://deno_survey:RISTA23sarme@denosurvey.ytzez.mongodb.net/DenoSurvey?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-1");

const db = client.database("deno_survey");

export const usersCollection = db.collection("users");
export const memeCollection = db.collection("memes");
