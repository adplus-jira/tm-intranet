'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../components/customDatePicker";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { subDays } from "date-fns";
import { CustomTable } from "../components/custom-table";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const columns = [{
  id: 'target_seq',
  label: '타겟SEQ'
}, {
  id: 'call_user_name',
  label: '전화한USER'
}, {
  id: 'status',
  label: '상태'
}, {
  id: 'talk_user_name',
  label: '자료보낸USER'
}, {
  id: 'memo',
  label: '메모'
}, {
  id: 'create_date',
  label: '생성된날짜'
}, {
  id: 'update_date',
  label: '업데이트날짜'
}];

export const TalkTable = ({ targetDatas, count }) => {
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

  const handleSearch = () => {
    const startDate = date.from.toISOString();
    const endDate = date.to.toISOString();
    let query = '';

    if (values.status) query += createQueryString('status', values.status) + '&';
    if (startDate) query += createQueryString('startDate', startDate) + '&';
    if (endDate) query += createQueryString('endDate', endDate) + '&';
    
    if (query.endsWith('&')) {
      query = query.slice(0, -1);
    }

    router.push(pathname + '?' + query);
  }

  const onClickReset = () => {
    setValues({ status: '' });
    setDate({
      from: subDays(new Date(), 7),
      to: new Date(),
    });
    router.push(pathname);
  }
  
  return (
    <div className="p-4">
      <div className="flex md:flex-row flex-col w-full md:space-x-2 align-center justify-center mb-10">
        <Select name="status" value={values.status} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger className="md:w-[200px] w-full mb-2">
            <SelectValue placeholder="처리상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="대기">대기</SelectItem>
            <SelectItem value="친구추가불가">친구추가불가</SelectItem>
            <SelectItem value="전달완료">전달완료</SelectItem>
          </SelectContent>
        </Select>
        <DatePicker date={date} setDate={setDate} className={"mb-2"} />
        <Button className="md:w-[100px] w-full mb-2" onClick={() => handleSearch()}>검색</Button>
        <Button className="md:w-[100px] w-full mb-2" onClick={() => onClickReset()}>초기화</Button>
      </div>
    <CustomTable columns={columns} rowDatas={targetDatas} count={count} />
    </div>
  )
}