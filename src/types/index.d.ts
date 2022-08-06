export {};

declare global {
  interface Window {
    cookieStore: any; // 👈️ turn off type checking
  }
}