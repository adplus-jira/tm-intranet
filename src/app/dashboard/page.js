'use client';

import { Button } from "@/components/ui/button";
import { getSession, handleLogout } from "./actions";
import { signOut } from "@/auth";
import { auth } from "@/auth";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const AdminPage = () => {

  return (
    <div className="max-w-7xl">
      <h1>Admin Dashboard</h1>
    </div>
  )
}

const UserPage = () => {
  return (
    <div>
      <h1>User Page</h1>
    </div>
  )
}

export default function page() {
  const [session, setSession] = useState();

  const testFunction = async () => {
    return await getSession(); 
  }
  useEffect(() => {
    testFunction().then((res) => {
      setSession(res);
    });

  }, [])

  return (
    <div>
      <Header />
      
      { session ? session && session.user && session.user.isAdmin === 'true' ? <AdminPage /> : <UserPage /> : <h1>Loading...</h1> }


      {/* <form action={handleLogout}>
        <Button className="w-full">Sign Out</Button>
      </form> */}
    </div>
  );
}