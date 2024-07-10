'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../components/customDatePicker";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { subDays } from "date-fns";
import { CustomTable } from "../components/customTable";

const columns = [{
  id: 'target_seq',
  label: '타겟SEQ'
}, {
  id: 'call_user_seq',
  label: '전화한USER'
}, {
  id: 'status',
  label: '상태'
}, {
  id: 'talk_user_seq',
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

export const TalkTable = ({ userLists, getTalkDatas }) => {
  const [date, setDate] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [pagination, setPagination] = useState(0);
  const [showCount, setShowCount] = useState(10);
  const [talkList, setTalkList] = useState([]);
  const [maxCount, setMaxCount] = useState(0);
  const [values, setValues] = useState({});

  const handleSearch = () => {
    getTalkDatas({ ...values, startDate: date.from, endDate: date.to, pagination: 0, count: 10 }).then(res => {
      setTalkList(res.data);
      setMaxCount(res.count);
      setPagination(0);
      setShowCount(10);
    });
  }

  const onClickReset = () => {
    setValues({});
    getTalkDatas({ pagination: 0, count: 10 }).then(res => {setTalkList(res.data); setMaxCount(res.count)});
    setDate({
      from: subDays(new Date(), 7),
      to: new Date(),
    })
  }
  
  useEffect(() => {
    getTalkDatas({ pagination: pagination, count: showCount, ...values, startDate: date.from, endDate: date.to }).then(res => {
      const resData = res.data.map(data => {
        const talkUser = userLists.find(user => user.idx === data.talk_user_seq);
        const callUser = userLists.find(user => user.idx === data.call_user_seq);
        return { ...data, talk_user_seq: talkUser?.user_name, call_user_seq: callUser?.user_name }
      });

      setTalkList(resData);
      setMaxCount(res.count)
    });
  }, [pagination, showCount]);
  
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
    <CustomTable columns={columns} rowDatas={talkList} pagination={pagination} setPagination={setPagination} setShowCount={setShowCount} showCount={showCount} maxPage={Math.ceil(maxCount/showCount)} />
    </div>
  )
}