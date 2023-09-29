import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { summaryCall } from './components/SummaryCall'


function App() {
  const [text, setText] = useState("")
  const [response, setResponse] = useState("")

  console.log("This is the text in the box")
  console.log(text)

  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    // setResponse(summaryCall())
    summaryCall().then((value) => {
      setResponse(value)
      console.log("The value of the text summary query is below") 
      console.log(value) 
      
    });
    // alert(`The name you entered was: ${response}`)
  }

  console.log("The response to the text summary query is below") 
  console.log(response);
  

  return (
    <>
      <div id="sidebar_container">
            <header>
                <h1>AI-Powered Reading Assistant (AIRA)</h1>
            </header>
            <br></br>
            <div>
                <h4>Please insert text into the text block below:</h4>
                <div id="input_with_buttons">
                    {/* <!-- On button click, call the API necessary to do the function, pull element value to upload the text through JS--> */}
                    {/* <button type="button" id="textToSpeech" className="inputButtons">Text to Speech</button> */}
                    
                    
                    <form onSubmit={handleSubmit}>
                      <input type="submit" />

                      {/* <button onClick={() => } type="button" id="summarization" className="inputButtons">
                        Summarize
                      </button> */}

                      <textarea 
                        id="manual_input" 
                        name="manual_input" 
                        placeholder="Enter your text to Speak/Summarize..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      >
                      </textarea>
                    </form>
                    
                    <br></br>
                    <div>
                      <h4>The resulting output will be displayed below:</h4>
                      <textarea 
                        id="manual_output" 
                        name="manual_output" 
                        placeholder="Result from AI summarization..."
                        value={response}
                        >
                      </textarea>
                  </div>
                    {/* <button type="button" id="clearTextButton" onClick="document.getElementById('manual_input').value = ''">Clear Text</button> */}
                </div>  
            </div>   
        </div>   
    </>
  )
}

export default App
