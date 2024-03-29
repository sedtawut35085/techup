import axios from 'axios';
import { getAccessToken, getCurrentUserId,convertToBase64,uploadPhoto } from './index'
const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'
let response, accessToken, professorEmail, convertedFile


export async function getProfessor() {
    accessToken = await getAccessToken()
    professorEmail = await getCurrentUserId()
    await axios({
        method: 'get',
        url: `${baseUrl}/professor`,  
        params: {
          "ProfessorEmail" : professorEmail
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

export async function getProfessorByEmail(professorEmail) {
  accessToken = await getAccessToken()
  await axios({
      method: 'get',
      url: `${baseUrl}/professor`,  
      params: {
        "ProfessorEmail" : professorEmail
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

export async function saveProfessor (bodydata, imageFile) {
    accessToken = await getAccessToken()
    convertedFile = await convertToBase64(imageFile);
    convertedFile = imageFile.type + ' ' + convertedFile;
    let responseLocationImage = await uploadPhoto(convertedFile)
    bodydata['ImageURL'] = responseLocationImage
    await axios({
        method: 'post',
        url: `${baseUrl}/professor`,
        headers: { 
            'Authorization': accessToken, 
            'Content-Type': 'text/plain'
        },
        data: bodydata
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response
}