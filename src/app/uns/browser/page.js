'use client';
import { useEffect, useRef, useState } from 'react';
import useMqtt from '@/lib/useMqtt';
import { useSearchParams } from 'next/navigation';
import { Heading, Tag, InlineNotification } from '@carbon/react';
import { CaretDown, ArrowDownRight } from '@carbon/icons-react';
import { fetchMqttTopics } from '@/actions/actions';

export default function Home() {
  //   const searchParams = useSearchParams();
  const [allTopics, setAllTopics] = useState([]);
  const [topic, setTopic] = useState('#');
  const [incommingMessages, setIncommingMessages] = useState([]);
  const [assetName, setAssetName] = useState('');
  const [assetDescription, setAssetDescription] = useState('');
  const [status, setStatus] = useState('');
  const [iframeAddress, setIframeAddress] = useState('');
  const [cardContent, setCardContent] = useState([]);
  const [tableContent, setTableContent] = useState([]);
  useEffect(() => {
    fetchMqttTopics().then((res) => {
      setAllTopics(
        res.data.map((item) => {
          return item.topic;
        })
      );
    });
  }, []);
  console.log(allTopics);
  const incommingMessageHandlers = useRef([
    {
      topic: topic,
      handler: (message) => {
        console.log(message);
        addMessage(message);
      },
    },
  ]);
  const addMessage = (message) => {
    setIncommingMessages((incommingMessages) => [
      ...incommingMessages,
      message,
    ]);
    console.log(message.payload);
    const kvSingle = [];
    const kvArray = [];
    let responsiblePersonEntry = null;
    let statusEntry = null;
    for (const [key, value] of Object.entries(message.payload)) {
      console.log(key, value, typeof value);
      if (typeof value !== 'object' && !Array.isArray(value)) {
        if (key === 'assetName') {
          setAssetName(value);
        } else if (key === 'assetDescription') {
          setAssetDescription(value);
        } else if (key === 'iframeAddress') {
          setIframeAddress(value);
        } else if (key === 'Responsible Person') {
          responsiblePersonEntry = { key, value };
        } else if (key === 'Status') {
          statusEntry = { key, value };
        } else {
          kvSingle.push({ key, value });
        }
      } else if (Array.isArray(value)) {
        kvArray.push({ key, value });
      }
    }

    if (responsiblePersonEntry) {
      kvSingle.unshift(responsiblePersonEntry);
    }
    if (statusEntry) {
      kvSingle.unshift(statusEntry);
    }
    setCardContent(kvSingle);
    setTableContent(kvArray);
    console.log(kvSingle, kvArray);
  };
  useMqtt({
    uri: 'ws://supcononenorth.fortiddns.com:8083/mqtt',
    options: {
      // username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
      // password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
      clientId: 'client1',
    },
    topicHandlers: incommingMessageHandlers.current,
    onConnectedHandler: (client) => setMqttClient(client),
  });
  const mqttClientRef = useRef(null);
  console.log(mqttClientRef.current, mqttClientRef.current?.connected);

  const setMqttClient = (client) => {
    console.log('connected');
    mqttClientRef.current = client;
    console.log(client, client.connected);
  };
  const clearMessages = () => {
    setIncommingMessages(() => []);
  };
  const publishMessages = (client) => {
    if (!client) {
      console.log('(publishMessages) Cannot publish, mqttClient: ', client);
      return;
    }
    console.log(client.connected);
    client.publish(topic, '1st message from component');
  };
  console.log(tableContent);
  return (
    <>
      {assetName === '' ? (
        allTopics.map((item) => <div>{item}</div>)
      ) : (
        <div>
          <Heading class="mt-3 mb-3 text-4xl text-[#0F62FE] font-medium leading-18 tracking-tighter text-left">
            {assetName}
          </Heading>

          <Heading className="mb-12 text-sm text-[#0F62FE] font-normal leading-4.55 tracking-tighter text-left">
            {assetDescription}
          </Heading>
          <div className="mb-12 flex justify-center w-full shadow">
            <iframe
              src={iframeAddress}
              className="w-full"
              height="500"
              frameborder="0"
              title="luma embed"
            ></iframe>
          </div>
          <div className="flex items-end justify-between ">
            <div>
              <CaretDown color="#0F62FE" className="w-[38px] h-[38px] " />
              <CaretDown color="#0F62FE" className="w-[38px] h-[38px] -mt-7" />
              <CaretDown color="#0F62FE" className="w-[38px] h-[38px] -mt-7" />
            </div>
            <ArrowDownRight color="#0F62FE" className="w-[74px] h-[74px]" />
          </div>
          <div className="mb-3 border border-[#0F62FE] border-solid" />
          {cardContent.map((item, index) => {
            return <div>item.content</div>;
          })}
        </div>
      )}
    </>
  );
}
