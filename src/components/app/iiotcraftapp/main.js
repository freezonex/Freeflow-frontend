'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

import Header from './header';
import {
  fetchAllIIoTApp,
  stopApplication,
  startApplication,
  deleteApplication,
} from '@/actions/actions';
import { Search, ComboBox, Heading } from '@carbon/react';
import { Application } from '@carbon/icons-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Filter } from '@carbon/icons-react';
import { Button } from '@/components/ui/button';
import AppInfoTable from './appInfoTable';

export default function Board() {
  const [allApp, setAllApp] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [refresh, setRefresh] = useState({});
  useEffect(() => {
    fetchAllIIoTApp().then((res) => {
      setAllApp(res.data);
      if (res.data.length > 0) {
        setSelectedApp(res.data[0]);
      }
    });
  }, [refresh]);
  console.log('allApp', allApp);

  return (
    <>
      <Header></Header>
      <div className="mb-[2rem] mt-[2rem] flex items-center justify-between">
        <Search
          size="lg"
          className="w-[70%]"
          placeholder="Search input text"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id="search-1"
          onChange={() => {}}
          onKeyDown={() => {}}
        />
        <div className=" flex space-x-2 items-center">
          <Filter className="w-[1.5rem] h-[1.5rem] fill-[#6F6F6F]" />
          <ComboBox
            size="lg"
            onChange={() => {}}
            placeholder="Prompt an option(s)"
            id="carbon-combobox"
            itemToString={(item) => (item ? item.text : '')}
          />
        </div>
      </div>
      <div className="flex gap-x-[2rem]">
        <div className="bg-white w-[20%]">
          <div className="flex gap-2 items-center bg-[#E8E8E8] p-4">
            <Heading className="font-[600]">Application</Heading>
          </div>
          <ScrollArea className="h-full w-full rounded-md border mt-2 p-1">
            <div className="p-2">
              {allApp.map((app, index) => (
                <>
                  <div
                    className="flex gap-x-2 items-center cursor-pointer"
                    onClick={() => {
                      setSelectedApp(app);
                    }}
                  >
                    <Application className="w-4 h-4" />
                    <div key={index} className="text-sm">
                      {app.name}
                    </div>
                  </div>
                  <Separator className="my-2 bg-gradient-to-r from-white via-black to-white" />
                </>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="bg-white w-[80%]">
          <div className="flex justify-between  items-center bg-[#E8E8E8] p-2 pl-4 shadow">
            <Heading className="font-[600] text-[18px] leading-[24px]">
              {selectedApp?.name}
            </Heading>
            <div className="flex gap-2">
              <Button
                className="bg-white rounded-[3px] h-[30px]"
                onClick={() => {
                  if (selectedApp && selectedApp.uri) {
                    const baseUrl =
                      process.env.NEXT_PUBLIC_BASE_URL || 'http://52.77.217.53';
                    const fullUrl = `${baseUrl}${selectedApp.uri}`;
                    window.open(fullUrl, '_blank');
                  } else {
                    console.log('No URI available for this application');
                    // 可以在这里添加一个提示，告诉用户没有可用的 URI
                  }
                }}
              >
                Open
              </Button>
              <Button
                className="bg-[#C7F564] hover:bg-[#8bbc02] rounded-[3px] h-[30px]"
                onClick={() => {
                  startApplication(selectedApp.name, 'frontend').then((res) => {
                    console.log('res', res);
                    setRefresh({});
                  });
                }}
              >
                Start
              </Button>
              <Button
                className="bg-[#525252] rounded-[3px] h-[30px] text-white"
                onClick={() => {
                  stopApplication(selectedApp.name, 'frontend').then((res) => {
                    console.log('res', res);
                    setRefresh({});
                  });
                }}
              >
                Stop
              </Button>
              <Button
                className="bg-[#393939] rounded-[3px] h-[30px] text-white"
                onClick={() => {
                  deleteApplication(selectedApp.name).then((res) => {
                    setRefresh({});
                  });
                }}
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="p-4">
            {selectedApp && <AppInfoTable app={selectedApp} />}
          </div>
        </div>
      </div>
    </>
  );
}
