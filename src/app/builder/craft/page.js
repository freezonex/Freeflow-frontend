'use client';

import { CopilotKit } from '@copilotkit/react-core';
import Board from '@/components/craft/main';

export default function Home() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/openai">
      <Board />
    </CopilotKit>
  );
}
