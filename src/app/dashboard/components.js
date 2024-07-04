'use client';

import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectValue, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"

export const CallCard = ({ cardData, handleSubmit }) => {

  // 네이버 아이디, 블로그 아이디, 전화한 횟수, 연락처, 추출한 url, 메모
  console.log(cardData);
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-[500px] p-8 m-auto mt-10">
      <form action={handleSubmit}>
      <div className="grid grid-cols-4 gap-2">
        <p className="text-sm">네이버 ID</p>
        <p className="col-span-3">{cardData.naver_id}</p>
        <p className="text-sm">블로그 ID</p>
        <p className="col-span-3">{cardData.blog_id}</p>
        <p className="text-sm">전화한 횟수</p>
        <p className="col-span-3">{cardData.cnt_call}</p>
        <p className="text-sm">연락처</p>
        <p className="col-span-3">{cardData.phone}</p>
        <p className="text-sm">추출한 url</p>
        <p className="col-span-3">{cardData.extract_url}</p>
        <p className="text-sm">메모</p>
        <Textarea className="col-span-3" name="memo">
          {cardData.memo}
        </Textarea>
        <p className="text-sm">결과</p>
        <Select className="col-span-2" name="result">
          <SelectTrigger className="">
            <SelectValue placeholder="------" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="자료요청">자료요청</SelectItem>
            <SelectItem value="부재중">부재중</SelectItem>
            <SelectItem value="수신거부">수신거부</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" >저장</Button>
      </div>
      </form>
    </div>
  )
}