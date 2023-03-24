import Auth from '../configuration/configuration-aws'
import axios from 'axios';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev'
let response, accessToken

export async function getAccessToken () {  
    let response = await Auth.currentSession()
    .then(res => {
        return res.getAccessToken().getJwtToken()
    })
    .catch(err => {
        return err
    });
    return response
}

export async function getCurrentUserId () {  
    let response = await Auth.currentAuthenticatedUser()
    .then((res) => {
        return res.attributes.email
    })
    .catch((err) => {
        return err
    })
    return response
}

export async function convertToBase64 (file){
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        }
      })
}

export async function uploadPhoto (file){
    accessToken = await getAccessToken()
    const headers = {
        'Authorization': accessToken, 
        'Content-Type': 'text/plain'
    }
    await axios.post(`${baseUrl}/file-upload`, file, { headers }).then((res) => {
        response = res.data.Location
      }).catch((err)=>{
        response = err
      })
      return response
}


