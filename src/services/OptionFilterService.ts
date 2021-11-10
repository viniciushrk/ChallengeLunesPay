import { AxiosResponse } from 'axios';

import api from "../config/Api";

export default async function OptionFilterService(filter:number){
    let response:AxiosResponse<never>;
    console.log(filter)
    let data:never;
    switch(filter){
      case 1:
        response = await api.get(`/showTeam`);
        data = response.data;
        return data;

      case 4 || 6:
        response = await api.get(`/showPosition`);
        data= response.data;        
        return data;

      case 6:
        response = await api.get(`/showPosition`);
        data= response.data;        
        return data;

      case 3:
        response = await api.get(`/showNationality`);
        data = response.data;
        return data;

      case 7:
        response = await api.get(`/showNationality`);
        data = response.data;
        return data;
      
      case 11:
        response = await api.get(`/showNationality`);
        data = response.data;
        return data;
        
      case (8 || 10):
        response = await api.get(`/showLeague`);
        data = response.data;
        return data;

      default:{
        response = await api.get(`/showLeague`);

        data = response.data;
        return data;
      }
    }
}