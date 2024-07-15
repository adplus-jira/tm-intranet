import { RecordTable } from "./components";
import { auth } from "@/auth";

export default async function Page ({ searchParams }) {
  const session = await auth();

  const recordResponse = await fetch(process.env.URL + '/api/record/' + session.user.user_seq + '?' + new URLSearchParams(searchParams), { method: 'GET', next: { tags: ["records"] } });
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