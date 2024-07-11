'use client';
export const dynamic = 'auto';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { authenticate, test } from "./actions";
import { useFormState, useFormStatus } from "react-dom";



const Page = () => {
  const [errorMsg, handleSubmit] = useFormState(authenticate, undefined);

  
  return (
    <>
    <div className="w-full max-w-96 m-auto pt-20">
      <form action={handleSubmit} className="grid gap-1.5">
        <Input type="text" name="id" placeholder="ID" />
        <Input type="password" name="password" placeholder="Password" />
        <p>{errorMsg}</p>
        <LoginButton />
      </form>
    </div>
    </>
  );
}

const LoginButton = () => {
  const { pending } = useFormStatus();

  const handleClick = (e) => {
    if(pending) {
      e.preventDefault();
    }
  }

  return (
    <Button type="submit" aria-disabled={pending} onClick={handleClick} className='w-full'>Login</Button>
  )
}

export default Page;