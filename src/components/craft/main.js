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
import { LoadingSpinner, CloseIcon } from './assets';
import { TextInput, TextArea, Heading } from '@carbon/react';
import { addApplication } from '@/actions/actions';

const defualtUI = [
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MES Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F4F4F4; /* 背景色 */
            margin: 0;
            padding: 0;
            color: #2C3E50; /* 文本色 */
        }
        .header {
            background-color: #C7F564; /* 主色 */
            color: #2C3E50;
            text-align: center;
            padding: 1rem;
        }
        .container {
            display: flex;
            justify-content: space-around;
            padding: 2rem;
        }
        .card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            width: 30%;
            text-align: center;
        }
        .card h2 {
            margin: 0 0 1rem 0;
        }
        .status {
            font-size: 1.5rem;
            color: #333;
        }
        .status.running {
            color: #27ae60; /* 运行状态颜色 */
        }
        .status.stopped {
            color: #e74c3c; /* 停止状态颜色 */
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>MES Dashboard</h1>
    </div>
    <div class="container">
        <div class="card">
            <h2>Production Line 1</h2>
            <p class="status running">Running</p>
            <p>Output: 120 units</p>
        </div>
        <div class="card">
            <h2>Production Line 2</h2>
            <p class="status stopped">Stopped</p>
            <p>Output: 80 units</p>
        </div>
        <div class="card">
            <h2>Production Line 3</h2>
            <p class="status running">Running</p>
            <p>Output: 150 units</p>
        </div>
    </div>
</body>
</html>`,
];
export default function Board() {
  const initialCode = () => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('code');
      return savedCode ? JSON.parse(savedCode) : [defualtUI];
    }
    return [defualtUI];
  };
  useEffect(() => {
    const savedCode = localStorage.getItem('code');
    if (savedCode) {
      setCode(JSON.parse(savedCode));
    }
  }, []);
  const [code, setCode] = useState(initialCode);
  const [codeToDisplay, setCodeToDisplay] = useState(
    code[code.length - 1] || ''
  );
  const [showDialog, setShowDialog] = useState(false);
  const [codeCommand, setCodeCommand] = useState({
    databaseName: '',
    databaseConnect: '',
    databaseStructure: '',
    prompt: '',
  });

  const [tuneCommand, setTuneCommand] = useState('');
  const [componentIds, setComponentIds] = useState([]);

  const [fileName, setFileName] = useState('');

  const [selectedIndex, setSelectedIndex] = useState(code?.length - 1);
  const [showTuneDialog, setShowTuneDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generatedPrompt = String.raw`#prompt
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
${codeCommand.databaseConnect}

#表结构如下
${codeCommand.databaseStructure}
#写明数据库表名
${codeCommand.databaseName}

如果没有写明数据库表名， 表结构，连接方式， 只需要考虑如下ui需求即可。

#写明需求
${codeCommand.prompt}

`;
  useEffect(() => {
    if (code.length > 0) {
      setSelectedIndex(code.length - 1);
      setCodeToDisplay(code[code.length - 1]);
    }
  }, [code]);
  useEffect(() => {
    localStorage.setItem('code', JSON.stringify(code));
  }, [code]);
  const generateCode = new CopilotTask({
    instructions: generatedPrompt,
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

  const confirmDeploy = async () => {
    try {
      // const saveResult = await SaveFile();
      // if (!saveResult) {
      //   throw new Error('save failed');
      // }
      const effectiveFileName = fileName.endsWith('.html')
        ? fileName
        : `${fileName}.html`;

      const file = new File([codeToDisplay], 'index.html');
      console.log('Created File object:', file);

      // 读取文件内容以验证
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File content:', e.target.result);
      };
      reader.readAsText(file);
      const deployResult = await addApplication(fileName, 'frontend', file);
      console.log('deploy result:', deployResult);
      setShowDialog(false);
      return deployResult;
    } catch (error) {
      console.error('deploy failed:', error);
    }
  };
  return (
    <>
      <div>
        <Header openCode={() => setShowDialog(true)} />
        <div className="absolute right-0 left-[16rem] p-2 pl-4 pr-[2rem] min-h-[90vh] flex justify-between gap-x-1 bg-white ">
          <Sidebar>
            <div className="space-y-3">
              <Heading className="text-[14px] font-semibold leading-[14px] text-left">
                Database Name
              </Heading>
              <Input
                className="bg-[#F4F4F4] border-0 border-b rounded-[3px]"
                placeholder="Enter database name"
                value={codeCommand.databaseName}
                onChange={(e) =>
                  setCodeCommand({
                    ...codeCommand,
                    databaseName: e.target.value,
                  })
                }
              />
              <Heading className="text-[14px] font-semibold leading-[14px] text-left">
                Database Connect
              </Heading>
              <Textarea
                className="h-30 bg-[#F4F4F4] border-0 border-b rounded-[3px]"
                placeholder="Enter your code command"
                value={codeCommand.databaseConnect}
                onChange={(e) =>
                  setCodeCommand({
                    ...codeCommand,
                    databaseConnect: e.target.value,
                  })
                }
              />
              <Heading className="text-[14px] font-semibold leading-[14px] text-left">
                Database Structure
              </Heading>
              <Textarea
                className="h-30 bg-[#F4F4F4] border-0 border-b rounded-[3px]"
                placeholder="Enter your code command"
                value={codeCommand.databaseStructure}
                onChange={(e) =>
                  setCodeCommand({
                    ...codeCommand,
                    databaseStructure: e.target.value,
                  })
                }
              />
              <Heading className="text-[14px] font-semibold leading-[14px] text-left">
                Prompt
              </Heading>
              <Textarea
                className="h-40 bg-[#F4F4F4] border-0 border-b rounded-[3px]"
                placeholder="Enter your code command"
                value={codeCommand.prompt}
                onChange={(e) =>
                  setCodeCommand({ ...codeCommand, prompt: e.target.value })
                }
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
                          className={`font-medium p-2 border-b border-solid cursor-pointer hover:bg-[#cdced0] ${
                            selectedIndex === i
                              ? 'bg-[#acaeb1] text-white fill-white'
                              : 'bg-inherit'
                          }`}
                          onClick={() => {
                            setSelectedIndex(i);
                            setCodeToDisplay(c);
                          }}
                        >
                          <div className="flex justify-between items-baseline">
                            <span>v1.0.0-beta.{i}</span>
                            <div
                              className="h-[15px] w-[15px] hover:bg-[#EDF9CC]"
                              onClick={() => {
                                setCode(code.filter((_, index) => index !== i));
                              }}
                            >
                              <CloseIcon />
                            </div>
                          </div>
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
            <DialogTitle>App Name</DialogTitle>
            <Input
              type="text"
              placeholder="Enter app name"
              className="w-full p-3 rounded-[3px] border-0 outline-0 bg-white shadow "
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <DialogTitle>View Code.</DialogTitle>
            <DialogDescription>
              You can use the following code to start integrating into your
              application.
            </DialogDescription>
            <Textarea
              className="p-4 rounded bg-black text-white my-2 h-64 overflow-y-auto overflow-x-hidden max-w-inherit"
              style={{ fontFamily: 'Fira Code, Consolas, monospace' }}
            >
              {codeToDisplay}
            </Textarea>
          </DialogHeader>
          <Button
            className="w-full bg-[#C7F564] rounded-[3px] font-semibold hover:bg-[#8bbc02]"
            onClick={confirmDeploy}
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
