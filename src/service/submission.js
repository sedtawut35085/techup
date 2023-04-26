import axios from 'axios';
import { getCurrentUserId } from '.';
const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev';
let response

export async function getAllSubmission(QuestionID,pageStart,pageSize){
    await axios({
        method: 'get',
        url: `${baseUrl}/submission`,
        params: {
            "QuestionID" : QuestionID,
            "getType": "getAllSubmission",
            "pageStart": pageStart,
            "pageSize": pageSize
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getEachSubmissionFromUserIDandQuestionID(QuestionID){
  let UserID = await getCurrentUserId()
  await axios({
      method: 'get',
      url: `${baseUrl}/submission`,
      params: {
          "QuestionID" : QuestionID,
          "getType": "getEachSubmissionFromUserIDandQuestionID",
          "UserEmail": UserID
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function getAllSubmissionFromProfessorID(pageStart,pageSize){
  let PrefessorID = await getCurrentUserId()
  await axios({
      method: 'get',
      url: `${baseUrl}/submission`,
      params: {
          "ProfessorID" : PrefessorID,
          "getType": "getAllSubmissionFromProfessorID",
          "pageStart": pageStart,
          "pageSize": pageSize
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function getEachSubmission(SubmissionID){
    await axios({
        method: 'get',
        url: `${baseUrl}/submission`,
        params: {
            "SubmissionID" : SubmissionID,
            "getType": "getEachSubmission"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getCount(QuestionID){
  await axios({
      method: 'get',
      url: `${baseUrl}/submission`,
      params: {
          "QuestionID" : QuestionID,
          "getType": "getCount"
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function updateSubmission(SubmissionID, bodydata){
  await axios({
      method: 'patch',
      url: `${baseUrl}/submission`,
      params: {
        "SubmissionID" : SubmissionID
      },
      data: bodydata
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function saveSubmission(bodydata){
  console.log('check', bodydata)
  await axios({
      method: 'post',
      url: `${baseUrl}/submission`,
      data: bodydata
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}