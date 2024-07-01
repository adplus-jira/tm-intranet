import { Button } from "@/components/ui/button";
import { getSession, handleLogout } from "./actions";
import { signOut } from "@/auth";
import { auth } from "@/auth";

export default async function page() { 

  const session = await auth();
  console.log(session);
  return (
    <div>
      <h1>{ session.user.isAdmin ? '어드민' : '사용자'}</h1>
      <form action={handleLogout}>
        <Button className="w-full">Sign Out</Button>
      </form>
    </div>
  );
}