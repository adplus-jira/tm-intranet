import { execQuery } from '@/app/api/commonApi';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function DELETE (request, context) {
  const { id } = context.params;
  const res = await execQuery(`DELETE FROM user WHERE user_seq = '${id}'`);
  return NextResponse.json(res);
}

export async function PUT (request, context) {
  const { id } = context.params;
  const res = await execQuery(`UPDATE user SET disable_at = NOW() WHERE user_seq = '${id}'`);
  return NextResponse.json(res);
}

export async function PATCH (request, context) {
  const { id } = context.params;
  const { userId, password, name } = await request.json();
  const res = await execQuery(`UPDATE user SET user_id = '${userId}', user_password = '${password}', user_name = '${name}' WHERE user_seq = '${id}'`);
  
  revalidateTag('users');
  return NextResponse.json(res);
}