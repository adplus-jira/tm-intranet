'use client';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const getDataformat = ({ column, data }) => {
  switch(column) {
    case 'update_date':
    case 'create_date':
      return data?.substring(0, 10);
    default:
      return data;
  }
}

export const CustomTable = ({ columns, rowDatas, pagination, setPagination, setShowCount, showCount, maxPage }) => {

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
                <TableCell>{index + 1}</TableCell>
                {
                  columns.map((column, index) => (
                    <TableCell key={index}>{
                      getDataformat({column: column.id, data: row[column.id] })
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
          <Button onClick={() => setPagination(pagination - 1)} disabled={(pagination - 1) < 0}>Prev</Button>
          <p>{pagination + 1}/{maxPage}</p>
          <Button onClick={() => setPagination(pagination + 1)} disabled={(pagination + 1) >= maxPage}>Next</Button>
        </div>
        <div className="">
          <Select value={showCount} onValueChange={(v) => setShowCount(v)} >
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