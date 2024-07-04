import { CallCard } from "./components";

export async function UserPage({ session }) {
  
  const cardData = await fetch(process.env.URL + '/api/target/user', {method: 'POST', body: JSON.stringify({idx: session.idx})}).then(res => res.json()).then(res => res[0]);
  
  const handleSubmit = async (formData) => {
    'use server'
    const rawFormData = {
      result: formData.get('result'),
      memo: formData.get('memo'),
      target_seq: cardData.target_seq,
      user_seq: session.idx,
    };
    await fetch(process.env.URL + '/api/dashboard/user', {method: 'PUT', body: JSON.stringify(rawFormData)});
  }

  return (
    <div className="max-w-7xl m-auto">
      <CallCard cardData={cardData} handleSubmit={handleSubmit}  />
    </div>
  );
}