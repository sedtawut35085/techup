import axios from 'axios';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response

export async function getWeeklyQuestion(){
    await axios({
        method:"get",
        url:`${baseUrl}/weekly-question`,
        params: {
            "getType" : "getWeeklyQuestion"
          },
          headers: { 
            // 'Authorization': accessToken, 
            'Content-Type': 'text/plain'
          }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response.data
}

export async function getCountWeeklyQuestion(){
    await axios({
        method: 'get',
        url: `${baseUrl}/admin`,  
        params: {
          "getType" : "getCountWeeklyQuestion"
        },
        headers: { 
          // 'Authorization': accessToken, 
          'Content-Type': 'text/plain'
        }
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}
