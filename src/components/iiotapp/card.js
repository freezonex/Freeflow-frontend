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

export default function Card({
  component,
  deleteGrafanaHandler,
  renameGrafanaHandler,
}) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [alias, setAlias] = useState('');
  return (
    <div className="relative w-[198px] h-[198px] bg-[#f4f4f4] rounded-[3px] shadow-lg p-3  group cursor-pointer">
      <div>
        <div className="flex justify-between items-center ml-2 mb-4">
          <Heading className="text-[18px] ">{component.alias}</Heading>
          <Edit
            onClick={() => {
              setShowDialog(true);
            }}
          />
        </div>
        <ContentSvg
          onClick={() => {
            router.push(`/connect/${component.name}`);
          }}
        />
      </div>
      <CloseFilled
        className="absolute top-0 right-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => deleteGrafanaHandler(component.name.split('-')[1])}
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
              renameGrafanaHandler(component.name.split('-')[1], alias);
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
