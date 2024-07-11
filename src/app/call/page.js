import { auth } from "@/auth";
import { CallList } from "./components";

export default async function Page() {
  
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
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1 className="font-bold p-4">콜 관리</h1>
        <CallList callLists={callList} userList={userList} getCallDatas={getCallDatas} />
      </div>
    </div>
  )
}