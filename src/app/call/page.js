import { CallList } from "./components";

export default async function Page({ searchParams }) {
  const userListResponse = await fetch(process.env.URL + '/api/user', { method: 'GET', next: { tags: ['users'] } });
  const userList = await userListResponse.json();

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