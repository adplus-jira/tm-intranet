import Header from "../components/Header";
import React from "react";
import { AddUserComponent, UserList } from "./components";
import { auth } from "@/auth";


export async function Page() {
  const session = await auth();

  return (
    <div>
      <Header session={session} />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto">
        <h1 className="w-full border-b-1">사용자 등록</h1>
        <div className="w-2xl m-auto">
          <AddUserComponent />
        </div>
        <h1 className="w-full mt-10">사용자 목록</h1>
        <div className="w-full m-auto">
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default Page;