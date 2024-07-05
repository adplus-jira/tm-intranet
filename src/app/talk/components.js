'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../components/customDatePicker";
import React from "react";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";

export const TalkTable = ({ talkLists, userList }) => {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [values, setValues] = React.useState({});
  const [talkList, setTalkList] = React.useState(talkLists);

  const onClickReset = () => {
    setValues({ status: '' });
    setTalkList(talkLists);
    setDate({
      from: new Date(),
      to: addDays(new Date(), 7),
    })
  }

  const getUserName = (userSeq) => {
    return userList.find(user => user.idx === userSeq)?.user_name;
  }
  
  return (
    <div>
      <div className="flex flex-row w-full space-x-2 align-center justify-center mb-10">
        <Select name="status" value={values.status} onValueChange={(v) => setValues({ ...values, status: v })}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="처리상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="대기">대기</SelectItem>
            <SelectItem value="친구추가불가">친구추가불가</SelectItem>
            <SelectItem value="전달완료">전달완료</SelectItem>
          </SelectContent>
        </Select>
        <DatePicker date={date} setDate={setDate} />
        <Button className="w-[100px]" onClick={() => handleSearch({ ...values, startDate: date.from, endDate: date.to }).then(res => setTalkList(res) )}>검색</Button>
        <Button className="w-[100px]" onClick={() => onClickReset()}>초기화</Button>
      </div>
    
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>타겟SEQ</TableHead>
          <TableHead>전화한USER</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>자료보낸USER</TableHead>
          <TableHead>메모</TableHead>
          <TableHead>생성된날짜</TableHead>
          <TableHead>업데이트날짜</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          talkList?.map((talk, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{talk.target_seq}</TableCell>
              <TableCell>{getUserName(talk.call_user_seq)}</TableCell>
              <TableCell>{talk.status}</TableCell>
              <TableCell>{talk.talk_user_seq}</TableCell>
              <TableCell>{talk.memo}</TableCell>
              <TableCell>{talk.create_date?.substring(0, 10)}</TableCell>
              <TableCell>{talk.update_date?.substring(0, 10)}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
    </div>
  )
}