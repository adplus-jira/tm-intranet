import { revalidateTag } from "next/cache";
import Header from "../components/Header";
import { Input } from "@/components/ui/input";
import { AddBlockTargetComponent, AddTargetComponent, TargetList } from "./components";

export default async function Page() {

  const targetDatas = await fetch(process.env.URL + '/api/target', { method: 'GET', next: { tags: ["target"] } }).then(res => res.json()).then(data => data.data);
  const targets = targetDatas.map((targetData, index) => {
    return {
      idx: index + 1,
      targetSeq: targetData.target_seq,
      naverId: targetData.naver_id,
      blogId: targetData.blog_id,
      phone: targetData.phone,
      cntCall: targetData.cnt_call,
      isReceiveOk: targetData.is_receive_ok,
      createdAt: targetData.create_date?.substring(0, 10),
      updatedAt: targetData.update_date?.substring(0, 10),
      collectedAt: targetData.collect_date?.substring(0, 10),
      collectUrl: targetData.collect_url,
      memo: targetData.memo,
      edit: '',
      delete: '',
    }
  });

  // 단건 등록 삭제
  // const handleTargetSubmit = async (formData) => {
  //   'use server';
  //   const rawFormData = {
  //     naverId: formData.get('naverId'),
  //     blogId: formData.get('blogId'),
  //     phone: formData.get('phone')
  //   }

  //   const response = await fetch(process.env.URL + '/api/target', { method: 'POST', body: JSON.stringify(rawFormData) }).then(res => res.json()).then(data => data.data);
  //   revalidateTag('target');
  // }

  const handleBlockTargetSubmit = async (jsonData) => {
    'use server';
    const response = await fetch(process.env.URL + '/api/target', { method: 'POST', body: JSON.stringify(jsonData) }).then(res => res.json()).then(data => data.data);
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

    const response = await fetch(process.env.URL + '/api/target/' + targetSeq, { method: 'PUT', body: JSON.stringify(rawFormData) }).then(res => res.json()).then(data => data.data);
    revalidateTag('target');
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto space-y-5">
        {/* <div>
          <h1 className="w-full border-b-1">타겟 단건 등록</h1>
          <div className="w-2xl mb-10">
            <AddTargetComponent handleSubmit={handleTargetSubmit} />
          </div>
        </div> */}
        <div>
          <h1 className="w-full border-b-1">타겟 등록</h1>
          <div className="w-2xl max-w-lg">
            <AddBlockTargetComponent handleSubmit={handleBlockTargetSubmit} />
          </div>
        </div>
        <div>
          <h1 className="w-full mt-10 mb-2">타겟 목록</h1>

        </div>
        <div className="w-full m-auto">
          <TargetList targets={targets} deleteTarget={deleteTarget} editTarget={editTarget} />
        </div>
      </div>
    </div>
  )
}