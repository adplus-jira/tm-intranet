'use server';

import { revalidatePath } from "next/cache";
import { execQuery } from "../api/commonApi";

export async function getUsers() {
  const res = await execQuery('SELECT * FROM user');
  return res;
}

export async function addUser(prevState, data) {
  const res = await execQuery(`INSERT INTO user (user_id, user_password, user_name, user_access_control) VALUES ('${data.get('id')}', '${data.get('password')}', '${data.get('name')}', 0)`);
  return res;
}