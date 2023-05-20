import axios from 'axios';
import { getAccessToken } from './index';
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

export async function getStudent (userEmail) {
  const accessToken = await getAccessToken()
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

export async function deleteStudent (StudentEmail) {
  const accessToken = await getAccessToken()
  await axios({
      method: 'delete',
      url: `${baseUrl}/student`,
      headers: { 
          'Authorization': accessToken, 
          'Content-Type': 'text/plain'
      },
      params: {
        "UserEmail" : StudentEmail
      }
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response
}

export async function getAdminCountUser () {
  await axios({
      method: 'get',
      url: `${baseUrl}/admin`,  
      params: {
        "getType" : "getCountStudent"
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

export async function getAdminStudent (pageStart,pageSize) {
  await axios({
      method: 'get',
      url: `${baseUrl}/admin`,  
      params: {
        "getType" : "getStudent",
        "pageStart": pageStart,
        "pageSize": pageSize
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

export async function getAdminCountWeekly () {
  await axios({
      method: 'get',
      url: `${baseUrl}/admin`,  
      params: {
        "getType" : "getCountWeeklyQuestion"
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

export async function getCountWeeklyQuestionFilterOngoing () {
  await axios({
      method: 'get',
      url: `${baseUrl}/admin`,  
      params: {
        "getType" : "getCountWeeklyQuestionFilterOngoing"
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

export async function getCountAllTopic () {
  await axios({
      method: 'get',
      url: `${baseUrl}/admin`,  
      params: {
        "getType" : "getCountAllTopic"
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

export async function getCountAllProfessor () {
  await axios({
      method: 'get',
      url: `${baseUrl}/admin`,  
      params: {
        "getType" : "getCountAllProfessor"
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

export async function getAdminWeekly (pageStart,pageSize) {
  await axios({
      method: 'get',
      url: `${baseUrl}/admin`,  
      params: {
        "getType" : "getWeeklyQuestion",
        "pageStart": pageStart,
        "pageSize": pageSize
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

export async function getAdminWeeklyfromquestionid (questionid) {
  await axios({
      method: 'get',
      url: `${baseUrl}/admin`,  
      params: {
        "getType" : "getWeeklyQuestionFormWeeklyid",
        "questionId": questionid
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

export async function updateAdminWeeklyStatus (questionid, bodydata) {
  await axios({
      method: 'patch',
      url: `${baseUrl}/admin`,  
      params: {
        "QuestionId": questionid
      },
      headers: { 
        // 'Authorization': accessToken, 
        'Content-Type': 'text/plain'
      },
      data: bodydata
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}
