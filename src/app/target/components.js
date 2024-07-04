'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const AddTargetComponent = ({ handleSubmit }) => {
  return (
    <form className="flex flex-row gap-2 w-full m-auto" action={handleSubmit}>
      <Input type="text" name="naverId" placeholder="네이버ID" />
      <Input type="text" name="blogId" placeholder="블로그ID" />
      <Input type="text" name="phone" placeholder="전화번호" />
      <Button type="submit" className="w-[100px] m-auto">등록하기</Button>
    </form>
  )
}

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
    <div className="flex flex-row gap-2 w-full m-auto">
      <Input type="file" name="file" onChange={onChangeFile} />
      <Button type="submit" className="w-[100px] m-auto" onClick={() => handleSubmit(jsonFile)}>등록하기</Button>
    </div>
  )
}

export const TargetList = ({ targets, deleteTarget, editTarget }) => {
  const columns = [{
    header: ({ column }) => {
      return (
        <p
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          번호
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </p>
      )
    },
    accessorKey: 'idx'
  }, {
    header: 'targetSeq',
    accessorKey: 'targetSeq'
  }, {
    header: '네이버ID',
    accessorKey: 'naverId'
  }, {
    header: '블로그ID',
    accessorKey: 'blogId'
  }, {
    header: '전화번호',
    accessorKey: 'phone'
  }, {
    header: ({ column }) => {
      return (
        <p
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          전화횟수
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </p>
      )
    },
    cell: ({ row }) => {
      return (
        <p className="">{row.getValue('cntCall')}</p>
      )
    },
    accessorKey: 'cntCall'
  }, {
    header: ({ column }) => {
      return (
        <p
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          수신희망여부
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </p>
      )
    },
    accessorKey: 'isReceiveOk',
    cell: ({ row }) => {
      return (
        <p className="">{row.getValue('isReceiveOk') === 1 ? '수신' : '거부'}</p>
      )
    }
  }, {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          등록일
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
    accessorKey: 'createdAt',
    enableSorting: true,
  }, {
    header: '수정일',
    accessorKey: 'updatedAt'
  }, {
    header: '데이터수집일',
    accessorKey: 'collectedAt'
  }, {
    header: '데이터URL',
    accessorKey: 'collectUrl'
  }, {
    header: '메모',
    accessorKey: 'memo',
  }, {
    header: '수정',
    accessorKey: 'edit',
    cell: ({ row }) => {
      return (
        <EditModal
          targetSeq={row.getValue('targetSeq')}
          naverId={row.getValue('naverId')}
          blogId={row.getValue('blogId')}
          phone={row.getValue('phone')}
          editTarget={editTarget}
          cntCall={row.getValue('cntCall')}
          isReceiveOk={row.getValue('isReceiveOk')}
          collectUrl={row.getValue('collectUrl')}

        />
      )
    }
  }, {
    header: '삭제',
    accessorKey: 'delete',
    cell: ({ row }) => {
      return (
        <Button variant="ghost" className="bg-red-500 text-white" onClick={() => deleteTarget(row.getValue('targetSeq'))}>삭제</Button>
      )
    }
  }];

  // for search value update
  const handleSearch = async (formData) => {
    const search = formData.get('search');
    const response = await fetch('/api/target/' + search, { method: 'GET' }).then(res => res.json()).then(data => data.data);
    const responseData = response.map((targetData, index) => {
      return {
        idx: index + 1,
        targetSeq: targetData.target_seq,
        naverId: targetData.naver_id,
        blogId: targetData.blog_id,
        phone: targetData.phone,
        cntCall: targetData.cnt_call,
        isReceiveOk: targetData.is_receive_ok,
        createdAt: targetData.create_date?.substring(0, 10),
        updatedAt: targetData.update_date?.substring(0, 10),
        collectedAt: targetData.collect_date?.substring(0, 10),
        collectUrl: targetData.collect_url,
        memo: targetData.memo,
        edit: '',
        delete: ''
      }
    });
    setTargetDatas(responseData);
  }
  const [targetDatas, setTargetDatas] = useState(targets);

  useEffect(() => {
    setTargetDatas(targets);
  }, [targets]);

  return (
    <>
      <form action={handleSearch}>
        <div className="flex flex-row max-w-[50%] space-x-2 mb-4">
          <Input
            placeholder="검색 내용"
            className="w-full"
            name="search"
          />
          <Button type="submit" className="w-[100px] m-auto">검색</Button>
        </div>
      </form>
      <DataTable columns={columns} data={targetDatas} />
    </>
  )
}

const EditModal = ({ targetSeq, naverId, blogId, phone, editTarget, isReceiveOk, collectUrl, memo }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center 
      justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
      focus-visible:ring-offset-2 disabled:pointer-events-none 
      disabled:opacity-50 text-primary-foreground h-10 
      px-4 py-2 w-[70px] bg-blue-500 hover:bg-blue-400">수정</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>정보 수정</DialogTitle>
          <DialogDescription>
            수정을 하고 완료버튼을 눌러주세요.
          </DialogDescription>
        </DialogHeader>
        <form action={editTarget}>
          <div className="grid gap-4 py-4">

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="naverId" className="text-right">
                네이버ID
              </Label>
              <Input
                id="naverId"
                defaultValue={naverId}
                className="col-span-3"
                name="naverId"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="blogId" className="text-right">
                블로그ID
              </Label>
              <Input
                id="blogId"
                defaultValue={blogId}
                className="col-span-3"
                name="blogId"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                전화번호
              </Label>
              <Input
                id="phone"
                defaultValue={phone}
                className="col-span-3"
                name="phone"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isReceiveOk" className="text-right">
                수신희망여부
              </Label>

              <Select name="isReceiveOk" defaultValue={isReceiveOk.toString()}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="수신or거부" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">수신</SelectItem>
                    <SelectItem value="0">거부</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <Input
                id="isReceiveOk"
                defaultValue={isReceiveOk}
                className="col-span-3"
                name="isReceiveOk"
              /> */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="collectUrl" className="text-right">
                추출 URL
              </Label>
              <Input
                id="collectUrl"
                defaultValue={collectUrl}
                className="col-span-3"
                name="collectUrl"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memo" className="text-right">
                메모
              </Label>
              <Textarea
                id="memo"
                defaultValue={memo}
                className="col-span-3"
                name="memo"
              />
            </div>
          </div>
          <input type="hidden" name="targetSeq" value={targetSeq} />
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-400" onClick={() => setOpen(false)}>완료</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}