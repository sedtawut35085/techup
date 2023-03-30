import axios from 'axios';
import { getCurrentUserId } from '.';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response
let accessToken
let userEmail

export async function getDiscussQuestion(questionID) {
    await axios({
        method: 'get',
        url: `${baseUrl}/discuss-question`,  
        params: {
          "discussQuestionID" : questionID
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}