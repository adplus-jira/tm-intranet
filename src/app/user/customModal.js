'use client';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

export const customModal = ({ idx, userId, userPw, userName, handleSubmit }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="inline-flex items-center 
      justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
      focus-visible:ring-offset-2 disabled:pointer-events-none 
      disabled:opacity-50 text-primary-foreground h-10 
      px-4 py-2 w-[100px] bg-blue-500 hover:bg-blue-400">수정</DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>사용자 정보 수정</DialogTitle>
            <DialogDescription>
              수정을 하고 완료버튼을 눌러주세요.
            </DialogDescription>
          </DialogHeader>
          <form action={handleSubmit}>
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
            <input type="hidden" name="idx" value={idx} />
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-400" onClick={() => setOpen(false)}>완료</Button>
          </form>
        </DialogContent>
        
      </Dialog>
  )
}