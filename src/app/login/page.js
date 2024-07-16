'use client';
export const dynamic = 'auto';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { authenticate, test } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";



const Page = () => {
  const router = useRouter();
  // const [errorMsg, handleSubmit] = useFormState(authenticate, undefined);
  const [errorMsg, setErrorMessage] = useState();
  const handleSubmit = async (formData) => {
    const result = await signIn('Credentials', { id: formData.get('id'), password: formData.get('password'), redirect: false });
    if(result.error) {
      setErrorMessage(result.error);
    } else {
      setErrorMessage();
      router.push('/dashboard');
    }
  }
  
  return (
    <>
    <h1 className="text-3xl text-center mt-10">LOGIN</h1>
    <div className="w-full max-w-96 m-auto pt-20">
      <form action={handleSubmit} className="grid gap-1.5">
        <Input type="text" name="id" placeholder="ID" />
        <Input type="password" name="password" placeholder="Password" />
        {/* <p>{errorMsg}</p> */}
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