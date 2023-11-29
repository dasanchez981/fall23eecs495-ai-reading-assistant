
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import { Buffer } from 'buffer';

// Function invoked by button click
export async function speakText(text: string) {

    // Create the Polly service client, assigning your credentials
    const client = new Polly({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: fromCognitoIdentityPool({
            client: new CognitoIdentityClient({ region: import.meta.env.VITE_AWS_REGION }),
            identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID, // IDENTITY_POOL_ID
        }),
    });

    // Set the parameters
    const speechParams = {
        Engine: "long-form", // TODO: For Sonika and Danny change to 'standard' engine, for Raj change to 'neural' engine
        OutputFormat: "mp3", // For example, 'mp3'
        SampleRate: "16000", // For example, '16000
        Text: text, // The 'speakText' function supplies this value
        TextType: "text", // For example, "text"
        VoiceId: "Danielle", // For example, "Matthew"
    };

    // Synthesize with full polly.
    // Return the result of the getURL async function
    return (async () => {
        const url = await getSynthesizeSpeechUrl({
            client,
            params: speechParams,
        });
        console.log("URL from AWS Polly")
        console.log(url);

        // Process to convert Polly presigned URL to a blob
        // blob object plays nicely with html/react audio player
        async function downloadPollyAudio(url: string) {
            // Catch error for invalid input
            try {
              const response = await fetch(url);
              const arrayBuffer = await response.arrayBuffer();
              console.log("response below:");
              console.log(response)
              console.log("ArrayBuffer below:")
              console.log(arrayBuffer)
              // Convert the ArrayBuffer to a Buffer
              const buffer = Buffer.from(arrayBuffer);
              console.log("Big B buffer below:")
              console.log(buffer)
              // Create a Blob from buffer
              const blob = new Blob([buffer], { type: 'audio/mpeg' });

              console.log("Blob generated")
              
              return blob
            } 
            
            catch (error: any) {
              console.error('Error downloading audio:', error.message);
            }
          }
          return downloadPollyAudio(url.toString());
    })();  
}