import { execQuery } from "../../commonApi";

export async function PUT(req, res) {
  const { result, memo, status, target_seq, user_seq, call_result_seq } = await req.json();
  await execQuery(`UPDATE call_result SET result = '${result}', update_date = NOW() WHERE call_result_seq = ${call_result_seq}`);
  await execQuery(`UPDATE target SET memo = '${memo}', update_date = NOW(), cnt_call = cnt_call + 1, is_receive_ok = '${result === "수신거부" ? 0 : 1}' WHERE target_seq = ${target_seq}`);
  
  console.log("!@#!@#!@!", result, result === "자료요청");
  if( result === "자료요청" ) {
    const talkUserSeq = status === "대기" ? 'NULL' : "'" + user_seq + "'";
    await execQuery(`INSERT INTO talk_result (target_seq, call_user_seq, status, talk_user_seq, memo, create_date, update_date) VALUES ('${target_seq}', '${user_seq}', '${status}', ${talkUserSeq}, NULL, NOW(), NOW())`);
  }
  return Response.json({ status: 'success' });
}