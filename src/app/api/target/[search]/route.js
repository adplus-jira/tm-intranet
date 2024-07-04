import { execQuery } from '../../commonApi';


export async function GET(request, context) {
  const { search } = context.params;

  const res = await execQuery(`SELECT * FROM target WHERE naver_id like '%${search}%' or blog_id like '%${search}%' or phone like '%${search}%' or memo like '%${search}%'`) 
  console.log("!!!!", res);
  return Response.json({ status: 'success', data: res });
}

export async function DELETE(request, context) {
  const { search } = context.params;

  const res = await execQuery(`DELETE FROM target WHERE target_seq = ${search}`);
  return Response.json({ status: 'success', data: res });
}

export async function PUT(request, context) {
  const { search } = context.params;
  const formData = await request.json();

  const sql = Object.keys(formData).map((key) => {
    return `${key} = '${formData[key]}'`;
  });

  const res = await execQuery(`UPDATE target SET ${sql.join(',')} WHERE target_seq = ${search}`);

  return Response.json({ status: 'success', data: res });
}