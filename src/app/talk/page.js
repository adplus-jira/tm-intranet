import Header from "../components/Header";
import { TalkTable } from "./components";
import { auth } from "@/auth";


export default async function Page() {
  const talkLists = await fetch(process.env.URL + '/api/talk', { method: 'GET', next: { tags: ['talk'] } }).then(res => res.json());
  const userList = await fetch(process.env.URL + '/api/user', { method: 'GET', next: { tags: ['users'] } }).then(res => res.json()).then(res => res.data);
  const session = await auth();
  
  return (
    <div>
      <Header session={session} />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1>톡 관리</h1>
        <TalkTable talkLists={talkLists} userList={userList} />
      </div>
    </div>
  )
}