export interface Logger {
  logError: (stack: any) => Promise<void>
}
