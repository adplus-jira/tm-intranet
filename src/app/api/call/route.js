import { revalidateTag } from "next/cache";
import { execQuery } from "../commonApi";

export async function GET (req, context) {
  const url = new URLSearchParams(req.nextUrl.searchParams);
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
    if (key === 'userSeq') sql += `AND C.user_seq = '${value}' `;
  }

  if (sql.length > 1) {
    let query = sql.replace('AND ', '');
    query = "WHERE " + query;

    const r = await execQuery(`SELECT T.*,C.*, (SELECT user_name FROM user WHERE C.user_seq = user.user_seq) AS user_name FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ${query} LIMIT ${count} OFFSET ${pagination * count}`);
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ${query}`);
    revalidateTag("calls");
    return Response.json({ data: r, count: r_count[0].count });
  } else {
    const r = await execQuery(`SELECT T.*,C.*, (SELECT user_name FROM user WHERE C.user_seq = user.user_seq) AS user_name FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq LIMIT ${count} OFFSET ${pagination * count}`);
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq`);
    revalidateTag("calls");
    return Response.json({ data: r, count: r_count[0].count });
  }
}

// export async function POST (req, res) {
//   const jsonDatas = await req.json();
//   const { pagination, count } = jsonDatas;

//   let sql = Object.keys(jsonDatas).map(key => {
//     if (key === 'pagination' || key === 'count') return '';
//     if (key === 'startDate') return `AND C.update_date >= '${jsonDatas.startDate}'`;
//     if (key === 'endDate') return `AND C.update_date <= '${jsonDatas.endDate}'`;
//     if (key === 'naverId') return `AND T.naver_id LIKE '%${jsonDatas.naverId}%'`;
//     if (key === 'blogId') return `AND T.blog_id LIKE '%${jsonDatas.blogId}%'`;
//     if (key === 'phone') return `AND T.phone LIKE '%${jsonDatas.phone}%'`;
//     if (key === 'result') return `AND C.result = '${jsonDatas.result}'`;
//     if (key === 'userSeq') return `AND C.user_seq = '${jsonDatas.userSeq}'`;
//     return `AND ${key} = '${jsonDatas[key]}'`;
//   }).join(' ');

//   if( sql.length > 1 ) {
//     let query = sql.replace('AND ', '');
//     query = "WHERE " + query;
//     const r = await execQuery(`SELECT T.*,C.* FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ${query} LIMIT ${count} OFFSET ${pagination * count}`);
//     const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq ${query}`);
    
//     return Response.json({ data: r, count: r_count[0].count });
//   } else {
//     const r = await execQuery(`SELECT T.*,C.* FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq LIMIT ${count} OFFSET ${pagination * count}`);
//     const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM call_result C INNER JOIN target T ON T.target_seq = C.target_seq`);

//     return Response.json({ data: r, count: r_count[0].count });
//   }
  
// }