import { execQuery } from "../commonApi";

export async function GET() {
  const res = await execQuery('SELECT * FROM target');
  return Response.json({ status: 'success', data: res });
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