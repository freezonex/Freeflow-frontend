import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
const rowColorSingle = ['bg-[#C4EB56]', 'bg-[#EDF9CC]'];
const rowColorDouble = ['bg-[#D3F080]', 'bg-[#FCFFF5]'];
function PayloadTable({ content }) {
  return (
    <Table>
      <TableBody className="border border-[#C6C6C6] border-solid">
        {content.map((item, index) => (
          <TableRow
            key={index}
            className="border border-[#C6C6C6] border-solid"
          >
            <TableCell
              className={`${
                index % 2 === 0 ? rowColorSingle[0] : rowColorDouble[0]
              } border border-solid border-[#C6C6C6] font-semibold	`}
            >
              {item.key}
            </TableCell>
            <TableCell
              className={
                index % 2 === 0 ? rowColorSingle[1] : rowColorDouble[1]
              }
            >
              {item.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PayloadTable;
