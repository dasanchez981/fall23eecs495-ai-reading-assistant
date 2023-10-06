// import AWS from 'aws-sdk'
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";
import { Polly } from "@aws-sdk/client-polly";
import { useState } from 'react'

// Initialize the Amazon Cognito credentials provider
AWS.config.region = import.meta.env.VITE_AWS_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID});


// Function invoked by button click
export async function speakText(text: string) {

    const [url, SetURL] = useState<string>('');

    // Create the JSON parameters for getSynthesizeSpeechUrl
    const speechParams = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: text,
        TextType: "text",
        VoiceId: "Matthew"
    };

    // Create the Polly service object and presigner object
    // var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    // Needed for users who don't have AWS credentials
    // var signer = new AWS.Polly.Presigner(speechParams)

    // Synthesize with full polly.
    (async () => {
        let url = await getSynthesizeSpeechUrl({
            client: new Polly({apiVersion: '2016-06-10'}),
            params: speechParams,
        });
        console.log(url);
        // let stringURL = url.toString();
        // SetURL(stringURL)
        SetURL("Help")
    })();
    

    // // Create presigned URL of synthesized speech file
    // signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         SetURL(url)
    //         // document.getElementById('audioSource').src = url;
    //         // document.getElementById('audioPlayback').load();
    //         // document.getElementById('result').innerHTML = "Speech ready to play.";
    //     }
    // });

    return url
}