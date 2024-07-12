import { NextResponse } from "next/server";
import { execQuery } from '../commonApi';
import { revalidateTag } from "next/cache";


export async function GET(req, context) {
  const name = req.nextUrl.searchParams.get('name');
  
  if (name) {
    const res = await execQuery(`SELECT * FROM user WHERE user_name LIKE '%${name}%' AND user_access_control='0' ORDER BY idx ASC`);
    revalidateTag('users');
    return Response.json(res);
  } else {
    const res = await execQuery(`SELECT * FROM user WHERE user_access_control='0' ORDER BY idx ASC`);
    revalidateTag('users');
    return Response.json(res);
  }
}

export async function POST(req, res) {
  const { id, password, name } = await req.json();
  const result = await execQuery(`INSERT INTO user (user_id, user_password, user_name, user_access_control) VALUES ('${id}', '${password}', '${name}', 0)`);
  revalidateTag('users');
  return NextResponse.json(result);
}