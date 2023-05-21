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

export async function getRewards() {
    await axios(
        {
            method:'get',
            url: `${baseUrl}/store`
        }
    ).then((res) => 
        {
            response = res
        }
    ).catch((err) => 
        {
            response = err
        }
    )
    return response.data
}

export async function addToRedeemHistory(reward){
    userEmail = await getCurrentUserId()
    await axios(
        {
            method:'post',
            url: `${baseUrl}/store`,
            headers: { 
                'Content-Type': 'text/plain'
            },
            data:{
                "Type" : "addToHistory",
                "UserEmail" : userEmail,
                "RewardID" : reward.RewardID,
                "UsePoint" : reward.Point
            }
        }
    ).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}

export async function addToLogPoint(reward){
    userEmail = await getCurrentUserId()
    await axios(
        {
            method:'post',
            url: `${baseUrl}/store`,
            headers: { 
                'Content-Type': 'text/plain'
            },
            data:{
                "Type" : "addToLogPoint",
                "UserEmail" : userEmail,
                "Point" : reward.Point
            }
        }
    ).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}

export async function updateUserPoint(reward){
    userEmail = await getCurrentUserId()
    await axios(
        {
            method:'patch',
            url: `${baseUrl}/store`,
            params:{
                "UserEmail" : userEmail,
                "Point" : reward.Point
            }
        }
    ).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}

