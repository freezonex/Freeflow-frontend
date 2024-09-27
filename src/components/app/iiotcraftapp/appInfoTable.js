import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Heading } from '@carbon/react';

const rowColorSingle = ['bg-[#C4EB56]', 'bg-[#EDF9CC]'];
const rowColorDouble = ['bg-[#D3F080]', 'bg-[#FCFFF5]'];

function AppInfoTable({ app }) {
  const data = app.components[0];
  console.log(data);
  const entries = Object.entries(data);
  return (
    <>
      <Table>
        <TableBody className="border border-[#C6C6C6] border-solid">
          <TableCell
            className={`${rowColorSingle[0]} border border-solid border-[#C6C6C6] font-semibold`}
          >
            URI
          </TableCell>
          <TableCell className={rowColorSingle[1]}>{app.uri}</TableCell>
        </TableBody>
      </Table>
      <Heading className="mt-6 mb-3 font-[600]">Components</Heading>
      <Table>
        <TableBody className="border border-[#C6C6C6] border-solid">
          {entries.map(([key, value], index) => (
            <TableRow
              key={index}
              className="border border-[#C6C6C6] border-solid"
            >
              <TableCell
                className={`${
                  index % 2 === 0 ? rowColorSingle[0] : rowColorDouble[0]
                } border border-solid border-[#C6C6C6] font-semibold`}
              >
                {key}
              </TableCell>
              <TableCell
                className={
                  index % 2 === 0 ? rowColorSingle[1] : rowColorDouble[1]
                }
              >
                {value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default AppInfoTable;
