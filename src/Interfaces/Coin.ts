export interface Coin {
    price:string,
    price_base:string,
    exchange:string,
    time:number  
}

export interface Wallet  {
    "txid": string,
    "output_no": number,
    "script_asm": string,
    "script_hex": string,
    "value": string,
    "confirmations": number,
    "time": number | string 
}