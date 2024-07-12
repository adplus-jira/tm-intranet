'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CustomTable } from "../components/custom-table";
import { DatePicker } from "../components/customDatePicker";
import { subDays } from "date-fns";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const columns = [{
  id: 'naver_id',
  label: '네이버ID'
}, {
  id: 'blog_id',
  label: '블로그ID'
}, {
  id: 'phone',
  label: '전화번호'
}, {
  id: 'cnt_call',
  label: '통화횟수'
}, {
  id: 'is_receive_ok',
  label: '수신희망여부'
}, {
  id: 'create_date',
  label: '생성일'
}, {
  id: 'update_date',
  label: '수정일'
}, {
  id: 'collecte_date',
  label: '수집일'
}, {
  id: 'collect_url',
  label: '수집URL'
}, {
  id: 'memo',
  label: '메모'
}];


export const AddBlockTargetComponent = ({ handleSubmit }) => {
  const [jsonFile, setJsonFile] = useState([]);

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    else {
      const reader = new FileReader();
      reader.readAsText(file, 'utf-8');

      reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        setJsonFile(json);
      }

    }
  }
  return (
    <div className="flex flex-row gap-2 w-full m-auto p-4">
      <Input type="file" name="file" onChange={onChangeFile} />
      <Button type="submit" className="w-[100px] m-auto" onClick={() => handleSubmit(jsonFile)}>등록하기</Button>
    </div>
  )
}

export const TargetList = ({ targetDatas, count }) => {
  const [date, setDate] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const [values, setValues] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params;
  }, [searchParams]);

  // for search value update
  const handleSearch = async () => {
    let query = '';
    if (values.naverId) query += createQueryString('naverId', values.naverId) + '&';
    if (values.blogId) query += createQueryString('blogId', values.blogId) + '&';
    if (values.phone) query += createQueryString('phone', values.phone) + '&';
    if (values.isReceiveOk) query += createQueryString('isReceiveOk', values.isReceiveOk) + '&';
    if (date.from) query += createQueryString('startDate', date.from.toISOString()) + '&';
    if (date.to) query += createQueryString('endDate', date.to.toISOString()) + '&';

    if (query.endsWith('&')) {
      query = query.slice(0, -1);
    }

    router.push(pathname + '?' + query);
  }

  return (
    <div className="px-4">
      <div className="flex md:flex-row flex-col w-full md:space-x-2 align-center justify-center mb-10">
        <Input className="md:w-[200px] w-full mb-2" type="text" name="naverId" placeholder="네이버ID" onChange={(e) => setValues({ ...values, naverId: e.target.value })} />
        <Input className="md:w-[200px] w-full mb-2" type="text" name="blogId" placeholder="블로그ID" onChange={(e) => setValues({ ...values, blogId: e.target.value })} />
        <Input className="md:w-[200px] w-full mb-2" type="text" name="phone" placeholder="전화번호" onChange={(e) => setValues({ ...values, phone: e.target.value })} />
        <Select name="isReceiveOk" onValueChange={(v) => setValues({ ...values, isReceiveOk: v })}>
          <SelectTrigger className="md:w-[200px] w-full mb-2">
            <SelectValue placeholder="수신여부" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">수신</SelectItem>
            <SelectItem value="0">거부</SelectItem>
          </SelectContent>
        </Select>
        <DatePicker date={date} setDate={setDate} className={"mb-2"} />
        <Button className="md:w-[100px] w-full mb-2" onClick={() => handleSearch()}>검색</Button>
      </div>
      <CustomTable columns={columns} rowDatas={targetDatas} count={count} />
    </div>
  )
}

// const EditModal = ({ targetSeq, naverId, blogId, phone, editTarget, isReceiveOk, collectUrl, memo }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger className="inline-flex items-center 
//       justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors 
//       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
//       focus-visible:ring-offset-2 disabled:pointer-events-none 
//       disabled:opacity-50 text-primary-foreground h-10 
//       px-4 py-2 w-[70px] bg-blue-500 hover:bg-blue-400">수정</DialogTrigger>

//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>정보 수정</DialogTitle>
//           <DialogDescription>
//             수정을 하고 완료버튼을 눌러주세요.
//           </DialogDescription>
//         </DialogHeader>
//         <form action={editTarget}>
//           <div className="grid gap-4 py-4">

//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="naverId" className="text-right">
//                 네이버ID
//               </Label>
//               <Input
//                 id="naverId"
//                 defaultValue={naverId}
//                 className="col-span-3"
//                 name="naverId"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="blogId" className="text-right">
//                 블로그ID
//               </Label>
//               <Input
//                 id="blogId"
//                 defaultValue={blogId}
//                 className="col-span-3"
//                 name="blogId"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="phone" className="text-right">
//                 전화번호
//               </Label>
//               <Input
//                 id="phone"
//                 defaultValue={phone}
//                 className="col-span-3"
//                 name="phone"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="isReceiveOk" className="text-right">
//                 수신희망여부
//               </Label>

//               <Select name="isReceiveOk" defaultValue={isReceiveOk.toString()}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="수신or거부" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectItem value="1">수신</SelectItem>
//                     <SelectItem value="0">거부</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               {/* <Input
//                 id="isReceiveOk"
//                 defaultValue={isReceiveOk}
//                 className="col-span-3"
//                 name="isReceiveOk"
//               /> */}
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="collectUrl" className="text-right">
//                 추출 URL
//               </Label>
//               <Input
//                 id="collectUrl"
//                 defaultValue={collectUrl}
//                 className="col-span-3"
//                 name="collectUrl"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="memo" className="text-right">
//                 메모
//               </Label>
//               <Textarea
//                 id="memo"
//                 defaultValue={memo}
//                 className="col-span-3"
//                 name="memo"
//               />
//             </div>
//           </div>
//           <input type="hidden" name="targetSeq" value={targetSeq} />
//           <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-400" onClick={() => setOpen(false)}>완료</Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }