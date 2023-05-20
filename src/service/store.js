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