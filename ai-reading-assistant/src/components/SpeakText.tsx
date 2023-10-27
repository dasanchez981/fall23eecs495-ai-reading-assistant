/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-browser.html.

Purpose:
polly.ts demonstrates how to convert text to speech using Amazon Polly.

Inputs (replace in code):
- OUTPUT_FORMAT
- SAMPLE_RATE
- TEXT_TYPE
- POLLY_VOICE
- REGION
- IDENTITY_POOL_ID

Running the code:
Follow the steps in https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-browser.html.
*/
// snippet-start:[Polly.JavaScript.BrowserExample.completeV3]
// snippet-start:[Polly.JavaScript.BrowserExample.configV3]
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";


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
        Engine: "neural", // TODO: For Sonika and Danny change to 'Standard' engine
        OutputFormat: "mp3", // For example, 'mp3'
        SampleRate: "16000", // For example, '16000
        Text: text, // The 'speakText' function supplies this value
        TextType: "text", // For example, "text"
        VoiceId: "Joanna", // For example, "Matthew"
    };

    // Create the Polly service object and presigner object
    // var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    // Needed for users who don't have AWS credentials
    // var signer = new AWS.Polly.Presigner(speechParams)

    // Synthesize with full polly.
    // Return the result of the getURL async function
    return (async () => {
        const url = await getSynthesizeSpeechUrl({
            client,
            params: speechParams,
        });
        console.log(url);
        // let stringURL = url.toString();
        // SetURL(stringURL)
        return url.toString()
    })();

    // const getURL = async () => {
    //     try {
    //         const url = await getSynthesizeSpeechUrl({
    //             client,
    //             params: speechParams,
    //         });
    //         console.log(url);
    //         return url.toString();
    //     }
    //     catch (err) {
    //         console.log("Error", err);
    //         return "Error";
     
    //     }
    // };

    // return getURL



   
}
    






// snippet-end:[Polly.JavaScript.BrowserExample.configV3]
// snippet-start:[Polly.JavaScript.BrowserExample.synthesizeV3]
// const speakText = async () => {
//   // Update the Text parameter with the text entered by the user
//   speechParams.Text = document.getElementById("textEntry").value;
//   try {
//     let url = await getSynthesizeSpeechUrl({
//       client,
//       params: speechParams,
//     });
//     console.log(url);
//     // Load the URL of the voice recording into the browser
//     document.getElementById("audioSource").src = url;
//     document.getElementById("audioPlayback").load();
//     document.getElementById("result").innerHTML = "Speech ready to play.";
//   } catch (err) {
//     console.log("Error", err);
//     document.getElementById("result").innerHTML = err;
//   }
// };
// Expose the function to the browser
// window.speakText = speakText;
// snippet-end:[Polly.JavaScript.BrowserExample.synthesizeV3]
// snippet-end:[Polly.JavaScript.BrowserExample.completeV3]
