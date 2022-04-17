declare global {
  interface Window {
    ethereum: any
    solana: any
    connector: any
    WeixinJSBridge: any
    // https://www.npmjs.com/package/typer-js
    typer: any
  }
}

export {}
