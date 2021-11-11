import React, { useEffect, useState } from "react";
import api from "../../config/Api";
import style from "./Dashboard.module.scss";
import { Coin } from "../../Interfaces/Coin";
import ConvertTimestampToDate from "../../services/ConvertTimestampToDate";

interface DashProp {
    icon:any,
    coin?:string,
    sites:string
}
function Dashboard(data:DashProp){
 
 const [bitcoin,setBitcoin] = useState<Coin>({price:"0",price_base:"USD",exchange:"null","time":2212121});
 useEffect( () => {
     console.log(data.sites);
    api.get(`/get_price/${data.coin}/USD`)
        .then((data: any)=>{
        if(data.data.status === "success"){
            const valor = data.data.data.prices.filter((x:any)=>{ return x.exchange === "bitfinex"});
            setBitcoin(valor[0])
        }
        })

 },[data])

 return(
    <div className={style.containerBitCoin}>
        <div>
            <img src={data.icon} alt="logo" className={style.logo} />
        </div>
        <div className={style.card}>
            <div className={style.cardHeader}>  
                <p>Data  - {ConvertTimestampToDate(bitcoin.time)}</p> 
                <p>Preço: {bitcoin?.price} $ {bitcoin?.price_base} </p>
                <p>Exchange: {bitcoin?.exchange}  </p>
            </div>
            <div>
                <iframe title="site" src={data.sites} frameBorder="0" style={{width: '100%', height: '450px'}}></iframe>
            </div>
        </div>
    </div>
 )
}

export default Dashboard;