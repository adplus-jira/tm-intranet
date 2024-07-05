'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../components/customDatePicker";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";



export function CallList({ userList, handleSearch, callLists }) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [values, setValues] = useState({});
  const [callList, setCallList] = useState(callLists);

  const getUserName = (userSeq) => {
    return userList.find(user => user.idx === userSeq)?.user_name;
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const onClickReset = () => {
    setValues({ user_seq: '', result: '', searchValue: '' });
    setCallList(callLists);
    setDate({
      from: new Date(),
      to: addDays(new Date(), 7),
    })
  }

  return (
    <div className="">
      <div className="flex flex-row w-full space-x-2 align-center justify-center mb-10">
        <Select name="user_seq" value={values.user_seq} onValueChange={(v) => setValues({ ...values, user_seq: v })}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="사용자" />
          </SelectTrigger>
          <SelectContent>
            {
              userList.map((user, index) => (
                <SelectItem key={index} value={user.idx}>{user.user_name}({user.user_id})</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <Select name="result" value={values.result} onValueChange={(v) => setValues({ ...values, result: v })}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="처리상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="대기">대기</SelectItem>
            <SelectItem value="자료요청">자료요청</SelectItem>
            <SelectItem value="부재중">부재중</SelectItem>
            <SelectItem value="수신거부">수신거부</SelectItem>
          </SelectContent>
        </Select>
        <DatePicker date={date} setDate={setDate} />
        <Input className="w-[200px]" placeholder="검색어 입력" name="searchValue" onChange={onChange} value={values.searchValue} />
        <Button className="w-[100px]" onClick={() => handleSearch({ ...values, startDate: date.from, endDate: date.to }).then(res => setCallList(res) )}>검색</Button>
        <Button className="w-[100px]" onClick={() => onClickReset()}>초기화</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>타겟SEQ</TableHead>
            <TableHead>네이버ID</TableHead>
            <TableHead>블로그Id</TableHead>
            <TableHead>번호</TableHead>
            <TableHead>만든날짜</TableHead>
            <TableHead>업데이트날짜</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            callList.map((call, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{getUserName(call.user_seq)}</TableCell>
                <TableCell>{call.target_seq}</TableCell>
                <TableCell>{call.naver_id}</TableCell>
                <TableCell>{call.blog_id}</TableCell>
                <TableCell>{call.phone}</TableCell>
                <TableCell>{call.create_date?.substring(0, 10)}</TableCell>
                <TableCell>{call.update_date?.substring(0, 10)}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}