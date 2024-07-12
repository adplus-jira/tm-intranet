'use client';

import { CustomTable } from "../components/custom-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../components/customDatePicker";
import { subDays } from "date-fns";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export const SearchBar = ({ values, setValues, date, setDate, onSearchClick, onClickReset }) => {

  return (
    <div className="flex md:flex-row flex-col w-full md:space-x-2 align-center justify-center mb-10 p-4">
      <Select name="result" value={values.result ? values.result : ''} onValueChange={(v) => setValues({ ...values, result: v })}>
        <SelectTrigger className="md:w-[200px] w-full mb-2">
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

        <Button className="md:w-[100px] w-full mb-2" onClick={() => onSearchClick() }>검색</Button>
        <Button className="md:w-[100px] w-full mb-2" onClick={() => onClickReset()}>초기화</Button>
    </div>
  )
}

export const RecordTable = ({ recordDatas, count }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params;
  }, [searchParams]);

  const [date, setDate] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  
  const [values, setValues] = useState({});

  const onSearchClick = () => {
    let query = '';
    if (values.result) query += createQueryString('result', values.result) + '&';
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
    router.push(pathname);
  }

  const columns = [{
    id: 'naver_id',
    label: '네이버 ID'
  }, {
    id: 'blog_id',
    label: '블로그 ID'
  }, {
    id: 'result',
    label: '결과'
  }, {
    id: 'phone',
    label: '전화번호'
  }, {
    id: 'update_date',
    label: '수정일'
  }, {
    id: 'memo',
    label: '메모'
  }];

  return (
    <div>
      <SearchBar setDate={setDate} date={date} values={values} setValues={setValues} onSearchClick={onSearchClick} onClickReset={onClickReset} />
      <div className="p-4">
        <CustomTable columns={columns} rowDatas={recordDatas} count={count} />
      </div>
    </div>
  )
}