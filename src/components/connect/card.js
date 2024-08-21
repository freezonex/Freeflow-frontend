'use client';
import React from 'react';
import { ContentSvg } from './cardSvg';
import { Heading } from '@carbon/react';
import { Add, CloseFilled } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';

export function Card({ nodered, deleteNodeRedHandler }) {
  const router = useRouter();
  return (
    <div className="relative w-[198px] h-[198px] bg-[#f4f4f4] rounded-[3px] shadow-lg p-3  group cursor-pointer">
      <div
        onClick={() => {
          router.push(`/connect/${nodered.name}`);
        }}
      >
        <Heading className="text-[18px] ml-2 mb-4">{nodered.name}</Heading>
        <ContentSvg />
      </div>
      <CloseFilled
        className="absolute top-0 right-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => deleteNodeRedHandler(nodered.name.split('-')[1])}
      />
    </div>
  );
}

export function PlusCard({ addNodeRedHandler }) {
  return (
    <div
      className="w-[198px] h-[198px] bg-[#f4f4f4] rounded-[3px] shadow-lg flex justify-center items-center cursor-pointer"
      onClick={addNodeRedHandler}
    >
      <Add className="w-[100px] h-[100px] fill-[#B2ED1D]" />
    </div>
  );
}
