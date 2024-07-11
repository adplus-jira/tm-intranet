'use client';
import { CustomTable } from "../components/customTable";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "../components/customDatePicker";

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
      <Input className="md:w-[200px] w-full mb-2" placeholder="검색어 입력" name="searchValue" onChange={(e) => setValues({ ...values, searchValue: e.target.value })} />
      <Button className="md:w-[100px]  w-full mb-2" onClick={() => onSearchClick()}>검색</Button>
      <Button className="md:w-[100px]  w-full mb-2" onClick={() => onClickReset()}>초기화</Button>
    </div>
  )
}

export const RecordTable = ({ getRecordData }) => {

  const [pagination, setPagination] = useState(0);
  const [recordDatas, setRecordDatas] = useState([]);
  const [showCount, setShowCount] = useState(10);
  const today = new Date();
  const [date, setDate] = useState({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
    to: new Date(),
  });
  const [maxCount, setMaxCount] = useState(0);
  const [values, setValues] = useState({});

  useEffect(() => {
    getRecordData({ pagination: pagination, count: showCount, ...values, startDate: date.from, endDate: date.to }).then(res => { setRecordDatas(res.data); setMaxCount(res.count) });
  }, [pagination, showCount]);

  const onSearchClick = () => {
    getRecordData({ ...values, startDate: date.from, endDate: date.to, pagination: 0, count: 10 }).then(res => {
      setRecordDatas(res.data);
      setMaxCount(res.count);
      setPagination(0);
      setShowCount(10);
    });
  }

  const onClickReset = () => {
    setValues({});
    setDate({
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
      to: new Date(),
    });
    getRecordData({ pagination: 0, count: 10, startDate: date.from, endDate: date.to }).then(res => {
      setRecordDatas(res.data);
      setMaxCount(res.count);
      setPagination(0);
      setShowCount(10);
    });
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
        <CustomTable columns={columns} rowDatas={recordDatas} pagination={pagination} setPagination={setPagination} setShowCount={setShowCount} showCount={showCount} maxPage={Math.ceil(maxCount / showCount)} />
      </div>
    </div>
  )
}