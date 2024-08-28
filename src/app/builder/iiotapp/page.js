import React from 'react';

function Page() {
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
        src="/dt/grafana1/"
        className="absolute top-0 left-0 w-full h-full min-h-[95vh]"
        //   className="w-full h-full min-h-[95vh] m-[-2rem] "
      />
    </div>
  );
}

export default Page;
