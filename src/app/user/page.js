import Header from "../components/Header";
import React, { Suspense } from "react";
import { AddUserComponent, UserList } from "./components";
import { auth } from "@/auth";

export async function Page() {

  const session = await auth();
  const userData = await fetch(process.env.URL + '/api/user', { method: 'GET', next: { tags: ['users'] } });
  const userList = await userData.json();
  
  return (
    <div>
      <Header session={session} />
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
            <UserList userData={userList} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page;