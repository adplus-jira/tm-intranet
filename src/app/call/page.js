import { auth } from "@/auth";
import Header from "../components/Header";
import { CallList } from "./components";

export default async function Page() {
  
  const userList = await fetch(process.env.URL + '/api/user', { method: 'GET', next: { tags: ['users'] } }).then(res => res.json()).then(res => res.data);  
  const callList = await fetch(process.env.URL + '/api/call', { method: 'GET', next: { tags: ['call'] } }).then(res => res.json());
  const session = await auth();

  const handleSearch = async (formData) => {
    'use server';
    const response = await fetch(process.env.URL + '/api/call', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).then(res => res.json());
    return response;
  }

  return (
    <div>
      <Header session={session} />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <CallList callLists={callList} userList={userList} handleSearch={handleSearch} />
      </div>
    </div>
  )
}