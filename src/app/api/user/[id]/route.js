import { execQuery } from '@/app/api/commonApi';
import { NextResponse } from 'next/server';

export async function DELETE (request, context) {
  const { id } = context.params;
  console.log("!!!", id);
  const res = await execQuery(`DELETE FROM user WHERE idx = '${id}'`);
  return NextResponse.json(res);
}

export async function PATCH (request, context) {
  const { id } = context.params;
  const { userId, password, name } = await request.json();
  console.log(request);
  const res = await execQuery(`UPDATE user SET user_id = '${userId}', user_password = '${password}', user_name = '${name}' WHERE idx = '${id}'`);
  console.log(res);
  return NextResponse.json(res);
}