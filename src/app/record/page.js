import { RecordTable } from "./components";
import { auth } from "@/auth";

export default async function Page ({ searchParams }) {
  const session = await auth();

  // const getRecordData = async (formData) => {
  //   'use server';
  //   const recordDatas = await fetch(process.env.URL + '/api/record/' + session.user.idx, { method: 'POST', body: JSON.stringify(formData), next: { tags: ["record"] } }).then(res => res.json());
    
  //   return recordDatas;
  // }
  const recordResponse = await fetch(process.env.URL + '/api/record/' + session.user.idx + '?' + new URLSearchParams(searchParams), { method: 'GET', next: { tags: ["records"] } });
  const recordJson = await recordResponse.json();
  const recordDatas = recordJson.data;
  const count = recordJson.count;

  return (
    <div>
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1 className="font-bold p-4">기록보기</h1>
        <RecordTable recordDatas={recordDatas} count={count} />
      </div>

    </div>
  )
}