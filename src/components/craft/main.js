'use client';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Header from '@/components/craft/header';
import Sidebar from '@/components/craft/sidebar';
import { Input } from '@/components/ui/input';
import { CopilotTask, useCopilotContext } from '@copilotkit/react-core';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CodeEditor from '@/components/craft/codemirror';
import LoadingSpinner from './loadingSpinner';
import { TextInput, TextArea, Heading } from '@carbon/react';

const defualtUI = [
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Button Example</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <button id="button1">Click Me</button>
</body>
</html>`,
];
export default function Board() {
  const [code, setCode] = useState(defualtUI);
  const [codeToDisplay, setCodeToDisplay] = useState(code[0] || '');
  const [showDialog, setShowDialog] = useState(false);
  const [codeCommand, setCodeCommand] = useState('');
  const [tuneCommand, setTuneCommand] = useState('');
  const [componentIds, setComponentIds] = useState([]);

  const [fileName, setFileName] = useState('');

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showTuneDialog, setShowTuneDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const prePrompt = String.raw`#prompt
请生成一个html包含下面所有的客户需求，注意一定要单一html文件完成需求，所有样式文件只能以cdn的方式引入，要完整完成需求。注意，先查询我表中所有的字段，再对字段进行分析。针对已有字段和新需求进行匹配，实现新需求的开发。
注意下列事项
1 严格遵守给你的schema，插入数据库时，严格遵守数据库字段。与数据库字段保持完全一致！不允许插入未知字段.对数据库修改时候不允许嵌套json，直接使用重复插入。
举例：一个formNo 对应多个 visitorName 时候，则直接插入多条，不允许使用嵌套JSON。不允许出现visitorName0的情况。直接重复调用，插入单条数据

禁止与数据库字段不一致，如下面这个例子:
[{"formNo":"123123","processNumber":"123123","requestName":"123","imiId":"123123","department":"1231","position":"23132123","visitDate":"2024-07-26","leaveTime":"2024-07-26","vehicleNo1":"12312","vehicleNo2":"3123","vehicleNo3":"123","purposeOfVisit":"23123","visitorName0":"123","visitorPosition0":"123123","visitorNationality0":"123","visitorPassport0":"123123","visitorContractorName0":"1231","visitorCode0":"23123","visitorEmail0":"1231231"}]

只允许与数据库字段完全一致，如下面这个例子：
[
    {
        "formNo": "123123",
        "processNumber": "123123",
        "requestName": "123",
        "imiId": "123123",
        "department": "1231",
        "position": "23132123",
        "visitDate": "2024-07-26",
        "leaveTime": "2024-07-26",
        "vehicleNo1": "12312",
        "vehicleNo2": "3123",
        "vehicleNo3": "123",
        "purposeOfVisit": "23123",
        "visitorName": "123",
        "visitorPosition": "123123",
        "visitorNationality": "123",
        "visitorPassport": "123123",
        "visitorContractorName": "1231",
        "visitorCode": "23123",
        "visitorEmail": "1231231"
    },{
        "formNo": "123123",
        "processNumber": "123123",
        "requestName": "123",
        "imiId": "123123",
        "department": "1231",
        "position": "23132123",
        "visitDate": "2024-07-26",
        "leaveTime": "2024-07-26",
        "vehicleNo1": "12312",
        "vehicleNo2": "3123",
        "vehicleNo3": "123",
        "purposeOfVisit": "23123",
        "visitorName": "123",
        "visitorPosition": "123123",
        "visitorNationality": "123",
        "visitorPassport": "123123",
        "visitorContractorName": "1231",
        "visitorCode": "23123",
        "visitorEmail": "1231231"
    }
]

2 严格遵守使用给你的数据库连接方式，尤其是apikey，可以将apikey提取作为变量，使用真实API，因为现在你再开发的就是一个真实项目。你现在生成的这个前端页面HTML是没有后端服务的，将会直接使用API插入数据库。所以注意字段类型一定要与给你的数据库schema完全匹配
3 注意你现在写的是一个完整的项目代码，请不要留出变量让用户二次修改。将代码写完整，不要省略代码！！！
4 创建类的API请求，只会返回201的http code不会返回任何response body
5 参考下面的数据库连接方式，进行对数据的持久化处理
6 尽可能参考最近比较火热的css样式，完善页面的美观度
7 直接返回完整的html，不需要返回任何其他的内容。任何多余的文字，包括注释都不允许存在
8 严格参考我写明的数据库链接方式，这是与数据库沟通的唯一手段，html前端页面将直接与数据库交互

#写明数据库连接方式
curl --location --request GET 'http://192.168.31.75:8000/rest/v1/{tableName}' \
--header 'apikey: {API Key}'

curl -X POST 'http://192.168.31.75:8000/rest/v1/{tableName}' \
-H "apikey: {API Key}" \
-H "Content-Type: application/json" \
-d '[{ "some_column": "someValue" }, { "other_column": "otherValue" }]'

curl --location --request DELETE 'http://192.168.31.75:8000/rest/v1/{tableName}?id=eq.1' \
--header 'apikey: {API Key}' \
`;
  useEffect(() => {
    if (code.length > 0) {
      setSelectedIndex(code.length - 1);
    }
  }, [code]);
  const generateCode = new CopilotTask({
    instructions: prePrompt + codeCommand,
    actions: [
      {
        name: 'generateCode',
        description:
          // 'generate a single page react app, only react code is allowed, and do not include the import and export lines',
          '生成一个完整的HTML页面代码，只能生成html! 做到页面美观， 生成的每一个element都有一个唯一的id',
        parameters: [
          {
            name: 'html_code',
            type: 'string',
            description: 'Code to be generated',
            required: true,
          },
        ],
        handler: async ({ html_code }) => {
          setIsLoading(true);
          try {
            setCode((prev) => [...prev, html_code]);
            setCodeToDisplay(html_code);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ],
  });
  const tuneComponents = new CopilotTask({
    instructions: `当前页面的代码为${codeToDisplay}.` + tuneCommand,
    actions: [
      {
        name: 'generateCode',
        description: `修改且仅修改id为${componentIds.join(
          ','
        )}的元素的样式。返回修改后的html代码, 不修改的区域保持不变。注意，返回值是修改后完整的html页面代码！`,
        parameters: [
          {
            name: 'html_code',
            type: 'string',
            description: 'Code to be generated',
            required: true,
          },
        ],
        handler: async ({ html_code }) => {
          setIsLoading(true);
          try {
            setCode((prev) => [...prev, html_code]);
            setCodeToDisplay(html_code);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ],
  });
  const context = useCopilotContext();
  const ConfirmDeploy = async () => {
    try {
      const effectiveFileName = fileName.endsWith('.html')
        ? fileName
        : `${fileName}.html`;
      // 构建带查询参数的URL
      const url = new URL('http://192.168.31.75:8080/api/saveHtml');
      url.searchParams.append('fileName', effectiveFileName); // 添加fileName作为查询参数
      console.log(
        typeof codeToDisplay,
        JSON.stringify({ htmlData: codeToDisplay }),
        { htmlData: codeToDisplay }
      );
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: codeToDisplay,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textResult = await response.text();
      console.log('Received text:', textResult);
    } catch (error) {
      console.error('Failed:', error);
    }
  };
  console.log(isLoading);
  return (
    <>
      <div>
        <Header openCode={() => setShowDialog(true)} />
        <div className="absolute right-0 left-[16rem] p-2 pl-4 pr-[2rem] min-h-[90vh] flex justify-between gap-x-1 bg-white  ">
          <Sidebar>
            <div className="space-y-2">
              <Heading className="text-[14px] font-semibold leading-[14px] text-left">
                Discription
              </Heading>
              <Textarea
                className="h-40 bg-[#F4F4F4] border-0 border-b rounded-[3px]"
                placeholder="Enter your code command"
                value={codeCommand}
                onChange={(e) => setCodeCommand(e.target.value)}
              />
              <Button
                className="w-full bg-[#C7F564] rounded-[3px] font-semibold hover:bg-[#8bbc02]"
                onClick={() => {
                  setIsLoading(true);
                  generateCode.run(context);
                }}
              >
                Generate
              </Button>
            </div>
            <div className="space-y-2">
              <Heading className="text-[14px] font-semibold leading-[14px] text-left mt-[2rem]">
                History
              </Heading>
              <div className="bg-[#F4F4F4] p-2 pb-4">
                <Table>
                  <TableBody>
                    {code.map((c, i) => (
                      <TableRow key={i}>
                        <TableCell
                          className="font-medium p-2 border-b border-solid "
                          onClick={() => {
                            setSelectedIndex(i);
                            setCodeToDisplay(c);
                          }}
                        >
                          v1.0.0-beta.{i}
                        </TableCell>
                      </TableRow>
                    ))}
                    {isLoading && (
                      <TableRow>
                        <TableCell className="font-medium p-2 border-b border-solid ">
                          <LoadingSpinner />
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            {/* <div className="space-y-2 p-4">
              {code.map((c, i) => (
                <div
                  key={i}
                  className={`w-full h-20 p-1 rounded-md border border-slate-600 items-center justify-center flex cursor-pointer ${
                    selectedIndex === i ? 'bg-slate-900 text-white' : 'bg-white'
                  }`}
                  onClick={() => {
                    setSelectedIndex(i);
                    setCodeToDisplay(c);
                  }}
                >
                  v{i}
                </div>
              ))}
              {isLoading && (
                <div
                  className={`w-full h-20 p-1 rounded-md border border-slate-600 items-center justify-center flex cursor-pointer bg-white`}
                >
                  <LoadingSpinner />
                </div>
              )}
            </div> */}
          </Sidebar>

          {/* <LocalContext.Provider value={onSubmit}>
            <div className="flex flex-col w-full gap-1 mt-auto">{code}</div>
          </LocalContext.Provider> */}

          <div className="w-[75%] p-4">
            <CodeEditor
              code={codeToDisplay}
              setCode={setCodeToDisplay}
              setComponentIds={setComponentIds}
              setShowTuneDialog={setShowTuneDialog}
            />
          </div>
        </div>
      </div>
      <Dialog
        open={showDialog}
        onOpenChange={setShowDialog}
        className="bg-[#F4F4F4]"
      >
        <DialogContent className="bg-[#F4F4F4]">
          <DialogHeader>
            <DialogTitle>Deploy Address</DialogTitle>
            <Input
              type="text"
              placeholder="Enter file name"
              className="w-full p-3 rounded-[3px] border-0 outline-0 bg-white shadow "
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <DialogTitle>View Code.</DialogTitle>
            <DialogDescription>
              You can use the following code to start integrating into your
              application.
            </DialogDescription>
            <textarea className="p-4 bg-black text-white rounded bg-primary my-2 h-64 overflow-y-auto overflow-x-hidden max-w-inherit">
              {codeToDisplay}
            </textarea>
          </DialogHeader>
          <Button
            className="w-full bg-[#C7F564] rounded-[3px] font-semibold hover:bg-[#8bbc02]"
            onClick={ConfirmDeploy}
          >
            Confirm Deploy
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={showTuneDialog} onOpenChange={setShowTuneDialog}>
        <DialogContent className="bg-[#F4F4F4]">
          <DialogHeader>
            <Heading className="text-[20px] leading-[28px]">
              Changing element: {componentIds}
            </Heading>
            <Heading className="text-[14px] leading-[16px]">
              Now you are changing element {componentIds} only.
            </Heading>
          </DialogHeader>
          <Textarea
            type="text"
            placeholder="Type your description here"
            className="h-40 bg-white border-0 border-b rounded-[3px]"
            value={tuneCommand}
            onChange={(e) => setTuneCommand(e.target.value)}
          />
          <Button
            className="w-full bg-[#C7F564] rounded-[3px] font-semibold hover:bg-[#8bbc02]"
            onClick={() => {
              setIsLoading(true);
              tuneComponents.run(context);
              setShowTuneDialog(false);
            }}
          >
            Start Tuning!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
