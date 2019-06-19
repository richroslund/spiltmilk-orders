export {};
declare module '*';
declare global {
    interface Window {
      spiltmilkorders?: {
        query?: string
        submitButtonQuery?: string;
      };
    }
  }