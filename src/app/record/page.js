import { RecordTable } from "./components";
import { auth } from "@/auth";

export default async function Page () {
    
  const getRecordData = async (formData) => {
    'use server';
    const session = await auth();
    const recordDatas = await fetch(process.env.URL + '/api/record/' + session.user.idx, { method: 'POST', body: JSON.stringify(formData), next: { tags: ["record"] } }).then(res => res.json());
    
    return recordDatas;
  }

  return (
    <div>
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1 className="font-bold p-4">기록보기</h1>
        <RecordTable getRecordData={getRecordData} />
      </div>

    </div>
  )
}