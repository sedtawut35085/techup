import Auth from '../configuration/configuration-aws'
import axios from 'axios';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'
let response
let accessToken
let userEmail
let convertedFile

async function getAccessToken () {  
    let response = await Auth.currentSession()
    .then(res => {
        return res.getAccessToken().getJwtToken()
    })
    .catch(err => {
        return err
    });
    return response
}

export async function getCurrentUserId () {  
    let response = await Auth.currentAuthenticatedUser()
    .then((res) => {
        return res.attributes.email
    })
    .catch((err) => {
        return err
    })
    return response
}

export async function getStudent () {
    accessToken = await getAccessToken()
    userEmail = await getCurrentUserId()
    await axios({
        method: 'get',
        url: `${baseUrl}/student`,  
        params: {
          "UserEmail" : userEmail
        },
        headers: { 
            'Authorization': accessToken, 
            'Content-Type': 'text/plain'
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function saveStudent (bodydata, imageFile) {
    accessToken = await getAccessToken()
    userEmail = await getCurrentUserId()
    await axios({
        method: 'post',
        url: `${baseUrl}/student`,
        headers: { 
            'Authorization': accessToken, 
            'Content-Type': 'text/plain'
        },
        data: bodydata
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response
}


