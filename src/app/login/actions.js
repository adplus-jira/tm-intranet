'use server';

import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { execQuery } from '../api/commonApi';

// export async function authenticate(prevState, formData) {
  // const sql = 'SELECT * FROM user WHERE user_id = "' + formData.get('id') +'" AND user_password = "' + formData.get('password') + '" LIMIT 1';
  // const loginRes = await execQuery(sql);
  // if ( !formData.get('id') || !formData.get('password') ) {
  //   return '아이디와 비밀번호를 입력해주세요.';
  // } else if (loginRes.length === 0) {
  //   return '아이디 또는 비밀번호가 틀렸습니다.';
  // } else {
  //   const user = { user_seq: loginRes[0].user_seq, id: loginRes[0].user_id, name: loginRes[0].user_name, isAdmin: loginRes[0].user_access_control ? true : false };
  //   await signIn('credentials', { user_seq: user.user_seq, id: user.id, name: user.name, isAdmin: user.isAdmin });
  //   await execQuery(`UPDATE user SET last_login_date = NOW() WHERE user_seq = ${user.user_seq}`);
  //   redirect('/dashboard');
  // }
// }