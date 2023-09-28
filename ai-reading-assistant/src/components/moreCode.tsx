// index.js

// import async API call function to make an API call
// import { OpenAI } from '../components/OpenAI';

// // Creating a new instance of the OpenAI class and passing in the OPENAI_KEY environment variable
// const openai_api_key: string = import.meta.env.OPENAI_API_KEY;
// const openAI = new OpenAI(openai_api_key);
// const topic: string = 'NodeJs';
// const model = 'gpt-3.5-turbo';
// // Function to generate the prompt for the OpenAI API 
// // In the future, it will be moved to a helper class in the next code review
// const generatePrompt = (topic: string) => {
//     return `Write an blog post about "${topic}", it should in HTML format, include 5 unique points, using informative tone.`
// };
// // Use the generateText method to generate text from the OpenAI API and passing the generated prompt, the model and max token value
// await openAI.generateText(generatePrompt(topic), model, 800)
//     .then(text => {
//         // Logging the generated text to the console
//         // In the future, this will be replaced to upload the returned blog text to a WordPress site using the WordPress REST API
//         console.log(text);
//     })
//     .catch(error => {
//         console.error(error);
//     });