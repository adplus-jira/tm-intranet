import { execQuery } from "../commonApi";

export async function GET () {
  console.log("hihi");
  const result = await execQuery(`SELECT * FROM talk_result`);
  console.log(result, "result");  
  return Response.json(result);
}

export async function POST (req, res) {
  const jsonDatas = await req.json();
  const { pagination, count } = jsonDatas;
  let sql = Object.keys(jsonDatas).map(key => {
    if (key === 'pagination' || key === 'count') return '';
    if (key === 'startDate') return `AND TK.update_date >= '${jsonDatas.startDate}'`;
    if (key === 'endDate') return `AND TK.update_date <= '${jsonDatas.endDate}'`;
    if (key === 'status') return `AND TK.status = '${jsonDatas.status}'`;
    return `AND ${key} = '${jsonDatas[key]}'`;
  }).join(' ');

  if( sql.length > 1 ) {
    let query = sql.replace('AND ', '');
    query = "WHERE " + query;
    const r = await execQuery(`SELECT * FROM talk_result TK ${query} LIMIT ${count} OFFSET ${pagination * count}`);
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM talk_result TK ${query}`);
    return Response.json({ data: r, count: r_count[0].count });
  } else {
    const r = await execQuery(`SELECT * FROM talk_result TK LIMIT ${count} OFFSET ${pagination * count}`);
    const r_count = await execQuery(`SELECT COUNT(*) as 'count' FROM talk_result TK`);
    return Response.json({ data: r, count: r_count[0].count });
  }
}