import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { AdminPage } from "./admin";
import { UserPage } from "./user";
import { auth } from "@/auth";


export default async function page() {

  const session = await auth();

  return (
    <div>
      <Header session={session} />
      
      { session ? session && session.user && session.user.isAdmin === 'true' ? <AdminPage session={session.user} /> : <UserPage session={session.user} /> : <h1>Loading...</h1> }


      {/* <form action={handleLogout}>
        <Button className="w-full">Sign Out</Button>
      </form> */}
    </div>
  );
}