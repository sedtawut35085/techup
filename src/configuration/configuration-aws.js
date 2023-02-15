import Amplify , {Auth} from 'aws-amplify';

const awsConfig = {

        // REQUIRED - Amazon Cognito Region
        region: 'ap-southeast-1',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'ap-southeast-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ap-southeast-1_t1lW5mTes',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '4lt5t8j5h9njbbimcucrajll6p',

};
  
Amplify.configure(awsConfig);

export default Auth;
