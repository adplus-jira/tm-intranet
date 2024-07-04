import { execQuery } from "../../commonApi";

export async function PUT(req, res) {
  const { result, memo, target_seq, user_seq } = await req.json();
  await execQuery(`UPDATE call_result SET result = '${result}'`);

  return Response.json({ status: 'success' });
}