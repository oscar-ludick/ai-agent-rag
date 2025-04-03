export type ScannerPrompt = (prompt: string, onStdout: (content: string) => void) => Promise<void>;
