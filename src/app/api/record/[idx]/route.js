import { revalidateTag } from 'next/cache';
import { execQuery } from '../../commonApi';

export async function GET(request, context) {
  const { idx } = context.params;
  const url = new URLSearchParams(request.nextUrl.searchParams);
  const pagination = url.get('page') ? (url.get('page') - 1) : 0;
  const count = url.get('count') ? url.get('count') : 10;
  
  let sql = '';
  for (let [key, value] of url) {
    if (key === 'startDate') sql += `AND C.update_date >= '${value}' `;
    if (key === 'endDate') sql += `AND C.update_date <= '${value}' `;
    if (key === 'naverId') sql += `AND T.naver_id LIKE '%${value}%' `;
    if (key === 'blogId') sql += `AND T.blog_id LIKE '%${value}%' `;
    if (key === 'phone') sql += `AND T.phone LIKE '%${value}%' `;
    if (key === 'result') sql += `AND C.result = '${value}' `;
  }

  if(sql.length > 1) {
    let query = sql.replace('AND ', '');
    query = "WHERE user_seq=" + idx + " AND " + query;

    const r = await execQuery(`SELECT * FROM call_result C INNER JOIN target T ON C.target_seq = T.target_seq ${query} LIMIT ${count} OFFSET ${pagination * count}`);
    console.log(`SELECT * FROM call_result C INNER JOIN target T ON C.target_seq = T.target_seq ${query} LIMIT ${count} OFFSET ${pagination * count}`);
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ${query}`);
    revalidateTag("records");

    return Response.json({ data: r, count: r_count[0].count });
  } else {
    const r = await execQuery(`SELECT * FROM call_result C INNER JOIN target T ON C.target_seq = T.target_seq WHERE user_seq = ${idx} LIMIT ${count} OFFSET ${pagination * count}`);
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq WHERE user_seq = ${idx}`);
    revalidateTag("records");

    return Response.json({ data: r, count: r_count[0].count });
  }
}

// export async function POST(request, context) {
  
//   const { idx } = context.params;
//   const body = await request.json();
//   const { pagination, count } = body;
  
//   const sql = Object.keys(body).map(key => {
//     if (key === 'pagination' || key === 'count') return '';
//     if (key === 'startDate') return `AND C.update_date >= '${body.startDate}'`;
//     if (key === 'endDate') return `AND C.update_date <= '${body.endDate}'`;
//     if (key === 'searchValue') return `AND (T.naver_id LIKE '%${body.searchValue}%' OR T.blog_id LIKE '%${body.searchValue}%' OR T.phone LIKE '%${body.searchValue}%')`;
//     return `AND ${key} = '${body[key]}'`;
//   }).join(' ');

//   const res = await execQuery(`SELECT * FROM call_result C INNER JOIN target T ON C.target_seq = T.target_seq WHERE user_seq = ${idx} ${sql} LIMIT ${count} OFFSET ${pagination * count}`);
//   const res_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON C.target_seq = T.target_seq WHERE user_seq = ${idx} ${sql}`);

//   return Response.json({ data: res, count: res_count[0].count });
// }