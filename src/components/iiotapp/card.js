'use client';
import React from 'react';
import { ContentSvg } from './cardSvg';
import { Heading } from '@carbon/react';
import { Add, CloseFilled } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';

export default function Card({ component, deleteGrafanaHandler }) {
  const router = useRouter();
  return (
    <div className="relative w-[198px] h-[198px] bg-[#f4f4f4] rounded-[3px] shadow-lg p-3  group cursor-pointer">
      <div
        onClick={() => {
          router.push(`/connect/${component.name}`);
        }}
      >
        <Heading className="text-[18px] ml-2 mb-4">{component.name}</Heading>
        <ContentSvg />
      </div>
      <CloseFilled
        className="absolute top-0 right-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => deleteGrafanaHandler(component.name.split('-')[1])}
      />
    </div>
  );
}
