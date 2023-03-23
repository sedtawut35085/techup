import axios from 'axios';

const baseUrl = 'https://5ccp4x5xq5.execute-api.ap-southeast-1.amazonaws.com/dev';
let response

export async function getQuestionForEachTopic(topicID){
    await axios({
        method: 'get',
        url: `${baseUrl}/question`,
        params: {
            "TopicID" : topicID,
            "getType": "getQuestionForEachTopic"
        },
        }).then((res) => {
          response = res
        }).catch((err)=>{
          response = err
        })
    return response.data
}