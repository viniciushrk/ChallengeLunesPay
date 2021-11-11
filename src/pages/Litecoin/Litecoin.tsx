import style from "./Litecoin.module.scss"
import litecoinIcon from "./litecoins.png";
import Dashboard from "../../components/Dashboard/Dashboard";
import DataTable from "../../components/Datatable/Datatable";
import { Link } from "react-router-dom";
// Lcyv6gzJ124TEbinWrp8AfQ5A4yv3u5tiL

function Litecoin(){
    
    return (
        <div className={style.App}>
            <div className={style.contentOption}>
                <div className={style.itens}>
                    <Link to="/" className={style.unable} >Bitcoin</Link>
                    <Link to="/litecoin" className={style.enable} >Litecoin</Link>
                </div>
            </div>
            <Dashboard icon={litecoinIcon} coin={"LTC"} sites="http://litecoin.org/"  />
            <DataTable coin={"LTC"} />
        </div>
    );
}

export default Litecoin;