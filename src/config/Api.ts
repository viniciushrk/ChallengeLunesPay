import axios from 'axios';


const api= axios.create({
    baseURL: "https://chain.so/api/v2",
    // headers: {"Access-Control-Allow-Origin": "*"}
})

export default api;