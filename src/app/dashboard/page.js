import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { AdminPage } from "./admin";
import { UserPage } from "./user";
import { auth } from "@/auth";
import { cookies } from "next/headers";


export default async function page(props) {
  const session = await auth();

  return (
    <div>
      { session ? session && session.user && session.user.isAdmin === 'true' ? <AdminPage session={session.user} /> : <UserPage session={session.user} /> : <h1>Loading...</h1> }
    </div>
  );
}