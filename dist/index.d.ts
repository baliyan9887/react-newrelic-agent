interface LoggerOptions {
    isEnabled?: boolean;
    customErrorHandler?: (error: any) => void;
}
declare class NewRelicLogger {
    private options;
    constructor(options?: LoggerOptions);
    private log;
    logInfo(message: any, module: string, category?: string): void;
    logWarning(message: any, module: string, category?: string): void;
    logError(message: any, module: string, category?: string): void;
}

declare const init: (accountId: string, applicationId: string, licenseKey: string) => void;
declare const relicLogger: NewRelicLogger;
declare const runTest: () => void;

export { init, relicLogger, runTest };
