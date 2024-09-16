'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

import Header from './header';
import { Card, PlusCard } from './card';
import {
  fetchAllNodeRed,
  addNodeRed,
  deleteNodeRed,
  updateComponentName,
} from '@/actions/actions';
import { Search, ComboBox } from '@carbon/react';
import { Filter } from '@carbon/icons-react';

export default function Board() {
  const [allNodeRed, setAllNodeRed] = useState([]);
  const [refresh, setRefresh] = useState({});
  useEffect(() => {
    fetchAllNodeRed().then((res) => {
      setAllNodeRed(res.data);
    });
  }, [refresh]);
  console.log('allnodered', allNodeRed);

  function addNodeRedHandler() {
    console.log('addNodeRedHandler');
    addNodeRed().then((res) => {
      fetchAllNodeRed().then((res) => {
        setAllNodeRed(res.data);
      });
    });
  }

  function deleteNodeRedHandler(noderedName) {
    console.log('deleteNodeRedHandler');
    deleteNodeRed(noderedName).then((res) => {
      setRefresh({});
    });
  }

  function renameNodeRedHandler(noderedName, alias) {
    console.log('renameNodeRedHandler');
    updateComponentName(noderedName, alias).then((res) => {
      setRefresh({});
    });
  }

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
      <div className="flex flex-wrap gap-x-[2rem] gap-y-[2rem] bg-white p-[2rem]">
        <PlusCard addComponentHandler={addNodeRedHandler} />
        {allNodeRed.map((node) => (
          <Card
            nodered={node}
            deleteNodeRedHandler={deleteNodeRedHandler}
            renameNodeRedHandler={renameNodeRedHandler}
          ></Card>
        ))}
      </div>
    </>
  );
}
