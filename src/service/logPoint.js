import axios from 'axios';
import { getCurrentUserId } from '.';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'

let response
let accessToken
let userEmail

export async function addPointFromProfessorToLogPoint(point){
    userEmail = await getCurrentUserId()
    await axios(
        {
            method:'post',
            url: `${baseUrl}/log-point`,
            params:{
                "Type" : "addPointFromProfessor",
                "UserEmail" : userEmail,
                "Point" : point
            }
        }
    ).then((res) => {
        response = res
    }).catch((err) => {
        response = err
    })
    return response
}