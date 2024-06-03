// global.d.ts
interface Ethereum {
    enable: any;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    isMetaMask?: boolean;
    on?: (eventName: string, callback: (...args: any[]) => void) => void;
  }
  
  interface Window {
    ethereum?: Ethereum;
  }
  