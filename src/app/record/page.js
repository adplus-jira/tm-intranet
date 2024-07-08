import Header from "../components/Header";
import { auth } from "@/auth";
import { RecordTable } from "./components";
import { SearchBar } from "./components";

export default async function Page () {
  const session = await auth();
  
  const getRecordData = async (formData) => {
    'use server';
    const recordDatas = await fetch(process.env.URL + '/api/record/' + session.user.idx, { method: 'POST', body: JSON.stringify(formData), next: { tags: ["record"] } }).then(res => res.json());
    console.log(recordDatas, 'recordDatas');
    return recordDatas;
  }

  return (
    <div>
      <Header session={session} />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1 className="">기록보기</h1>
        <RecordTable session={session} getRecordData={getRecordData} />
      </div>

    </div>
  )
}