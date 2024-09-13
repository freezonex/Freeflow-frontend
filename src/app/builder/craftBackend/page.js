import React from 'react';
import { headers } from 'next/headers';

function Page() {
  const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  console.log('ip', ip);
  return (
    <iframe
      src={`http://${ip}:8000`}
      className="w-full h-full min-h-[96vh] m-[-2rem] absolute mr-0"
    />
  );
}

export default Page;
