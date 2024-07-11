import { execQuery } from "../../commonApi";

export async function POST(req, res) {
  const { idx } = await req.json();
  const proceeding = await execQuery(`SELECT * FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq WHERE C.user_seq = '${idx}' AND result = '대기' ORDER BY call_result_seq DESC LIMIT 1`);
  
  // 사용자가 원래 하고 있던 항목
  if( proceeding.length ) {
    return Response.json(proceeding);
  } else {
    // // 새로운 데이터 load
    // const result = await execQuery(`SELECT * FROM target T LEFT OUTER JOIN call_result C ON T.target_seq = C.target_seq WHERE T.is_receive_ok='1' AND (C.result != '0' OR C.result IS NULL) ORDER BY T.cnt_call ASC LIMIT 1`);
    const r = await execQuery(`INSERT INTO call_result (target_seq, user_seq, result, create_date, update_date) SELECT T.target_seq, '${idx}', '대기', NOW(), NOW() FROM target T LEFT OUTER JOIN call_result C ON T.target_seq = C.target_seq
       WHERE T.is_receive_ok='1' AND (C.result != '대기' OR C.result IS NULL) ORDER BY T.cnt_call ASC LIMIT 1`);
      
    const result = await execQuery(`SELECT * FROM call_result C LEFT OUTER JOIN target T ON T.target_seq = C.target_seq WHERE C.user_seq = '${idx}' ORDER BY C.call_result_seq DESC LIMIT 1`)
    
    return Response.json(result);
  }
}