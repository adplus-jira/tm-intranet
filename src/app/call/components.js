'use client';

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../components/customDatePicker";
import { Button } from "@/components/ui/button";
import { subDays } from "date-fns";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { CustomTable } from "../components/customTable";

const columns = [{
  id: 'user_seq',
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

export function CallList({ userList, getCallDatas }) {
  const [date, setDate] = React.useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [pagination, setPagination] = useState(0);
  const [showCount, setShowCount] = useState(10);
  const [callList, setCallList] = useState([]);
  const [maxCount, setMaxCount] = useState(0);
  const [values, setValues] = useState({});

  const handleSearch = () => {
    getCallDatas({ ...values, startDate: date.from, endDate: date.to, pagination: 0, count: 10 }).then(res => {
      setCallList(res.data);
      setMaxCount(res.count);
      setPagination(0);
      setShowCount(10);
    });
  }

  const onClickReset = () => {
    setValues({});
    getCallDatas({ pagination: 0, count: 10 }).then(res => {setCallList(res.data); setMaxCount(res.count)});
    setDate({
      from: subDays(new Date(), 7),
      to: new Date(),
    })
  }
  
  useEffect(() => {
    getCallDatas({ pagination: pagination, count: showCount, ...values, startDate: date.from, endDate: date.to }).then(res => {setCallList(res.data); setMaxCount(res.count)});
  }, [pagination, showCount]);

  return (
    <div className="p-4">
      <div className="flex md:flex-row flex-col w-full md:space-x-2 align-center justify-center mb-10">
        <Select name="user_seq" value={values.user_seq} onValueChange={(v) => setValues({ ...values, userSeq: v })}>
          <SelectTrigger className="md:w-[250px] w-full mb-2">
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
        <Select name="result" value={values.result} onValueChange={(v) => setValues({ ...values, result: v })}>
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
        <Input className="md:w-[200px] w-full mb-2" placeholder="네이버ID" value={values.naverId} onChange={(e) => setValues({ ...values, naverId: e.target.value })} />
        <Input className="md:w-[200px] w-full mb-2" placeholder="블로그ID" value={values.blogId} onChange={(e) => setValues({ ...values, blogId: e.target.value })} />
        <Input className="md:w-[200px] w-full mb-2" placeholder="전화번호" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })} />

        <Button className="md:w-[100px] w-full mb-2" onClick={() => handleSearch() }>검색</Button>
        <Button className="md:w-[100px] w-full mb-2" onClick={() => onClickReset()}>초기화</Button>
      </div>
      <CustomTable columns={columns} rowDatas={callList} pagination={pagination} setPagination={setPagination} setShowCount={setShowCount} showCount={showCount} maxPage={Math.ceil(maxCount/showCount)} />
    </div>
  )
}