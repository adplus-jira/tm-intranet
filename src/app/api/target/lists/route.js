import { execQuery } from '../../commonApi';

export async function POST(req, response) {
  const body = await req.json();
  const { pagination, count } = body;
  
  let sql = Object.keys(body).map(key => {
    if (key === 'pagination' || key === 'count') return '';
    if (key === 'startDate') return ` AND update_date >= '${body.startDate}'`;
    if (key === 'endDate') return ` AND update_date <= '${body.endDate}'`;
    if (key === 'naverId') return ` AND naver_id LIKE '%${body.naverId}%'`;
    if (key === 'blogId') return ` AND blog_id LIKE '%${body.blogId}%'`;
    if (key === 'phone') return ` AND phone LIKE '%${body.phone}%'`;
    if (key === 'isReceiveOk') return ` AND is_receive_ok = '${body.isReceiveOk}'`;
    return `AND ${key} = '${body[key]}'`;
  }).join(' ');
  
  let res, res_count;
  if( sql.length > 1) {
    let query = sql.replace('AND ', '');
    query = "WHERE " + query;
    res = await execQuery(`SELECT * FROM target ${query} LIMIT ${count} OFFSET ${pagination * count}`);
    res_count = await execQuery(`SELECT COUNT(*) as 'count' FROM target ${query}`);
  }
  else {
    res = await execQuery(`SELECT * FROM target LIMIT ${count} OFFSET ${pagination * count}`);
    res_count = await execQuery(`SELECT COUNT(*) as 'count' FROM target`);
  }

  return Response.json({ data: res, count: res_count[0].count});
}