import { revalidateTag } from "next/cache";
import { CallCard } from "./components";

export async function UserPage({ session }) {

  const getCardData = async () => {
    'use server';
    const result = await fetch(process.env.URL + '/api/target/user', {method: 'POST', body: JSON.stringify({idx: session.idx}), next: { tags: ['card'] }}).then(res => res.json()).then(res => res[0]);
    return result;
  }
  
  const cardData = await getCardData();
  
  const handleSubmit = async (formData) => {
    'use server'
    const rawFormData = {
      result: formData.get('result'),
      memo: formData.get('memo'),
      status: formData.get('status'),
      target_seq: cardData.target_seq,
      call_result_seq: cardData.call_result_seq,
      user_seq: session.idx,
    };
    await fetch(process.env.URL + '/api/dashboard/user', {method: 'PUT', body: JSON.stringify(rawFormData)});
    revalidateTag('card');
    revalidateTag('talk');
  }

  return (
    <div className="max-w-7xl m-auto">
      <CallCard cardDatas={cardData} handleSubmit={handleSubmit}  />
    </div>
  );
}