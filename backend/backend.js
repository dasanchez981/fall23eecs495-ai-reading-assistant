import openai
import pandas
import openpyxl
import os
from dotenv import load_dotenv # used to load in .env information

load_dotenv()
openai.api_key = os.getenv("API_KEY")
# model_id = 'gpt-3.5-turbo'
model_id = 'gpt-4'
print("Labeling data with GPT using OpenAI API!")

def ChatGPT_conversation(question, answers):

    # Response object
    response = openai.ChatCompletion.create(
        model=model_id,
        temperature=0.0,  # Ensure temperature is 0 for more deterministic output
        messages=question # List of questions
    )

    api_usage = response['usage']
    print('Total token consumed: {0}'.format(api_usage['total_tokens']))
    answers.append({'role': response.choices[0].message.role, 'content': response.choices[0].message.content})

questions = []
answers = []
initial_prompt = "Use only the label pairs provided to assign the best primary and secondary label pairing to the text based on the auto safety hazard being described. Labels: {} Desired output format: primary_label|secondary_label".format(hazards)
hazards_info = {'role': 'user', 'content': initial_prompt}


// # Add in summaries to questions list
// for summary in df["SUMMARY"]:
//     questions.append([{'role': 'user', 'content': 'Label this text: {}'.format(summary)}])
// summary = "it not wanting to go or like ir catch gears"
// questions.append([{'role': 'user', 'content': 'Label this text: {}'.format(summary)}])

// # Iterate through data and get record auto labeled by ChatGPT
// for question in questions:
//     # Give necessary background information
//     question.insert(0,hazards_info)
//     print("Giving GPT the needed hazards methodology information")
//     # Get response
//     ChatGPT_conversation(question, answers)



// row = 2
// primary_col = 20
// secondary_col = 21
// for i in range(len(questions)):
//     # print("Question {}: {} \n \n{}\n".format(i,questions[i][1]['content'],answers[i]['content']))
//     # Parse GPT label output
//     labels_output = answers[i]['content'].split("|")
//     # print(labels_output)
//     # Assign labels to the respective cells
//     sheet.cell(row=row, column=primary_col).value = labels_output[0]
//     sheet.cell(row=row, column=secondary_col).value = labels_output[1]
//     print("Wrote label to excel file!")
//     print("P:{} S:{}".format(labels_output[0],labels_output[1]))
//     # Increment row
//     row += 1

// # Save changes 
// excel_workbook.save("investigations_test_labeled.xlsx")