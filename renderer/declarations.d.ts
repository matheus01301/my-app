declare module "*.png" {
    const value: any;
    export = value;
}

export { };

declare global {
    interface Window {
        ipcRenderer: {
            send: (channel: string, ...args: any[]) => void;
            on: (channel: string, func: (...args: any[]) => void) => void;
            removeListener: (channel: string, func: (...args: any[]) => void) => void;
        };
    }
}

declare global {
    interface Window {
        api: {
            send: (channel: string, data?: any) => void;
            on: (channel: string, func: (data: any) => void) => void;
        }
    }
}

export { };

declare global {
    interface Window {
        electronAPI: {
            send: (channel: string, data?: any) => void;
            on: (channel: string, func: (data: any) => void) => void;
            off: (channel: string) => void;
        }
    }
}
