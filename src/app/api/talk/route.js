import { execQuery } from "../commonApi";

export async function GET () {
  console.log("hihi");
  const result = await execQuery(`SELECT * FROM talk_result`);
  console.log(result, "result");  
  return Response.json(result);
}