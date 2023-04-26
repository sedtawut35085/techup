import axios from 'axios';
import { getCurrentUserId } from './index'
const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'
let response



export async function getAccountAdmin (email) {
    await axios({
        method: 'get',
        url: `${baseUrl}/admin`,  
        params: {
          "UserEmail" : email,
          "getType" : "getAccountInFo"
        },
        headers: { 
          // 'Authorization': accessToken, 
          'Content-Type': 'text/plain'
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}
