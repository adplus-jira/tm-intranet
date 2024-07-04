import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const TalkTable = ({ talkList }) => {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>네이버ID</TableHead>
          <TableHead>블로그ID</TableHead>
          <TableHead>전화번호</TableHead>
          <TableHead>상태</TableHead>
          <TableHead>처리된날짜</TableHead>
          <TableHead>업데이트날짜</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {
          talkList.map((talk, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{talk.naver_id}</TableCell>
              <TableCell>{talk.blog_id}</TableCell>
              <TableCell>{talk.phone}</TableCell>
              <TableCell>{talk.status}</TableCell>
              <TableCell>{talk.create_date}</TableCell>
              <TableCell>{talk.update_date}</TableCell>
            </TableRow>
          ))
        } */}
      </TableBody>
    </Table>
  )
}