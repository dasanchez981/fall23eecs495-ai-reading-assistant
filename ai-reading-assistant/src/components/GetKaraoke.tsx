
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import { Polly } from "@aws-sdk/client-polly";

// Function invoked by button click
export async function karaokeText(text: string, voice: string, voice_type:string) {

    // Create the Polly service client, assigning your credentials
    const client = new Polly({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: import.meta.env.VITE_AWS_REGION }),
            identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID, // IDENTITY_POOL_ID
        }),
    });


    // Set the parameters
    let speechParams = {
        Engine: voice_type, 
        OutputFormat: "json", // For example, 'mp3'
        SampleRate: "16000", // For example, '16000
        Text: text, // The 'speakText' function supplies this value
        TextType: "text", // For example, "text"
        VoiceId: voice, // For example, "Matthew"
        SpeechMarkTypes: ['word']
    };

    if (voice === "Matthew (News)" || voice === "Joanna (News)") {
        // Text to be synthesized with newscaster
        const text_with_ssml = '<speak><amazon:domain name="news">' + text + '</amazon:domain></speak>'
        
        // Change speech Params
        speechParams["Text"] = text_with_ssml
        speechParams["TextType"] = "ssml"

        if (voice === "Matthew (News)") {
            speechParams["VoiceId"] = "Matthew"
        }

        if (voice === "Joanna (News)") {
            speechParams["VoiceId"] = "Joanna"
        }
    }
    console.log("Speech parameters below:")
    console.log(speechParams)

    // Synthesize with full polly.
    // Return the result of the getURL async function
    
  try {
    const url= await getSynthesizeSpeechUrl({
      client,
      params: speechParams,
    });
    
    let myHeaders = new Headers();
    myHeaders.append("Accept", "text/plain");
    myHeaders.append("Content-Type", "text/plain");

    const urlString = url.toString(); // Ensures urlString is of type 'string'
    return urlString;
  } catch (error) {
    console.error('Error getting speech synthesis URL:', error);
    
  }
      
}