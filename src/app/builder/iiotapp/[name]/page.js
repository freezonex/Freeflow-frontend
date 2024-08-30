'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGrafanaByName } from '@/actions/actions';

function Page({ params }) {
  const router = useRouter();
  const name = params.name;
  const [grafana, setGrafana] = useState({});

  useEffect(() => {
    if (name) {
      console.log('fetchGrafanaByName', name);
      fetchGrafanaByName(name.split('-')[1]).then((res) => {
        setGrafana(res.data[0]);
      });
    }
  }, [name]);
  console.log('grafana', grafana);
  return (
    <div
      className="relative h-full"
      style={{
        width: 'calc(100vw - 16rem)',
        margin: '-2rem',
        marginRight: '-2rem',
        marginLeft: '-2rem',
      }}
    >
      <iframe
        src={`${grafana.uri}`}
        className="absolute top-0 left-0 w-full h-full min-h-[95vh]"
        //   className="w-full h-full min-h-[95vh] m-[-2rem] "
      />
    </div>
  );
}

export default Page;
