import { execQuery } from "../commonApi";

export async function GET () {
  const result = await execQuery(`SELECT T.*,C.* FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ORDER BY C.call_result_seq ASC LIMIT 10`);

  return Response.json(result);
}

export async function POST (req, res) {
  const jsonDatas = await req.json();
  const { user_seq, result, startDate, endDate, searchValue } = jsonDatas;
  
  const r = await execQuery(`SELECT * FROM call_result C LEFT OUTER JOIN target T ON T.target_seq = C.target_seq WHERE
    ${ user_seq ? ' C.user_seq = "' + user_seq + '" AND ' : ''} ${ result ? 'C.result = "' + result + '" AND ' : ''}
    ${ startDate ? ' C.update_date >= "' + startDate + '" AND ' : ''} ${ endDate ? 'C.update_date <= "' + endDate + '"' : ''} 
    ${ searchValue ? ' AND (T.blog_id LIKE "%' + searchValue + '%" OR T.naver_id LIKE "%' + searchValue + '%" OR T.phone LIKE "%' + searchValue + '%")' : ''} LIMIT 10`);
  
  return Response.json(r);
}