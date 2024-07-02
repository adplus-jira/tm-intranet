'use server';

import { redirect } from 'next/navigation';
import { auth, signIn } from '../../auth';
import { execQuery } from '../api/commonApi';

export async function authenticate(prevState, formData) {
  const sql = 'SELECT * FROM user WHERE user_id = "' + formData.get('id') +'" AND user_password = "' + formData.get('password') + '" LIMIT 1';
  const loginRes = await execQuery(sql);
  if (loginRes.length === 0) {
    // throw new Error(JSON.stringify({ message: 'Invalid credentials', error: true }));
  } else {
    const user = { id: loginRes[0].user_id, name: loginRes[0].user_name, isAdmin: loginRes[0].user_access_control ? true : false };
    await signIn('credentials', {
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
      redirect: false
    }
    ).then(() => {
      redirect('/dashboard');
    });
  }
}

export async function test() {
  const session = await auth();
  return session;
}