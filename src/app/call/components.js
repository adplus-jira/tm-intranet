'use client';

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../components/customDatePicker";
import { Button } from "@/components/ui/button";
import { subDays } from "date-fns";
import { CustomTable } from "../components/custom-table";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const columns = [{
  id: 'user_name',
  label: '이름'
}, {
  id: 'target_seq',
  label: '타겟SEQ'
}, {
  id: 'naver_id',
  label: '네이버ID'
}, {
  id: 'blog_id',
  label: '블로그ID'
}, {
  id: 'phone',
  label: '번호'
}, {
  id: 'result',
  label: '처리상태'
}, 
{
  id: 'create_date',
  label: '만든날짜'
}, {
  id: 'update_date',
  label: '업데이트날짜'
}];

export function CallList({ callLists, count, userList }) {
  const [date, setDate] = React.useState({
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

  const handleSearch = () => {
    let query = '';
    if (values.result) query += createQueryString('result', values.result) + '&';
    if (values.userSeq) query += createQueryString('userSeq', values.userSeq) + '&';
    if (date.from) query += createQueryString('startDate', date.from.toISOString()) + '&';
    if (date.to) query += createQueryString('endDate', date.to.toISOString()) + '&';
    if (values.naverId) query += createQueryString('naverId', values.naverId) + '&';
    if (values.blogId) query += createQueryString('blogId', values.blogId) + '&';
    if (values.phone) query += createQueryString('phone', values.phone) + '&';

    if (query.endsWith('&')) {
      query = query.slice(0, -1);
    }

    router.push(pathname + '?' + query);
  }

  const onClickReset = () => {
    setValues({});
    setDate({
      from: subDays(new Date(), 7),
      to: new Date(),
    });
    router.push('/call');
  }

  return (
    <div className="p-4">
      <div className="flex md:flex-row flex-col w-full md:space-x-2 align-center justify-center mb-10">
        <Select name="user_seq" value={values.user_seq} onValueChange={(v) => setValues({ ...values, userSeq: v })}>
          <SelectTrigger className="md:w-[250px] w-full min-w-[100px] mb-2">
            <SelectValue placeholder="사용자" />
          </SelectTrigger>
          <SelectContent>
            {
              userList && userList.map((user, index) => (
                <SelectItem key={index} value={user.idx}>{user.user_name}({user.user_id})</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <Select name="result" className="md:w-[200px] w-full mb-2" value={values.result} onValueChange={(v) => setValues({ ...values, result: v })}>
          <SelectTrigger>
            <SelectValue placeholder="처리상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="대기">대기</SelectItem>
            <SelectItem value="자료요청">자료요청</SelectItem>
            <SelectItem value="부재중">부재중</SelectItem>
            <SelectItem value="수신거부">수신거부</SelectItem>
          </SelectContent>
        </Select>
        <DatePicker date={date} setDate={setDate} className={"mb-2"} />
        <Input className="md:w-[170px] w-full mb-2" placeholder="네이버ID" value={values.naverId} onChange={(e) => setValues({ ...values, naverId: e.target.value })} />
        <Input className="md:w-[170px] w-full mb-2" placeholder="블로그ID" value={values.blogId} onChange={(e) => setValues({ ...values, blogId: e.target.value })} />
        <Input className="md:w-[170px] w-full mb-2" placeholder="전화번호" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} />

        <Button className="md:w-[100px] w-full mb-2" onClick={() => handleSearch() }>검색</Button>
        <Button className="md:w-[100px] w-full mb-2" onClick={() => onClickReset()}>초기화</Button>
      </div>
      <CustomTable columns={columns} rowDatas={callLists} count={count} />
    </div>
  )
}