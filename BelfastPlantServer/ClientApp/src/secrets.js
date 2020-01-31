import axios from 'axios'
// Function to get the TREFLE api key. Needs to be done on server due to CORS security
const GetSecret = async function(){
    try{
        return (await axios.get("https://localhost:44312/api/Secret/GetSecret")).data;
    }
    catch(err){
        console.log("Couldn't get TREFLE secret - plant functionality will not work");
        console.log(err)
        return "";
    }
}

export const TREFLE_SECRET = GetSecret;