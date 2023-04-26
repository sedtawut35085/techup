import axios from 'axios';
import { getCurrentUserId } from '.';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response
let accessToken
let userEmail

export async function getEachDiscuss(discussID) {
    await axios({
        method: 'get',
        url: `${baseUrl}/discuss`,  
        params: {
          "discussID" : discussID,
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