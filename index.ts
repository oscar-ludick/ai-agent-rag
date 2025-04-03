import { App } from './app/app';

import { Scanner, ScannerService } from './libraries/scanner';

async function main() {
  const app = new App();
  await app.createKnowledgeBase();
  await app.updateKnowledgeBase();
  console.log('Knowledge base was updated correctly.');
  Scanner.builder(ScannerService)
    .setInputProcess(process.stdin)
    .setOutputProcess(process.stdout)
    .setPromptMessage('Press any key to start.')
    .setPromptAction(async (prompt: string, onStdout: (content: string) => void): Promise<void> => {
      await app.startChatAgent(prompt, onStdout);
    })
    .start();
}
main().then();
