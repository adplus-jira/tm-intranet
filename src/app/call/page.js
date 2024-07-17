import { CallList } from "./components";
import { execQuery } from "../api/commonApi";

export default async function Page({ searchParams }) {
  const userList= await execQuery(`SELECT * FROM user WHERE user_access_control='0' ORDER BY user_seq ASC`);

  const callResposne = await fetch(process.env.URL + '/api/call?' + new URLSearchParams(searchParams), { method: 'GET', next: { tags: ['calls'] } });
  const callList = await callResposne.json();

  const callDatas = callList.data;
  const count = callList.count;

  return (
    <div>
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1 className="font-bold p-4">콜 관리</h1>
        <CallList callLists={callDatas} count={count} userList={userList} />
      </div>
    </div>
  )
}