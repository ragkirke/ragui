import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8080'
});

axios.interceptors. response.use(response=>{
    //add logic here on the coming response
    console.log("after response !!!")
    return response;
 }, error=>{
    //add error specific logic
    return Promise.reject(error);
 });