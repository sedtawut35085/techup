import axios from 'axios';
import { getCurrentUserId } from '.';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response
let userEmail

export async function getChallenge (questionID) {
    // accessToken = await getAccessToken()
    userEmail = await getCurrentUserId()
    await axios({
        method: 'get',
        url: `${baseUrl}/challenge`,  
        params: {
          "UserEmail" : userEmail,
          "QuestionID" : questionID,
          "getType" : "getChallengeUser"
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

export async function getChallengeList () {
    // accessToken = await getAccessToken()
    userEmail = await getCurrentUserId()
    await axios({
        method: 'get',
        url: `${baseUrl}/challenge`,  
        params: {
          "UserEmail" : userEmail,
          "getType" : "getChallengeList"
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

export async function addChallengeUser (questionID) {
    userEmail = await getCurrentUserId()
    await axios({
        method: 'post',
        url: `${baseUrl}/challenge`,
        headers: { 
            'Content-Type': 'text/plain'
        },
        data: {
            "UserEmail" : userEmail,
            "QuestionID"     : questionID
        }
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response
}

export async function deleteChallengedUser(questionID) {
    userEmail = await getCurrentUserId()
    await axios({
        method: 'delete',
        url: `${baseUrl}/challenge`,
        headers: { 
            'Content-Type': 'text/plain'
        },
        params:{
            "UserEmail" : userEmail,
            "QuestionID"     : questionID
        }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}

export async function addAmountChalleger(questionID) {
  await axios({
    method:'patch',
    url:`${baseUrl}/challenge`,
    params:{
      "Type" : "add",
      "QuestionID" : questionID
    }
  }).then((res) => {
    response = res
  }).catch((err) => {
    response = err
  })
  return response
}

export async function subAmountChalleger(questionID) {
  await axios({
    method:'patch',
    url:`${baseUrl}/challenge`,
    params:{
      "Type" : "sub",
      "QuestionID" : questionID
    }
  }).then((res) => {
    response = res
  }).catch((err) => {
    response = err
  })
  return response
}