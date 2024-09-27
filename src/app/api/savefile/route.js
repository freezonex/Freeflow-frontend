import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import { httpToBackend } from '@/utils/http';

export async function POST(request) {
  try {
    const { fileName, htmlContent } = await request.json();

    // 确保文件名以 .html 结尾
    const effectiveFileName = fileName.endsWith('.html')
      ? fileName
      : `${fileName}.html`;

    // 保存文件到临时目录
    const tempDir = path.join(process.cwd(), 'temp');
    await fs.mkdir(tempDir, { recursive: true });
    const filePath = path.join(tempDir, effectiveFileName);
    await fs.writeFile(filePath, htmlContent);

    return NextResponse.json({ success: true, result: filePath });
  } catch (error) {
    console.error('File save error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
