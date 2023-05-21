import axios from 'axios';
import { getCurrentUserId } from '.';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response
let userEmail

export async function getUserHintStatus(questionID) {
    userEmail = await getCurrentUserId()
    await axios({
      method:'get',
      url:`${baseUrl}/hint`,
      params:{
        "getType" : "getStatus",
        "UserEmail" : userEmail,
        "QuestionID" : questionID
      }
    }).then((res) => {
      response = res
    }).catch((err) => {
      response = err
    })
    return response.data
}

export async function addVote(questionID,vote) {
    userEmail = await getCurrentUserId()
    await axios({
        method:'post',
        url:`${baseUrl}/hint`,
        params:{
            "QuestionID" : questionID,
            "UserEmail" : userEmail,
            "Vote" : vote
        }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}

export async function changeVote(questionID,vote) {
    userEmail = await getCurrentUserId()
    await axios({
        method:'patch',
        url:`${baseUrl}/hint`,
        params:{
            "Type" : "changeVote",
            "QuestionID" : questionID,
            "UserEmail" : userEmail,
            "Vote" : vote
        }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}
  
export async function addAmountShow(questionID) {
    await axios({
        method:'patch',
        url:`${baseUrl}/hint`,
        params:{
        "Type" : "addShow",
        "QuestionID" : questionID
        }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}

export async function subAmountShow(questionID) {
    await axios({
        method:'patch',
        url:`${baseUrl}/hint`,
        params:{
        "Type" : "subShow",
        "QuestionID" : questionID
        }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}

export async function addAmountNotShow(questionID) {
    await axios({
        method:'patch',
        url:`${baseUrl}/hint`,
        params:{
        "Type" : "addNotShow",
        "QuestionID" : questionID
        }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}

export async function subAmountNotShow(questionID) {
    await axios({
        method:'patch',
        url:`${baseUrl}/hint`,
        params:{
        "Type" : "subNotShow",
        "QuestionID" : questionID
        }
    }).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}