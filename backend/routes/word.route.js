import { wordPost } from "../models/word.model";
import { wordGet } from "../moels/word.model";

export async function GET(req, res) {}

export async function POST(req, res) {
  const body = await res.json();
  const { id, word } = body;
  const query = `
    INSERT INTO words (id, word)
    VALUES (?, ?)
  `;
  const values = [id, word];

  let status, resBody;
  await wordPost(query, values)
    .then(() => {
      status = 200;
      resBody = { message: "successfully created word" };
    })
    .catch((err) => {
      status = 400;
      resBody = err;
    });
  
  return Response.json(resBody, {
    status
  });
}
