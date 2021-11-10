import React, {useEffect, useState} from 'react';
import style from './Home.module.scss';

import api from "../../config/Api";
import fifaLogo from "../../public/fifa_white.svg";
import Arrow from "../../public/Arrow.png";
import { useHistory } from 'react-router-dom';
import FilterService from '../../services/FilterService';
import OptionFilterService from '../../services/OptionFilterService';


interface IPlayer {
  item:[{ 
    sofifa_id:string;
    short_name:string;
    club_name:string;
    img:string;
    league_name:string;
    overall:number;
    team_position:string;
  }],
  nextPage:number;
  prevPage:number;
}

interface IdataItem{
  item:string
}

interface Idata{
  [key: string]:IdataItem;
}

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [inputExclusivo, setInputExclusivo] = useState('');
  const [players, setPlayers] = useState<IPlayer | null>(null);
  const [filter, setFilter] = useState(0);
  const [dataOption, setDataOption] = useState<Idata[]>([]);
  const history = useHistory();
  const [inputError,setInputError] = useState<string | null>(null);

  useEffect(()=>{
    api.get("/list").then(response => {
      setPlayers(response.data)
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  },[])

  async function navigateToPage(page: number) {

    try {     
      const players = await FilterService(filter,inputValue,inputExclusivo, page);
      setPlayers(players);

    } catch (err) {
      setInputError('Ops! houve algum erro.');
    }
  }

  async function  handleAddRepository(event: any){
    event.preventDefault();
    
    if(filter !== 9){
      if (!inputValue && filter < 12) {
        setInputError('Digite um valor válido.');
        return;
      }
    }
    try {

      const players = await FilterService(filter,inputValue,inputExclusivo, 2);
      setPlayers(players);
      setInputError(null);
    } catch (err) {
      setInputError('Ops! houve algum erro.');
    }
  }

  async function handleSearchSelect(e:React.ChangeEvent<HTMLSelectElement>){
      const option = parseInt(e.target.value);
      
      setFilter(option);

      const data= await OptionFilterService(option);
      setDataOption(data);
  }

  return (
    <div className={style.App}>
      <div className={style.content_image}>
       <img src={fifaLogo} alt="" />
      </div> 

      
      <form onSubmit={handleAddRepository} className={style.container_search} >
        
        <div className={style.container_filter}>
            <select name="filter" id="filter" value={filter} onChange={(e) => {handleSearchSelect(e)}}>
              <option value="0">Select filter</option>
              <option value="1">List players by team</option>
              <option value="2">List players by league</option>
              <option value="3">List players by nationality</option>
              <option value="4">List players by position</option>
              <option value="5">List top-K players</option>
              <option value="6">List top-K players by position</option>
              <option value="7">List top-K players by nationality</option>
              <option value="8">List top-K players by league</option>
              <option value="9">List the best team</option>
              <option value="10">List the best team by league</option>
              <option value="11">List the best team by nationality</option>
            </select>
          </div> 
        <div className={style.content_search}>
          {
            filter === 0 || (filter >= 5 && filter !== 10 && filter !== 11)    ? 
              <input 
                type="text" 
                placeholder="Digite um valor" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            :   

              <select name="filter" id="filter" className={style.selectFilter} value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}>
                {dataOption.map((x)=>{return <option key={x.item.toString()} value={x.item.toString()} >{x.item}</option>})}
              </select>
          }
          
          {
            filter >= 6 && filter !== 10 && filter !== 11   ?
              <select name="filter" id="filter" className={style.selectFilter} value={inputExclusivo} onChange={(e) => {setInputExclusivo(e.target.value)}}>
                {dataOption.map((x)=>{return <option key={x.item.toString()} value={x.item.toString()} >{x.item}</option>})}
              </select>
            : null
          }

          <button >Pesquisar</button>
        </div>

        {
          players === null || inputError !== null ?
            <div>
              <p className={style.text_red} >{ players === null ? "Nenhum dado encontrado."  : inputError}</p>
            </div>  
          : 
          null
        }
        
          
      </form>

     

      <div className={style.container}>
        {
          players?.item.map(player => {
            
            return( 
              player != null ?   
              <div key={player.sofifa_id} onClick={() => history.push(`/details/${player.sofifa_id}`)} className={style.item}>
                <div className={style.item_details}>
                  <img src={player?.img+"?format=png" ?? null} className={style.perfil} alt="foto"/>
                  <div className={style.item_text}>
                    <p><strong>{player.short_name} - Overall: {player.overall}  - Position: {player.team_position}</strong></p>
                    <p>Club: {player.club_name} - League: {player.league_name}</p>
                  </div>
                </div>
                <div>
                  <img src={Arrow} alt="foto" />
                </div>
              </div>
              :null
            )
           }) 
        }
      </div>

      {
        filter < 6 ?
          <div className={style.paginate}>
            <button onClick={()=>{navigateToPage(players?.prevPage ?? 1)}} >{"<"}</button>
            <button onClick={()=>{navigateToPage(players?.nextPage ?? 1)}} >{">"}</button>
          </div>
        :
          null
      }
    </div>
  );
}

export default Home;
