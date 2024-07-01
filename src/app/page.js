import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {

  

  return (
    <div className="w-full">
      <form action={ async() => {
        'use server';
        await signOut();
      }}>
        <Button className="w-full">Sign Out</Button>
      </form>
      
    </div>
  );
}
