import style from "./Bitcoin.module.scss"
import bitcoinIcon from "./bitcoin.png";
import Dashboard from "../../components/Dashboard/Dashboard";
import DataTable from "../../components/Datatable/Datatable";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// 17JzE6xsyu4kZbLosvAKUXHdbU9arAp8Uf

function Bitcoin(){
    return (
        <div className={style.App}>
            <div className={style.contentOption}>
                <div className={style.itens}>
                    <Link to="/" className={style.enable} >Bitcoin</Link>
                    <Link to="/litecoin" className={style.unable} >Litecoin</Link>
                </div>
            </div>
            <Dashboard icon={bitcoinIcon} coin={"BTC"} sites="https://bitcoin.org/"  />
            <DataTable coin={"BTC"} />
        </div>
    );
}

export default Bitcoin;