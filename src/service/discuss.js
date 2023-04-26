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

export async function getEachDiscuss(discussID) {
    await axios({
        method: 'get',
        url: `${baseUrl}/discuss`,  
        params: {
          "DiscussID" : discussID,
          "getType" : "EachDiscuss"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getDiscussInTrend() {
    await axios({
        method: 'get',
        url: `${baseUrl}/discuss`,  
        params: {
          "getType" : "InTrend"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getDiscussNewest() {
    await axios({
        method: 'get',
        url: `${baseUrl}/discuss`,  
        params: {
          "getType" : "Newest"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getDiscussMostVote() {
    await axios({
        method: 'get',
        url: `${baseUrl}/discuss`,  
        params: {
          "getType" : "MostVote"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getComment(discussID) {
    await axios({
        method: 'get',
        url: `${baseUrl}/discuss`,  
        params: {
          "DiscussID" : discussID,
          "getType" : "Comment"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function addComment(discussID,comment) {
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
      url : `${baseUrl}/discuss`,
      headers: { 
        'Content-Type': 'text/plain'
      },
      data: {
            "Type"            : "Comment",
            "DiscussID"       : discussID,
            "UserEmail"       : userEmail,
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