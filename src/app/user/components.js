import { Input } from "@/components/ui/input";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { revalidateTag } from "next/cache";
import React from "react";
import { customModal as CustomModal } from "./customModal";
import Link from "next/link";

const Modal = ({ idx, userId, userPw, userName }) => {
  const handleSubmit = async (formData) => {
    'use server';
    const rawFormData = {
      idx: formData.get('idx'),
      userId: formData.get('id'),
      password: formData.get('password'),
      name: formData.get('name')
    }
    const response = await fetch(process.env.URL + '/api/user/' + idx, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rawFormData) }).then(res => res.json());
    revalidateTag('users');
  }

  return (
    <>
      <CustomModal idx={idx} userId={userId} userPw={userPw} userName={userName} handleSubmit={handleSubmit} />
    </>
  )
}



const UserList = async ({ userData }) => {
  

  const onDelete = async (formData) => {
    'use server';
    const idx = formData.get('idx');
    const response = await fetch(process.env.URL + '/api/user/' + idx, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }).then(res => res.json());
    revalidateTag('users');
  }

  const onDisable = async (formData) => {
    'use server';
    const idx = formData.get('idx');
    const response = await fetch(process.env.URL + '/api/user/' + idx, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then(res => res.json());
    revalidateTag('users');
  }


  return (
    <Table className="w-full">
      {/* <TableCaption>유저 정보</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>아이디</TableHead>
          <TableHead>이름</TableHead>
          <TableHead>생성날짜</TableHead>
          <TableHead>마지막 로그인 날짜</TableHead>
          <TableHead>삭제일</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          userData && userData.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.create_date.substring(0, 10)}</TableCell>
                <TableCell>{user.last_login_date?.substring(0,10)}</TableCell>
                <TableCell>{user.disable_at}</TableCell>
                <TableCell><Modal idx={user.idx} userId={user.user_id} userPw={user.user_password} userName={user.user_name} /></TableCell>
                <TableCell>
                  <form action={onDisable}>
                    <input type="hidden" name="idx" value={user.idx} />
                    <Button type="submit" className="w-[100px] bg-slate-500 hover:bg-slate-400" disabled={user.disable_at ? true : false}>비활성화</Button>
                  </form>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

const AddUserComponent = () => {
  const handleSubmit = async (formData) => {
    'use server';
    const rawFormData = {
      id: formData.get('id'),
      password: formData.get('password'),
      name: formData.get('name')
    }
    await fetch(process.env.URL + '/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rawFormData) });
    revalidateTag('users');
  }

  return (
    <form action={handleSubmit}>
      <div className="flex md:flex-row flex-col gap-2 w-full m-auto">
        <Input type="text" name="id" placeholder="ID" />
        <Input type="text" name="password" placeholder="Password" />
        <Input type="text" name="name" placeholder="Name" />
        <Button type="submit" className="md:w-[100px] w-full m-auto">등록하기</Button>
      </div>
      {/* <Link href={{ pathname: '/user', query: { name: 'user' }}}><Button type="button" className="md:w-[100px] w-full m-auto">조회하기</Button></Link> */}
    </form>
  )
}

export { UserList, AddUserComponent };