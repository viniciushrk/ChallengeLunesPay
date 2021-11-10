import api from "../../config/Api";
import style from "./Bitcoin.module.scss"
import bitcoin from "./bitcoin.png";

function Bitcoin(){
    return (
        <div className={style.App}>
            <div className={style.containerBitCoin}>
                <div>
                    <img src={bitcoin} className={style.logo} />
                </div>
                <div className={style.card}>
                    <div className={style.cardHeader}>
                        <p>Bitcoin  - 10/11/2021 </p>
                        <p>Preço: 1231233$ USD </p>
                        <p>Exchange: bitfinex  </p>
                    </div>
                    <div>
                        <iframe src="http://bitcoin.org/" frameBorder="0" style={{width: '100%', height: '450px'}}></iframe>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bitcoin;