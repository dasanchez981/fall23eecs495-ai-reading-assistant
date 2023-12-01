
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});


export async function summaryCall(customization: string, text: string) {
    console.log("The value of the query is shown below:")
    console.log(customization + " " + text)
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      // TODO: Think about using choices[0]["finish_reason"] output to warn user
      // TODO: Have a limit on the user's text input so that there's enough tokens left for proper/complete summary
      messages: [
        {
          "role": "system",
          "content": "Provide a concise summary of the text you are provided with for increased human understanding and reading comprehension. Generate no more than 3 sentences. The summary must contain less words than the input text provided by the user."
        },
        {
          "role": "user",
          "content": customization + " " + text,
        },
      ],
      "temperature": 0,
      // TODO: Need to set this based on the number of input tokens to restrict length of summary
      "max_tokens": 1000,
    });
    console.log("The response of the ChatGPT query is below:")
    console.log(chatCompletion)
    // console.log(chatCompletion.choices[0].message.content);
    // TODO: Revisit if ! is best way to fix, guarantees that return is a string
    return chatCompletion.choices[0].message.content!;
}