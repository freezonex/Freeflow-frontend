'use client';
import React, { useState } from 'react';
import { ContentSvg } from './cardSvg';
import { Heading } from '@carbon/react';
import { Add, CloseFilled, Edit } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Card({ nodered, deleteNodeRedHandler, renameNodeRedHandler }) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [alias, setAlias] = useState('');
  return (
    <div className="relative w-[198px] h-[198px] bg-[#f4f4f4] rounded-[3px] shadow-lg p-3  group cursor-pointer">
      <div>
        <div className="flex justify-between items-center ml-2 mb-4">
          <Heading className="text-[18px] ">{nodered.alias}</Heading>
          <Edit
            onClick={() => {
              setShowDialog(true);
            }}
          />
        </div>
        <ContentSvg
          onClick={() => {
            router.push(`/connect/${nodered.name}`);
          }}
        />
      </div>
      <CloseFilled
        className="absolute top-0 right-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => deleteNodeRedHandler(nodered.name.split('-')[1])}
      />
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#F4F4F4]">
          <DialogHeader>
            <Heading className="text-[20px] leading-[28px]">
              Rename Components
            </Heading>
          </DialogHeader>
          <Input
            className="bg-white border-0 border-b rounded-[3px]"
            placeholder="Set alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
          <Button
            className="w-full bg-[#C7F564] rounded-[3px] font-semibold hover:bg-[#8bbc02]"
            onClick={() => {
              console.log(nodered.name.split('-')[1], alias);
              renameNodeRedHandler(nodered.name.split('-')[1], alias);
              setShowDialog(false);
            }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function PlusCard({ addComponentHandler }) {
  return (
    <div
      className="w-[198px] h-[198px] bg-[#f4f4f4] rounded-[3px] shadow-lg flex justify-center items-center cursor-pointer"
      onClick={addComponentHandler}
    >
      <Add className="w-[100px] h-[100px] fill-[#B2ED1D]" />
    </div>
  );
}
