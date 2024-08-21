'use client';
import React from 'react';
import { Heading, Link } from '@carbon/react';
import { useRouter } from 'next/navigation';
import { VideoPlayer, Play, Book } from '@carbon/icons-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
export default function Home() {
  const router = useRouter();
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.0.0-beta.${a.length - i}`
  );
  return (
    <>
      <Heading className="mb-10 text-[28px] leading-[28px]">
        Welcome to FreeFlow!
      </Heading>

      <Heading className="text-[20px] leading-[18px] font-semibold ">
        Quick Start
      </Heading>
      <div className="mt-5 flex items-start justify-center space-x-6 h-full">
        <div className="bg-white w-[75%] p-6">
          <div className="flex items-center space-x-4 ">
            <VideoPlayer className="w-[20px] h-[20px] fill-[#94c618]" />
            <Heading className="text-[20px]">Video Tour</Heading>
          </div>
          <Heading className="text-[14px] mt-2">
            This tool is a programming tool for wiring together hardware
            devices, APIs and online services in new and interesting ways.
          </Heading>

          <div className="mt-8 flex gap-4 h-full">
            <div className="w-[50%] aspect-video bg-[#D9D9D9] flex items-center justify-center">
              <Play className="w-[66px] h-[66px] fill-[#878587]" />
            </div>
            <div className="w-[50%] flex items-stretch">
              <div className="grid grid-rows-2 flex-grow">
                <div className="row-start-2 row-span-1 flex flex-col justify-between">
                  <div>
                    <Heading className="text-[20px]">01 How to do</Heading>
                    <Heading className="text-[14px] leading-[18px] mt-2">
                      This tool is a programming tool for wiring together
                      hardware devices, APIs and online services in new and
                      interesting ways.
                    </Heading>
                  </div>
                  <Heading className="text-[14px] leading-[18px] mt-auto">
                    01/08/2024
                  </Heading>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4 h-full">
            <div className="w-[50%] aspect-video bg-[#D9D9D9] flex items-center justify-center">
              <Play className="w-[66px] h-[66px] fill-[#878587]" />
            </div>
            <div className="w-[50%] flex items-stretch">
              <div className="grid grid-rows-2 flex-grow">
                <div className="row-start-2 row-span-1 flex flex-col justify-between">
                  <div>
                    <Heading className="text-[20px]">02 How to do</Heading>
                    <Heading className="text-[14px] leading-[18px] mt-2">
                      This tool is a programming tool for wiring together
                      hardware devices, APIs and online services in new and
                      interesting ways.
                    </Heading>
                  </div>
                  <Heading className="text-[14px] leading-[18px] mt-auto">
                    01/08/2024
                  </Heading>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white w-[25%] p-6 ">
          <div className="flex items-center space-x-4 ">
            <Book className="w-[20px] h-[20px] fill-[#94c618]" />
            <Heading className="text-[20px]">Resources</Heading>
          </div>
          <Heading className="text-[14px] mt-2">
            You can also check here.
          </Heading>
          <ScrollArea className="h-[400px] w-48 rounded-md border mt-2">
            <div className="p-4">
              {tags.map((tag) => (
                <>
                  <div key={tag} className="text-sm">
                    {tag}
                  </div>
                  <Separator className="my-2 " style={{ color: 'black' }} />
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
