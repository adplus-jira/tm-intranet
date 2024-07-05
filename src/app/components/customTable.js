import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table"
import { useEffect, useState } from "react"

export const CustomTable = ({ columns, rowDatas, pagination, setPagination, maxPage }) => {
  
  const [rows, setRows] = useState(rowDatas);

  useEffect(() => {
    setRows(rowDatas);
  }, []);
  
  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          {
            columns.map((column, index) => (
              <TableHead key={index}>{column}</TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          rows.map((row, index) => (
            <TableRow key={index}>
              {
                columns.map((column, index) => (
                  <TableCell key={index}>{row[column]}</TableCell>
                ))
              }
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
    <div className="flex justify-center space-x-2">
      <Button onClick={() => setPagination(pagination-1)} disabled={(pagination-1) <= 0}>Prev</Button>
      <p>{pagination+1}</p>
      <Button onClick={() => setPagination(pagination+1)} disabled={(pagination+1) >= maxPage}>Next</Button>
    </div>
    </>
  )
}