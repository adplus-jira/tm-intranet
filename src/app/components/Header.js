'use client';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";


function Header({ session }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-gray-800 text-white">
      <div className="md:flex hidden justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="lg:text-2xl cursor-pointer" onClick={() => router.push('/dashboard')}>AdPlus</div>
        <div className="flex gap-4 cursor-pointer">
          <Link href={'/dashboard'}>Dashboard</Link>
          {session.user.isAdmin === 'true' && <Link href={'/user'}>유저관리</Link>}
          {session.user.isAdmin === 'true' && <Link href={'/target'}>타겟관리</Link>}
          {session.user.isAdmin === 'true' && <Link href={'/call'}>콜관리</Link>}
          {session.user.isAdmin === 'true' && <Link href={'/talk'}>톡관리</Link>}
          {session.user.isAdmin === 'false' && <Link href={'/record'}>기록보기</Link>}
          <div onClick={() => signOut({ callbackUrl: '' })}>로그아웃</div>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden ml-2 ">
            <MenuIcon className="size-8 m-auto" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <div className="flex flex-col items-start space-y-3">
            <h1 className="text-bolder text-2xl">AdPlus</h1>
            <div onClick={() => router.push('/dashboard')}>Dashboard</div>
            {session.user.isAdmin === 'true' && <div onClick={() => {router.push('/user'); setOpen(false);}}>유저관리</div>}
            {session.user.isAdmin === 'true' && <div onClick={() => {router.push('/target'); setOpen(false);}}>타겟관리</div>}
            {session.user.isAdmin === 'true' && <div onClick={() => {router.push('/call'); setOpen(false);}}>콜관리</div>}
            {session.user.isAdmin === 'true' && <div onClick={() => {router.push('/talk'); setOpen(false);}}>톡관리</div>}
            {session.user.isAdmin === 'false' && <div onClick={() => {router.push('/record'); setOpen(false);}}>기록보기</div>}
            <div onClick={() => signOut({ callbackUrl: '/login', redirect: true })}>로그아웃</div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Header;