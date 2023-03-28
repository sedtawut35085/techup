import Auth from '../configuration/configuration-aws'
import axios from 'axios';
import { getCurrentUserId } from '.';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'
let response
let useremail 

export async function getAllTopic () {
    //accessToken = await getAccessToken()
    useremail = await getCurrentUserId()
    await axios({
        method: 'get',
        url: `${baseUrl}/topic`,
        params: {
            "UserEmail" : useremail,
            "getType": "getAllTopic"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getList () {
    //accessToken = await getAccessToken()
    useremail = await getCurrentUserId()
    await axios({
        method: 'get',
        url: `${baseUrl}/topic`,
        params: {
            "UserEmail" : useremail,
            "getType": "getList"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}

export async function getEachTopic (TopicID) {
  //accessToken = await getAccessToken()
  useremail = await getCurrentUserId()
  await axios({
      method: 'get',
      url: `${baseUrl}/topic`,
      params: {
          "getType": "getEachTopic",
          "TopicID": TopicID
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function getTopicfromProfessor () {
  //accessToken = await getAccessToken()
  useremail = await getCurrentUserId()
  await axios({
      method: 'get',
      url: `${baseUrl}/topic`,
      params: {
          "UserEmail" : useremail,
          "getType": "getTopicFromProfessor"
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function getEachTopic(topicID) {
    await axios({
        method: 'get',
        url: `${baseUrl}/topic`,
        params: {
            "getType": "getEachTopic",
            "TopicID": topicID
        },
        }).then((res) => {
            response = res
            console.log(res);
        }).catch((err)=>{
            response = err
        })
    return response.data
}

export async function saveTopic (bodydata) {
  //accessToken = await getAccessToken()
  // useremail = await getCurrentUserId()
  await axios({
      method: 'post',
      url: `${baseUrl}/topic`,
      data: bodydata
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  console.log("topic : " + response.data)
  return response.data
}