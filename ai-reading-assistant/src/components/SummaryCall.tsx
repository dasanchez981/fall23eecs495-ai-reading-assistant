
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
    // apiKey: import.meta.env.VITE_OPENAI_API_KEY
    // defaults to process.env["OPENAI_API_KEY"]
});


export async function summaryCall(text: string) {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      // TODO: Think about using choices[0]["finish_reason"] output to warn user
      // TODO: Have a limit on the user's text input so that there's enough tokens left for proper/complete summary
      messages: [
        {
          "role": "system",
          "content": "Summarize content you are provided with for a second-grade student."
        },
        {
          "role": "user",
          "content": text,
        },
      ],
      "temperature": 0,
      // TODO: Need to set this based on the number of input tokens to restrict length of summary
      "max_tokens": 100,
    });
    console.log("The response of the ChatGPT query is below:")
    console.log(chatCompletion)
    // console.log(chatCompletion.choices[0].message.content);
    // TODO: Revisit if ! is best way to fix, guarantees that return is a string
    return chatCompletion.choices[0].message.content!;
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
