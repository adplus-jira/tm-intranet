'use client';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function Header() {

  const router = useRouter();

  return (
    <div className="bg-gray-800 text-white">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl">AdPlus</div>
        <div className="flex gap-4 cursor-pointer">
          <div onClick={() => router.push('/dashboard')}>Dashboard</div>
          <div onClick={() => router.push('/user')}>유저관리</div>
          <div onClick={() => router.push('/target')}>타겟관리</div>
          <div onClick={() => router.push('/call')}>콜관리</div>
          <div onClick={() => signOut()}>로그아웃</div>
        </div>
      </div>

    </div>
  )
}

export default Header;