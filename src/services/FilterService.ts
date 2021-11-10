import { AxiosResponse } from 'axios';

import api from "../config/Api";

export default async function FilterService(filter:number,inputValue:string,inputExclusivo:string, page : number = 1){
    let response:AxiosResponse<never>;

    let players:never;
    switch(filter){
      case 0:
        response = await api.get(`/listByName?name=${inputValue}&page=${page}`);
        players= response.data;        
        return players;

      case 1:
        response = await api.get(`/listByTeam?team=${inputValue}&page=${page}`);
        players = response.data;
        return players;

      case 2:
        response = await api.get(`/listByLeague?league=${inputValue}&page=${page}`);

        players = response.data;
        return players;
        
      case 3:
        response = await api.get(`/listByNationality?nationality=${inputValue}&page=${page}`);

        players = response.data;
        return players;
        
      case 4:
        response = await api.get(`/listByPosition?position=${inputValue}&page=${page}`);

        players = response.data;
        console.log(response.data)
        return players;
        
      case 5:
        response = await api.get(`/listByTopPlayer?top=${inputValue}`);

        players = response.data;
        return players;
        
      case 6:
        response = await api.get(`/listByTopPlayerByPosition?top=${inputValue}&position=${inputExclusivo}`);

        players = response.data;
        return players;

      case 7:
        response = await api.get(`/listByTopPlayerByNationality?top=${inputValue}&nationality=${inputExclusivo}`);

        players = response.data;
        return players;

      case 8:
        response = await api.get(`/listByTopPlayerByLeague?top=${inputValue}&league=${inputExclusivo}`);

        players = response.data;
        return players;

      case 9:
        response = await api.get(`/listBestTeam`);
        console.log(response.data)
        players = response.data;
        return players;

      case 10:
        response = await api.get(`/listBestTeamByLeague?league=${inputValue}`);

        players = response.data;
        return players;
        
      case 11:
        response = await api.get(`/listBestTeamByNationality?nationality=${inputValue}`);
        players = response.data;
        return players;
      
      default:{
         response = await api.get(`/listByName?name=${inputValue}`);

        players = response.data;
        return players;
      }
    }
}