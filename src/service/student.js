import axios from 'axios';
import { getAccessToken, getCurrentUserId,convertToBase64,uploadPhoto } from './index'
const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'
let response, accessToken, userEmail, convertedFile


export async function getStudent () {
    accessToken = await getAccessToken()
    userEmail = await getCurrentUserId()
    await axios({
        method: 'get',
        url: `${baseUrl}/student`,  
        params: {
          "UserEmail" : userEmail
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

export async function getStudentFromStudentEmail (StudentEmail) {
  accessToken = await getAccessToken()
  await axios({
      method: 'get',
      url: `${baseUrl}/student`,  
      params: {
        "UserEmail" : StudentEmail
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

export async function saveStudent (bodydata, imageFile) {
    accessToken = await getAccessToken()
    convertedFile = await convertToBase64(imageFile);
    convertedFile = imageFile.type + ' ' + convertedFile;
    let responseLocationImage = await uploadPhoto(convertedFile)
    bodydata['ImageURL'] = responseLocationImage
    await axios({
        method: 'post',
        url: `${baseUrl}/student`,
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

export async function updateStudentText (bodydata,StudentEmail) {
  accessToken = await getAccessToken()
  await axios({
      method: 'patch',
      url: `${baseUrl}/student`,
      headers: { 
          'Authorization': accessToken, 
          'Content-Type': 'text/plain'
      },
      params: {
        "UserEmail" : StudentEmail
      }, 
      data: bodydata
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response
}

export async function updateUserProfileWithNewImage(body,imageFile) {
  accessToken = await getAccessToken()
  userEmail = await getCurrentUserId()
  convertedFile = await convertToBase64(imageFile);
  convertedFile = imageFile.type + ' ' + convertedFile;
  let responseLocationImage = await uploadPhoto(convertedFile)
  console.log(responseLocationImage)
  body['ImageURL'] = responseLocationImage
  await axios({
      method: 'put',
      url: `${baseUrl}/student`,
      headers: { 
          'Authorization': accessToken, 
          'Content-Type': 'text/plain'
      },
      params: {
        "UserEmail" : userEmail
      }, 
      data: body
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response
}

export async function updateUserProfile (body) {
  accessToken = await getAccessToken()
  userEmail = await getCurrentUserId()
  await axios({
      method: 'put',
      url: `${baseUrl}/student`,
      headers: { 
          'Authorization': accessToken, 
          'Content-Type': 'text/plain'
      },
      params: {
        "UserEmail" : userEmail
      }, 
      data: body
      }).then((res) => {
        response = res
      }).catch((err)=>{
        response = err
      })
  return response
}
