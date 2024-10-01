'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import useMqtt from '@/lib/useMqtt';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { TreeView as TreeViewIcon, Copy } from '@carbon/icons-react';
import { fetchMqttTopics } from '@/actions/actions';
import Header from './header';
import { Button } from '../ui/button';
import Treeview from './treeview';
import PayloadTable from './payloadTable';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function Board() {
  //   const searchParams = useSearchParams();
  const [allTopics, setAllTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('testtopic/1');
  const [topicMessages, setTopicMessages] = useState({});
  const [addTopic, setAddTopic] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [treeNodes, setTreeNodes] = useState([]);

  const mqttClientRef = useRef(null);

  const setMqttClient = useCallback((client) => {
    console.log('connected');
    mqttClientRef.current = client;
    console.log(client, client.connected);
  }, []);
  useMqtt({
    // uri: 'ws://supcononenorth.fortiddns.com:8083/mqtt',
    uri: 'ws://52.77.217.53:30885/mqtt',
    options: {
      clientId: 'client1',
    },
    onConnectedHandler: setMqttClient,
  });

  useEffect(() => {
    // if (typeof window !== 'undefined' && localStorage.getItem('topics')) {
    //   const trackedTopics = localStorage.getItem('topics');
    //   setAllTopics(JSON.parse(trackedTopics));
    //   const nodes = convertTopicsToTreeNodes(JSON.parse(trackedTopics));
    //   setTreeNodes(nodes);
    //   setSelectedTopic(JSON.parse(trackedTopics)[0]);
    // } else {
    fetchMqttTopics().then((res) => {
      const topics = res.data.map((item) => item.topic);
      setAllTopics(topics);
      localStorage.setItem('topics', JSON.stringify(topics));
      const nodes = convertTopicsToTreeNodes(topics);
      setTreeNodes(nodes);
      setSelectedTopic(topics[0]);
    });
    // }
  }, []);

  useEffect(() => {
    const nodes = convertTopicsToTreeNodes(allTopics);
    setTreeNodes(nodes);
  }, [allTopics]);
  useEffect(() => {
    if (mqttClientRef.current && mqttClientRef.current.connected) {
      if (selectedTopic) {
        mqttClientRef.current.unsubscribe(selectedTopic);
      }

      mqttClientRef.current.subscribe(selectedTopic, (err) => {
        if (!err) {
          console.log(`Subscribed to ${selectedTopic}`);
        }
      });

      mqttClientRef.current.on('message', (topic, message) => {
        if (topic === selectedTopic) {
          const payload = JSON.parse(message.toString());
          console.log('topic', selectedTopic, 'payload', payload);
          const kvSingle = [];
          const kvArray = [];

          let statusEntry = null;
          for (const [key, value] of Object.entries(payload)) {
            console.log(key, value, typeof value);
            if (typeof value !== 'object' && !Array.isArray(value)) {
              kvSingle.push({ key, value });
            } else if (Array.isArray(value)) {
              kvArray.push({ key, value });
            }
          }
          setTopicMessages((prev) => ({
            ...prev,
            [topic]: kvSingle,
          }));
        }
      });
    }

    return () => {
      if (mqttClientRef.current && mqttClientRef.current.connected) {
        mqttClientRef.current.unsubscribe(selectedTopic);
      }
    };
  }, [selectedTopic]);

  function convertTopicsToTreeNodes(topics) {
    const root = { children: {} };
    let id = 0;

    topics.forEach((topic) => {
      const parts = topic.split('/');
      let current = root;
      parts.forEach((part) => {
        if (!current.children[part]) {
          current.children[part] = { children: {} };
        }
        current = current.children[part];
      });
    });
    console.log(root);
    function generateNodes(obj, path = '') {
      const nodes = [];
      for (const [key, value] of Object.entries(obj.children)) {
        id++;
        const newPath = path ? `${path}/${key}` : key;
        const node = {
          id: id.toString(),
          value: newPath,
          label: key,
          isLeaf: Object.keys(value.children).length === 0,
        };

        if (Object.keys(value.children).length > 0) {
          node.children = generateNodes(value, newPath);
        }

        nodes.push(node);
      }
      return nodes;
    }

    return generateNodes(root);
  }

  const handleNodeSelect = (value) => {
    setSelectedTopic(value);
    console.log(value);
  };
  console.log('selectedTopic', selectedTopic);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(selectedTopic);
      console.log('Topic copied to clipboard');
      // Optionally, you can show a success message to the user
      // For example, using a toast notification
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally, you can show an error message to the user
    }
  };
  return (
    <>
      <Header></Header>
      <div className="absolute right-0 left-[16rem] min-h-[90vh] flex  gap-x-1 ">
        <div className="w-[50%] h-[calc(100vh-4rem)] bg-white">
          <div className="w-full h-auto p-[1.3rem] pl-[1.5rem] shadow flex justify-between">
            <div className="flex gap-2 items-center">
              <TreeViewIcon />
              <Heading> Tree View</Heading>
            </div>
            <div className="flex gap-2 items-center">
              <Button
                className="bg-[#A7E102] h-[30px] w-[100px] rounded-[3px] hover:bg-[#8bbc02]"
                onClick={() => setShowDialog(true)}
              >
                Add
              </Button>
              <Button className="bg-[#393939] h-[30px] w-[100px] rounded-[3px] text-white hover:bg-[#585c62]">
                Select
              </Button>
            </div>
          </div>
          <div className="w-full h-full  shadow">
            <Treeview
              nodes={treeNodes}
              handleNodeSelect={handleNodeSelect}
            ></Treeview>
          </div>
        </div>
        <div className="w-[50%] h-[calc(100vh-4rem)] bg-white">
          <div className="w-full h-auto p-[0.8em] pl-[1.5rem] shadow flex justify-between">
            <div className="space-y-2">
              <Breadcrumb>
                {selectedTopic?.split('/').map((item, index) => (
                  <BreadcrumbItem key={index}>{item}</BreadcrumbItem>
                ))}
              </Breadcrumb>
              <div className="flex gap-2 items-center">
                <Heading> Topic </Heading>
                <Copy onClick={copyToClipboard} style={{ cursor: 'pointer' }} />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button
                className="bg-[#393939] h-[30px] w-[100px] rounded-[3px] text-white hover:bg-[#585c62]"
                onClick={() => {
                  const newTopics = allTopics.filter(
                    (topic) => topic !== selectedTopic
                  );
                  setAllTopics(newTopics);
                  localStorage.setItem('topics', JSON.stringify(newTopics));
                  setSelectedTopic(newTopics[0]);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
          <div className="w-full h-full  shadow p-[0.8rem] pl-[1.5rem] pt-8">
            {selectedTopic && topicMessages[selectedTopic] ? (
              <PayloadTable content={topicMessages[selectedTopic]} />
            ) : (
              <p>No messages for this topic yet.</p>
            )}
          </div>
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#F4F4F4]">
          <DialogHeader>
            <Heading className="text-[20px] leading-[28px]">Topic Name</Heading>
          </DialogHeader>
          <Input
            className="bg-white border-0 border-b rounded-[3px]"
            placeholder="Enter topic name"
            value={addTopic}
            onChange={(e) => setAddTopic(e.target.value)}
          />
          <Button
            className="w-full bg-[#C7F564] rounded-[3px] font-semibold hover:bg-[#8bbc02]"
            onClick={() => {
              setAllTopics([...allTopics, addTopic]);
              localStorage.setItem(
                'topics',
                JSON.stringify([...allTopics, addTopic])
              );
              setShowDialog(false);
            }}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
