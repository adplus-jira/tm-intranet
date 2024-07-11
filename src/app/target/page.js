import { revalidateTag } from "next/cache";
import { AddBlockTargetComponent, TargetList } from "./components";
import { Suspense } from "react";

export default async function Page() {

  const getTargetData = async (formData) => {
    'use server';
    const response = await fetch(process.env.URL + '/api/target/lists', { method: 'POST', body: JSON.stringify(formData), next: { tags: ["record"] } });
    const targetDatas = await response.json();
    return targetDatas;
  }

  const handleBlockTargetSubmit = async (jsonData) => {
    'use server';
    await fetch(process.env.URL + '/api/target', { method: 'POST', body: JSON.stringify(jsonData) }).then(res => res.json());
    revalidateTag('target');
  }

  const deleteTarget = async (targetSeq) => {
    'use server';
    const response = await fetch(process.env.URL + '/api/target/' + targetSeq, { method: 'DELETE' }).then(res => res.json()).then(data => data.data);
    revalidateTag('target');
  }

  const editTarget = async (formData) => {
    'use server';
    const targetSeq = formData.get('targetSeq');

    const rawFormData = {
      naver_id: formData.get('naverId'),
      blog_id: formData.get('blogId'),
      phone: formData.get('phone'),
      is_receive_ok: formData.get('isReceiveOk'),
      collect_url: formData.get('collectUrl'),
      memo: formData.get('memo')
    }

    await fetch(process.env.URL + '/api/target/' + targetSeq, { method: 'PUT', body: JSON.stringify(rawFormData) }).then(res => res.json()).then(data => data.data);
    revalidateTag('target');
  }

  // const response = await fetch(process.env.URL + '/api/target/lists', { method: 'POST', body: JSON.stringify({ pagination: 0, count: 10 }), next: { tags: ['target'] } });
  // const { data: targetData, count: count } = await response.json();

  return (
    <div>
      <div className="flex flex-col max-w-fit mt-5 w-full m-auto space-y-5">
        <div>
          <h1 className="w-full border-b-1 font-bold p-4">타겟 등록</h1>
          <div className="w-2xl max-w-lg">
            <Suspense fallback={<div>Loading...</div>}>
              <AddBlockTargetComponent handleSubmit={handleBlockTargetSubmit} />
            </Suspense>
          </div>
        </div>
        <div>
          <h1 className="w-full mt-5 p-4 font-bold">타겟 목록</h1>
        </div>
        <div className="w-full m-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <TargetList deleteTarget={deleteTarget} editTarget={editTarget} getTargetData={getTargetData} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}