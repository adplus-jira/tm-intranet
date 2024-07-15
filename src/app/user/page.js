import React, { Suspense } from "react";
import { AddUserComponent, UserList } from "./components";
import { execQuery } from "../api/commonApi";
import { revalidateTag } from "next/cache";

export async function Page({ searchParams }) {
  
  // const userData = await fetch(process.env.URL + '/api/user?' + new URLSearchParams(searchParams), { method: 'GET', next: { tags: ["users"] } });
  // const userList = await userData.json();

  const name = searchParams.name;
  const userData = name ? await execQuery(`SELECT * FROM user WHERE user_name LIKE '%${name}%' AND user_access_control='0' ORDER BY user_seq ASC`) : await execQuery(`SELECT * FROM user WHERE user_access_control='0' ORDER BY user_seq ASC`);
  revalidateTag('users');

  return (
    <div>
      <div className="flex flex-col max-w-7xl w-full m-auto">
        <h1 className="w-full border-b-1 p-4 font-bold">사용자 등록</h1>
        <div className="w-2xl m-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <AddUserComponent />
          </Suspense>
        </div>
        <h1 className="w-full mt-10 p-4 font-bold">사용자 목록</h1>
        <div className="w-full m-auto p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <UserList userData={userData} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page;