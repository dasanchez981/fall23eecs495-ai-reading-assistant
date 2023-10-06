import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'


function App() {
  const [text, setText] = useState("")
  const [speechText, setSpeechText] = useState("")
  const [speechURL, setSpeechURL] = useState("")
  const [response, setResponse] = useState("")

  console.log("This is the text in the box")
  console.log(text)

  const handleSumSubmit = (event: any) => {
    event.preventDefault();
    
    summaryCall(text).then((value) => {
      setResponse(value)
      console.log("The value of the text summary query is below") 
      console.log(value) 
      
    });
  }

  const handleTTSSubmit = (event: any) => {
    event.preventDefault();
    
    speakText(speechText).then((value) => {
      setSpeechURL(value)
      console.log("The url of the speak text query is below") 
      console.log(value) 
  
    });
  
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
            {/* Text to Speech Button */}
            <div id="textToSynth">
              {/* <input autofocus size="23" type="text" id="textEntry" value="It's very good to meet you."/> */}
              {/* <button class="btn default" onClick="speakText()">Synthesize</button> */}
              {/* <p id="result">Enter text above then click Synthesize</p> */}

              <form onSubmit={handleTTSSubmit}>
                      <input type="submit" />

                      {/* <button onClick={() => } type="button" id="summarization" className="inputButtons">
                        Summarize
                      </button> */}

                      <textarea 
                        id="manual_input" 
                        name="manual_input" 
                        placeholder="Enter your text to Speak..."
                        value={text}
                        onChange={(e) => setSpeechText(e.target.value)}
                      >
                      </textarea>
                    </form>
            </div>
            <audio id="audioPlayback" controls>
              <source id="audioSource" type="audio/mp3" src={speechURL}></source>
            </audio>

            {/* Text Summarization Button */}
            <div>
                <h4>Please insert text into the text block below:</h4>
                <div id="input_with_buttons">
                    {/* <!-- On button click, call the API necessary to do the function, pull element value to upload the text through JS--> */}
                    {/* <button type="button" id="textToSpeech" className="inputButtons">Text to Speech</button> */}
                    
                    
                    <form onSubmit={handleSumSubmit}>
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
