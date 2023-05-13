import axios from 'axios';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response
let accessToken


export async function getLeaderboard() {
    await axios(
        {
            method:'get',
            url: `${baseUrl}/leaderboard`
        }
    ).then((res) => 
        {
            response = res
        }
    ).catch((err) => 
        {
            response = err
        }
    )
    return response.data
}