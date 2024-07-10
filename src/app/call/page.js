import { auth } from "@/auth";
import Header from "../components/Header";
import { CallList } from "./components";
import { revalidateTag } from "next/cache";

export default async function Page() {
  
  const session = await auth();
  const userList = await fetch(process.env.URL + '/api/user', { method: 'GET', next: { tags: ['users'] } }).then(res => res.json()).then(res => res.data);
    console.log(userList, "userList")
  const callList = await fetch(process.env.URL + '/api/call', { method: 'GET', next: { tags: ['call'] } }).then(res => res.json());
  const getCallDatas = async (formData) => {
    'use server';
    const response = await fetch(process.env.URL + '/api/call', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).then(res => res.json());
    return response;
  }
  // revalidateTag('users');
  return (
    <div>
      <Header session={session} />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <CallList callLists={callList} userList={userList} getCallDatas={getCallDatas} />
      </div>
    </div>
  )
}