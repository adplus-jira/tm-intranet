import { revalidateTag } from "next/cache";
import { execQuery } from "../commonApi";

export async function GET(req, context) {
  const url = new URLSearchParams(req.nextUrl.searchParams);
  const pagination = url.get('page') ? (url.get('page') - 1) : 0;
  const count = url.get('count') ? url.get('count') : 10;

  let sql = '';
  for (let [key, value] of url) {
    if (key === 'status') sql += `AND TK.status = '${value}'`;
    if (key === 'startDate') sql += `AND TK.update_date >= '${value}' `;
    if (key === 'endDate') sql += `AND TK.update_date <= '${value}' `;
  }

  if (sql.length > 1) {
    let query = sql.replace('AND ', '');
    query = "WHERE " + query;

    const r = await execQuery(`
      SELECT TK.target_seq, TK.status, TK.memo, TK.create_date, TK.update_date,
      (SELECT user_name FROM user WHERE TK.call_user_seq = user.user_seq) AS call_user_name,
      (SELECT user_name FROM user WHERE TK.talk_user_seq = user.user_seq) AS talk_user_name
      FROM talk_result TK ${query} LIMIT ${count} OFFSET ${pagination * count}`);
      
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM talk_result TK ${query}`);
    revalidateTag("talks");
    return Response.json({ data: r, count: r_count[0].count });
  } else {
    const r = await execQuery(`
      SELECT TK.target_seq, TK.status, TK.memo, TK.create_date, TK.update_date,
      (SELECT user_name FROM user WHERE TK.call_user_seq = user.user_seq) AS call_user_name,
      (SELECT user_name FROM user WHERE TK.talk_user_seq = user.user_seq) AS talk_user_name
      FROM talk_result TK LIMIT ${count} OFFSET ${pagination * count}`);

    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM talk_result TK`);
    revalidateTag("talks");
    return Response.json({ data: r, count: r_count[0].count });
  }
}

// export async function POST(req, res) {
//   const jsonDatas = await req.json();
//   const { pagination, count } = jsonDatas;
//   let sql = Object.keys(jsonDatas).map(key => {
//     if (key === 'pagination' || key === 'count') return '';
//     if (key === 'startDate') return `AND TK.update_date >= '${jsonDatas.startDate}'`;
//     if (key === 'endDate') return `AND TK.update_date <= '${jsonDatas.endDate}'`;
//     if (key === 'status') return `AND TK.status = '${jsonDatas.status}'`;
//     return `AND ${key} = '${jsonDatas[key]}'`;
//   }).join(' ');

//   if (sql.length > 1) {
//     let query = sql.replace('AND ', '');
//     query = "WHERE " + query;
//     const r = await execQuery(`SELECT * FROM talk_result TK ${query} LIMIT ${count} OFFSET ${pagination * count}`);
//     const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM talk_result TK ${query}`);
//     return Response.json({ data: r, count: r_count[0].count });
//   } else {
//     const r = await execQuery(`SELECT * FROM talk_result TK LIMIT ${count} OFFSET ${pagination * count}`);
//     const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM talk_result TK`);
//     return Response.json({ data: r, count: r_count[0].count });
//   }
// }