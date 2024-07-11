import { TalkTable } from "./components";


export default async function Page() {

  const getTalkDatas = async (formData) => {
    'use server';
    const response = await fetch(process.env.URL + '/api/talk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).then(res => res.json());
    return response;
  }

  const userResponse = await fetch(process.env.URL + '/api/user', { method: 'GET', next: { tags: ['users'] } });
  const userLists = await userResponse.json();

  const talkResponse = await fetch(process.env.URL + '/api/talk?searchValue=aaa', { method: 'GET', next: { tags: ['talk'] } });
  
  return (
    <div>
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        <h1 className="font-bold p-4">톡 관리</h1>
        <TalkTable getTalkDatas={getTalkDatas} userLists={userLists} />
      </div>
    </div>
  )
}