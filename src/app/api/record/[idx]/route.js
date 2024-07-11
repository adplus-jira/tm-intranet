import { execQuery } from '../../commonApi';

export async function GET(request, context) {
  const { idx } = context.params;
  const res = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON C.target_seq = T.target_seq WHERE user_seq = ${idx}`);
  return Response.json(res);
}

export async function POST(request, context) {
  
  const { idx } = context.params;
  const body = await request.json();
  const { pagination, count } = body;
  
  const sql = Object.keys(body).map(key => {
    if (key === 'pagination' || key === 'count') return '';
    if (key === 'startDate') return `AND C.update_date >= '${body.startDate}'`;
    if (key === 'endDate') return `AND C.update_date <= '${body.endDate}'`;
    if (key === 'searchValue') return `AND (T.naver_id LIKE '%${body.searchValue}%' OR T.blog_id LIKE '%${body.searchValue}%' OR T.phone LIKE '%${body.searchValue}%')`;
    return `AND ${key} = '${body[key]}'`;
  }).join(' ');

  const res = await execQuery(`SELECT * FROM call_result C INNER JOIN target T ON C.target_seq = T.target_seq WHERE user_seq = ${idx} ${sql} LIMIT ${count} OFFSET ${pagination * count}`);
  const res_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON C.target_seq = T.target_seq WHERE user_seq = ${idx} ${sql}`);

  return Response.json({ data: res, count: res_count[0].count });
}