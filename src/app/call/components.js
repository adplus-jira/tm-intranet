'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../components/customDatePicker";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export function SearchBar({ userList }) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <div className="flex flex-row w-full space-x-2 align-center justify-center">
      <Select>
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
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="처리상태" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">대기</SelectItem>
          <SelectItem value="1">자료요청</SelectItem>
          <SelectItem value="2">부재중</SelectItem>
          <SelectItem value="3">수신거부</SelectItem>
          <SelectItem value="4">본인아님</SelectItem>
        </SelectContent>
      </Select>
      <DatePicker date={date} setDate={setDate} />
      <Input className="w-[200px]" placeholder="검색어 입력" />
      <Button className="w-[100px]">검색</Button>
    </div>
  )
}

export function CallList({ callList }) {

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {
            callList.map((call, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{call.user_name}</TableCell>
                <TableCell>{call.target_seq}</TableCell>
                <TableCell>{call.naver_id}</TableCell>
                <TableCell>{call.blog_id}</TableCell>
                <TableCell>{call.phone}</TableCell>
                <TableCell>{call.create_date}</TableCell>
                <TableCell>{call.update_date}</TableCell>
              </TableRow>
            ))
          } */}
        </TableBody>
      </Table>
    </div>
  )
}