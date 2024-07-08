'use client';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

function Header({ session }) {
  const router = useRouter();
  return (
    <div className="bg-gray-800 text-white">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl">AdPlus</div>
        <div className="flex gap-4 cursor-pointer">
          <div onClick={() => router.push('/dashboard')}>Dashboard</div>
          { session.user.isAdmin === 'true' && <div onClick={() => router.push('/user')}>유저관리</div> }
          { session.user.isAdmin === 'true' && <div onClick={() => router.push('/target')}>타겟관리</div> }
          { session.user.isAdmin === 'true' && <div onClick={() => router.push('/call')}>콜관리</div> }
          { session.user.isAdmin === 'true' && <div onClick={() => router.push('/talk')}>톡관리</div> }
          { session.user.isAdmin === 'false' && <div onClick={() => router.push('/record')}>기록보기</div> }
          <div onClick={() => signOut({ callbackUrl: '' })}>로그아웃</div>
        </div>
      </div>
    </div>
  )
}

export default Header;