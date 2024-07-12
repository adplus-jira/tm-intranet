'use client';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useCallback, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const getDataformat = ({ column, data }) => {
  switch (column) {
    case 'update_date':
    case 'create_date':
      return data?.substring(0, 10);
    default:
      return data;
  }
}

export const CustomTable = ({ columns, rowDatas, count }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState(1);
  const [showCount, setShowCount] = useState(10);
  const maxPage = Math.ceil(count / showCount);

  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            {
              columns.map((column, index) => (
                <TableHead key={index} className="min-w-[100px]">{column.label}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-scroll w-full" style={{ maxHeight: '500px' }}>
          {
            rowDatas.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{(index + 1) + ((pagination-1)*showCount)}</TableCell>
                {
                  columns.map((column, index) => (
                    <TableCell key={index}>{
                      getDataformat({ column: column.id, data: row[column.id] })
                    }</TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <div className="flex flex-rows space-x-2 justify-between my-10">
        <div>
          {/* <Input className="w-[100px]" placeholder="Page"  /> */}
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => {
            router.push(pathname + '?' + createQueryString('page', pagination - 1));
            setPagination(pagination - 1)
          }} disabled={(pagination - 1) <= 0}>Prev</Button>
          <p>{pagination}/{maxPage ? maxPage : 1}</p>
          <Button onClick={() => {
            router.push(pathname + '?' + createQueryString('page', pagination + 1));
            setPagination(pagination + 1)
            }} disabled={(pagination + 1) > maxPage}>Next</Button>
        </div>
        <div className="">
          <Select value={showCount} onValueChange={(v) => {
            setShowCount(v);
            router.push(pathname + '?' + createQueryString('count', v));
          }} >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={10}>10</SelectItem>
              <SelectItem value={20}>20</SelectItem>
              <SelectItem value={30}>30</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  )
}