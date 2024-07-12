import { TalkTable } from "./components";


export default async function Page({ searchParams }) {

  const targetResponse = await fetch(process.env.URL + '/api/talk?' + new URLSearchParams(searchParams), { method: 'GET', next: { tags: ['talks'] } });
  const targetJson = await targetResponse.json();

  const targetDatas = targetJson.data;
  const count = targetJson.count;

  return (
    <div>
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1 className="font-bold p-4">톡 관리</h1>
        <TalkTable count={count} targetDatas={targetDatas} />
      </div>
    </div>
  )
}