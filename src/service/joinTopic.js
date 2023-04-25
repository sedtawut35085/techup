import axios from 'axios';
import { getCurrentUserId } from '.';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response
let userEmail

export async function getJoin () {
    // accessToken = await getAccessToken()
    userEmail = await getCurrentUserId()
    await axios({
        method: 'get',
        url: `${baseUrl}/join`,  
        params: {
          "UserEmail" : userEmail
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

export async function addJoinTopic (topicID) {
    userEmail = await getCurrentUserId()
    await axios({
        method: 'post',
        url: `${baseUrl}/join`,
        headers: { 
            'Content-Type': 'text/plain'
        },
        data: {
            "UserEmail" : userEmail,
            "TopicID"     : topicID
        }
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response
}

export async function deleteJoinedTopic(topicID) {
    userEmail = await getCurrentUserId()
    await axios({
        method: 'delete',
        url: `${baseUrl}/join`,
        headers: { 
            'Content-Type': 'text/plain'
        },
        params:{
            "UserEmail" : userEmail,
            "TopicID"     : topicID
        }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}