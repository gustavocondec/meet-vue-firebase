declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    fb: {
      apiKey: string,
      authDomain: string,
      databaseURL: string,
      projectId: string,
      storageBucket: string,
      messagingSenderId: string,
      appId: string,
      measurementId: string
    }
  }
}
