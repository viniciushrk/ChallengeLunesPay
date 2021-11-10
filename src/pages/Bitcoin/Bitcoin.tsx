import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import api from "../../config/Api";
import style from "./Bitcoin.module.scss"
import bitcoinIcon from "./bitcoin.png";
import { MDBDataTableV5 } from 'mdbreact';
import ConvertTimestampToDate from "../../services/ConvertTimestampToDate";
// 17JzE6xsyu4kZbLosvAKUXHdbU9arAp8Uf

const columns = [
    {
      label: 'Confirmações',
      field: 'confirmations',
      width: 150,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },
    {
      label: 'Data',
      field: 'time',
      width: 270,
    },
    {
        label: 'Valor',
        field: 'value',
        width: 270,
    }
]
  
interface bitcoin {
    price:string,
    price_base:string,
    exchange:string,
    time:number  
}

interface wallet  {
    
        "txid": string,
        "output_no": number,
        "script_asm": string,
        "script_hex": string,
        "value": string,
        "confirmations": number,
        "time": number | string
    
}

function Bitcoin(){
    const [bitcoin,setBitcoin] = useState<bitcoin | null>(null);
    const [wallet,setWallet] = useState<wallet[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect( () => {
        api.get('/get_price/BTC/USD')
            .then((data: any)=>{
               if(data.data.status === "success"){
                 const valor = data.data.data.prices.filter((x:any)=>{ return x.exchange === "bitfinex"});
                 setBitcoin(valor[0])
               }
            })

    },[])
    
    function handleSearchData(event: any){
        event.preventDefault()
        
        api.get(`/get_tx_received/BTC/${inputValue}`)
            .then((data: any)=>{
                if(data.data.status === "success"){
                    let valor = data.data.data.txs;
                    
                    valor.map((x:wallet) => {
                       x.time =  ConvertTimestampToDate(x.time)
                    })

                    setWallet(valor)
                    
                }
            })
         console.log("walletState",wallet)
    }

    return (
        <div className={style.App}>
            <div className={style.containerBitCoin}>
                <div>
                    <img src={bitcoinIcon} alt="logo" className={style.logo} />
                </div>
                <div className={style.card}>
                    <div className={style.cardHeader}>  
                        <p>Bitcoin  - {bitcoin?.time} </p>
                        <p>Preço: {bitcoin?.price} $ {bitcoin?.price_base} </p>
                        <p>Exchange: {bitcoin?.exchange}  </p>
                    </div>
                    <div>
                        <iframe title="site" src="http://bitcoin.org/" frameBorder="0" style={{width: '100%', height: '450px'}}></iframe>
                    </div>
                </div>
            </div>

            <div className={style.containerDatatable}>
               
                <form onSubmit={handleSearchData} className={style.adressCoin}>
                    <input type="text" placeholder="Digite endereço da moeda" onChange={(e) => setInputValue(e.target.value)} />
                    <button>Pesquisar</button>
                </form>
                    
                
                <div className={style.bodyDataTable}>
                {
                    wallet !== undefined && wallet ?
                        <MDBDataTableV5  
                            hover
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={{columns:columns , rows: wallet}}
                            fullPagination 
                            responsive={true}
                        />
                    : null}
                </div>
                
            </div>

        </div>
    );
}

export default Bitcoin;