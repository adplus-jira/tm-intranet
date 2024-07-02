// 'use client';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { revalidateTag } from "next/cache";

const Modal = ({ idx, userId, userPw, userName }) => {

  return (
    <>

      <Dialog>

        {/* <DialogTrigger className="inline-flex items-center 
      justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
      focus-visible:ring-offset-2 disabled:pointer-events-none 
      disabled:opacity-50 text-primary-foreground h-10 
      px-4 py-2 w-[100px] bg-blue-500 hover:bg-blue-400">수정</DialogTrigger> */}

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>사용자 정보 수정</DialogTitle>
            <DialogDescription>
              수정을 하고 완료버튼을 눌러주세요.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">

            <div className="grid grid-cols-4 items-center gap-4">

              <Label htmlFor="id" className="text-right">
                아이디
              </Label>
              <Input
                id="id"
                defaultValue={userId}
                className="col-span-3"
                name="id"

              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userPassword" className="text-right">
                비밀번호
              </Label>
              <Input
                id="userPassword"
                defaultValue={userPw}
                className="col-span-3"
                name="password"

              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                이름
              </Label>
              <Input
                id="username"
                defaultValue={userName}
                className="col-span-3"
                name="name"

              />
            </div>

          </div>
          <DialogFooter>
            <Button type="submit">완료</Button>
          </DialogFooter>
        </DialogContent>
        <input type="hidden" name="idx" value={idx} />
      </Dialog>
    </>
  )
}

const UserList = async () => {
  const userData = await fetch(process.env.URL + '/api/user', { method: 'GET', next: { tags: ['users'] } }).then(res => res.json()).then(data => data.data);

  const onDelete = async (formData) => {
    'use server';
    const idx = formData.get('idx');
    console.log(idx);
    const response = await fetch(process.env.URL + '/api/user/' + idx, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }).then(res => res.json());
    revalidateTag('users');
  }

  const handleSubmit = async (formData) => {
    'use server';
    const rawFormData = {
      idx: formData.get('idx'),
      userId: formData.get('id'),
      password: formData.get('password'),
      name: formData.get('name')
    }
    console.log("!!!!");
    const response = await fetch(process.env.URL + '/api/user/' + idx, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rawFormData) }).then(res => res.json());
    console.log(response);
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
          userData.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.create_date.substring(0, 10)}</TableCell>
                <TableCell>{user.last_login_date}</TableCell>
                <TableCell>{user.disable_at}</TableCell>
                <TableCell><form action={handleSubmit}><Modal idx={user.idx} userId={user.user_id} userPw={user.user_password} userName={user.user_name} /></form></TableCell>
                <TableCell>
                  <form action={onDelete}>
                    <input type="hidden" name="idx" value={user.idx} />
                    <Button type="submit" className="w-[100px] bg-red-500 hover:bg-red-400" disabled={user.disable_at ? true : false}>삭제</Button>
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
    const response = await fetch(process.env.URL + '/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rawFormData) }).then(res => res.json());
    revalidateTag('users');
  }

  return (
    <form className="flex flex-row gap-2 w-full m-auto" action={handleSubmit}>
      <Input type="text" name="id" placeholder="ID" />
      <Input type="text" name="password" placeholder="Password" />
      <Input type="text" name="name" placeholder="Name" />
      <Button type="submit" className="w-[100px] m-auto">등록하기</Button>
    </form>
  )
}

export function Page() {

  return (
    <div>
      <Header />
      <div className="flex flex-col max-w-7xl mt-5 w-full m-auto">
        <h1 className="w-full border-b-1">사용자 등록</h1>
        <div className="w-2xl m-auto">
          <AddUserComponent />
        </div>
        <h1 className="w-full mt-10">사용자 목록</h1>
        <div className="w-full m-auto">
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default Page;