import { revalidateTag } from "next/cache";
import { CallCard } from "./components";

export async function UserPage({ session }) {

  const getCardData = async () => {
    'use server';
    const userResponse = await fetch(process.env.URL + '/api/target/user', { method: 'POST', body: JSON.stringify({ idx: session.user_seq }), next: { tags: ['cards'] } });
    const result = await userResponse.json();
    return result[0];
  }

  const cardData = await getCardData();

  const handleSubmit = async (formData) => {
    'use server'
    const rawFormData = {
      result: formData.get('result'),
      memo: formData.get('memo'),
      talk_memo: formData.get('talk_memo'),
      status: formData.get('status'),
      target_seq: cardData.target_seq,
      call_result_seq: cardData.call_result_seq,
      user_seq: session.user_seq,
    };
    await fetch(process.env.URL + '/api/dashboard/user', { method: 'PUT', body: JSON.stringify(rawFormData) });
    revalidateTag('cards');
    revalidateTag('talks');
  }

  return (
    <div className="max-w-7xl m-auto">
      <div className="p-4">
        <CallCard cardDatas={cardData} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}