import React, { useState } from "react";
import api from "../../config/Api";
import style from "./Datatable.module.scss";
import { Wallet } from "../../Interfaces/Coin";
import ConvertTimestampToDate from "../../services/ConvertTimestampToDate";
import { MDBDataTableV5 } from "mdbreact";


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

interface DataProp {
    
    coin:string,
}

function DataTable(data: DataProp){
 
 const [wallet,setWallet] = useState<Wallet[]>([]);
 const [inputValue, setInputValue] = useState('');

 function handleSearchData(event: any){
    event.preventDefault()
    
    api.get(`/get_tx_received/${data.coin}/${inputValue}`)
        .then((data: any)=>{
            if(data.data.status === "success"){
                let valor = data.data.data.txs;
                
                valor.map((x:Wallet) => {
                   x.time =  ConvertTimestampToDate(x.time)
                })

                setWallet(valor)      
            }
        })
}

 return(
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
 )
}

export default DataTable;