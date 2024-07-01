'use server';

import { redirect } from 'next/navigation';
import { auth, signIn } from '../../auth';

export async function authenticate(prevState, formData) {
  await signIn('credentials', {
    id: formData.get('id'),
    password: formData.get('password'),
    redirect: false
  }
  ).then((res) => {
    redirect('/dashboard');
  });
}

export async function test() {
  const session = await auth();
  return session;
}