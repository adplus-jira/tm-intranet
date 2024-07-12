import { execQuery } from "../commonApi";

export async function GET(req, context) {
  const url = new URLSearchParams(req.nextUrl.searchParams);
  const pagination = url.get('page') ? (url.get('page') - 1) : 0;
  const count = url.get('count') ? url.get('count') : 10;

  let sql = '';
  for (let [key, value] of url) {
    if (key === 'startDate') sql += `AND update_date >= '${value}' `;
    if (key === 'endDate') sql += `AND update_date <= '${value}' `;
    if (key === 'naverId') sql += `AND naver_id LIKE '%${value}%' `;
    if (key === 'blogId') sql += `AND blog_id LIKE '%${value}%' `;
    if (key === 'phone') sql += `AND phone LIKE '%${value}%' `;
    if (key === 'isReceiveOk') sql += `AND is_receive_ok = '${value}' `;
  }

  if (sql.length > 1) {
    let query = sql.replace('AND ', '');
    query = "WHERE " + query;

    const res = await execQuery(`SELECT * FROM target ${query} LIMIT ${count} OFFSET ${pagination * count}`);
    const res_count = await execQuery(`SELECT COUNT(*) as 'count' FROM target ${query}`);
    return Response.json({ data: res, count: res_count[0].count });
  } else {
    const res = await execQuery(`SELECT * FROM target LIMIT ${count} OFFSET ${pagination * count}`);
    const res_count = await execQuery(`SELECT COUNT(*) as 'count' FROM target`);
    return Response.json({ data: res, count: res_count[0].count });
  }
}

export async function POST(req, res) {
  const formData = await req.json();

  const sql = formData.map((data)=> {
    const { naverId, blogId, phone } = data;
    return `('${naverId}', '${blogId}', '${phone}')`;
  });
  
  const result = await execQuery(`INSERT INTO target (naver_id, blog_id, phone) VALUES ${sql.join(',')}`);
  
  return Response.json(result);
}