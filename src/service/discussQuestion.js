import axios from 'axios';
import { getCurrentUserId } from '.';
import { getStudentFromStudentEmail } from './student';
import { getProfessor } from './professor';
import Moment from 'moment'

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response
let accessToken
let userEmail
let user
let TechUpID ,  AuthorName , AuthorSurName , TypeUser

export async function getComment(questionID) {
    await axios({
        method: 'get',
        url: `${baseUrl}/discuss-question`,  
        params: {
          "getType" : "getComment",
          "QuestionID" : questionID
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getReply(questionID , parentID) {
  await axios({
      method: 'get',
      url: `${baseUrl}/discuss-question`,  
      params: {
        "getType" : "getReply",
        "QuestionID" : questionID,
        "ParentID" : parentID
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function getWeeklyComment() {
  await axios({
      method: 'get',
      url: `${baseUrl}/discuss-question`,  
      params: {
        "getType" : "getWeeklyDiscuss"
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function addComment(questionID,comment) {
  userEmail = await getCurrentUserId();
  const date = new Date()
  const currentDate = Moment(date.toLocaleString()).format("YYYY-MM-DD hh:mm:ss")
  if(userEmail.includes("@mail.kmutt.ac.th")){
    user = await getStudentFromStudentEmail(userEmail)
    TechUpID = user[0].TechUpID
    AuthorName = user[0].FirstName
    AuthorSurName = user[0].SurName
    TypeUser = "Student"
    
  } else {
    user = await getProfessor(userEmail)
    TechUpID = null
    AuthorName = user[0].Name
    AuthorSurName = user[0].SurName
    TypeUser = "Professor"
  }
  await axios({
    method: "post",
    url : `${baseUrl}/discuss-question`,
    headers: { 
      'Content-Type': 'text/plain'
    },
    data: {
        "UserEmail"       : userEmail,
        "QuestionID"      : questionID,
        "UserImage"       : user[0].ImageURL,
        "TechUpID"        : TechUpID,
        "AuthorName"      : AuthorName,
        "AuthorSurName"   : AuthorSurName,
        "TypeUser"        : TypeUser,
        "Comment"         : comment,
        "Date"            : date
    }
    }).then((res) => {
      response = res
    }).catch((err)=>{
      response = err
    })
  return response
}

