
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
    // apiKey: import.meta.env.VITE_OPENAI_API_KEY
    // defaults to process.env["OPENAI_API_KEY"]
});

export async function summaryCall() {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'How many rainbows are on Earth?' }],
      model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion.choices[0].message);
    return chatCompletion.choices[0].message;
}
  



// // Asynchronous function to generate text from the OpenAI API
// async generateText(prompt : string, model: string, max_tokens: number, temperature = 0.85) {
//     try {
//         // Send a request to the OpenAI API to generate text
//         const response = await this.openai.createCompletion({
//             model,
//             prompt,
//             max_tokens,
//             n: 1,
//             temperature,
//         });
//         console.log(`request cost: ${response.data.usage.total_tokens} tokens`);
//         // Return the text of the response
//         return response.data.choices[0].text;
//     } catch (error) {
//         throw error;
//     }
// }
