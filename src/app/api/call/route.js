import { execQuery } from "../commonApi";

export async function GET () {
  const result = await execQuery(`SELECT T.*,C.* FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ORDER BY C.call_result_seq ASC LIMIT 10`);

  return Response.json(result);
}

export async function POST (req, res) {
  const jsonDatas = await req.json();
  const { pagination, count } = jsonDatas;

  let sql = Object.keys(jsonDatas).map(key => {
    if (key === 'pagination' || key === 'count') return '';
    if (key === 'startDate') return `AND C.update_date >= '${jsonDatas.startDate}'`;
    if (key === 'endDate') return `AND C.update_date <= '${jsonDatas.endDate}'`;
    if (key === 'naverId') return `AND T.naver_id LIKE '%${jsonDatas.naverId}%'`;
    if (key === 'blogId') return `AND T.blog_id LIKE '%${jsonDatas.blogId}%'`;
    if (key === 'phone') return `AND T.phone LIKE '%${jsonDatas.phone}%'`;
    if (key === 'result') return `AND C.result = '${jsonDatas.result}'`;
    if (key === 'userSeq') return `AND C.user_seq = '${jsonDatas.userSeq}'`;
    return `AND ${key} = '${jsonDatas[key]}'`;
  }).join(' ');

  if( sql.length > 1 ) {
    let query = sql.replace('AND ', '');
    query = "WHERE " + query;
    const r = await execQuery(`SELECT T.*,C.* FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ${query} LIMIT ${count} OFFSET ${pagination * count}`);
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ${query}`);
    return Response.json({ data: r, count: r_count[0].count });
  } else {
    const r = await execQuery(`SELECT T.*,C.* FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq LIMIT ${count} OFFSET ${pagination * count}`);
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq`);
    return Response.json({ data: r, count: r_count[0].count });
  }
  
  // const r = await execQuery(`SELECT * FROM call_result C LEFT OUTER JOIN target T ON T.target_seq = C.target_seq WHERE
  //   ${ user_seq ? ' C.user_seq = "' + user_seq + '" AND ' : ''} ${ result ? 'C.result = "' + result + '" AND ' : ''}
  //   ${ startDate ? ' C.update_date >= "' + startDate + '" AND ' : ''} ${ endDate ? 'C.update_date <= "' + endDate + '"' : ''} 
  //   ${ searchValue ? ' AND (T.blog_id LIKE "%' + searchValue + '%" OR T.naver_id LIKE "%' + searchValue + '%" OR T.phone LIKE "%' + searchValue + '%")' : ''} LIMIT 10`);
  
  return Response.json(r);
}