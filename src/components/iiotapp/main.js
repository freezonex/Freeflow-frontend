'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

import Header from './header';
import { PlusCard } from '../connect/card';
import Card from './card';
import { fetchAllGrafana, addGrafana, deleteGrafana } from '@/actions/actions';
import { Search, ComboBox } from '@carbon/react';
import { Filter } from '@carbon/icons-react';

export default function Board() {
  const [allGrafana, setAllGrafana] = useState([]);
  const [refresh, setRefresh] = useState({});
  useEffect(() => {
    fetchAllGrafana().then((res) => {
      setAllGrafana(res.data);
    });
  }, [refresh]);
  console.log('allGrafana', allGrafana);

  function addGrafanaHandler() {
    addGrafana().then((res) => {
      fetchAllGrafana().then((res) => {
        setAllGrafana(res.data);
      });
    });
  }

  function deleteGrafanaHandler(grafanaName) {
    deleteGrafana(grafanaName).then((res) => {
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
        <PlusCard addComponentHandler={addGrafanaHandler} />
        {allGrafana.map((node) => (
          <Card
            component={node}
            deleteGrafanaHandler={deleteGrafanaHandler}
          ></Card>
        ))}
      </div>
    </>
  );
}
