import axios from 'axios';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev';
let response

export async function getQuestionForEachTopic(topicID,pageStart,pageSize){
    await axios({
        method: 'get',
        url: `${baseUrl}/question`,
        params: {
            "TopicID" : topicID,
            "getType": "getQuestionForEachTopic",
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

export async function getQuestionForEachTopicWithFilter(topicID,pageStart,pageSize,filterName,filterValue){
  await axios({
      method: 'get',
      url: `${baseUrl}/question`,
      params: {
          "TopicID" : topicID,
          "getType": "getQuestionForEachTopicWithFilter",
          "pageStart": pageStart,
          "pageSize": pageSize,
          "filterName": filterName,
          "filterValue": filterValue
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function getCountOfQuestionForEachTopicWithFilter(topicID,filterName,filterValue){
  await axios({
      method: 'get',
      url: `${baseUrl}/question`,
      params: {
          "TopicID" : topicID,
          "getType": "getCountWithFilter",
          "filterName": filterName,
          "filterValue": filterValue
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function getCountOfQuestionForEachTopic(topicID){
  await axios({
      method: 'get',
      url: `${baseUrl}/question`,
      params: {
          "TopicID" : topicID,
          "getType": "getCount"
      },
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}

export async function saveQuestionForEachTopic(bodydata){
  await axios({
      method: 'post',
      url: `${baseUrl}/question`,
      data: bodydata
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response.data
}