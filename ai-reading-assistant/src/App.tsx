import { useState } from 'react'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [text, setText] = useState("")
  const [speechURL, setSpeechURL] = useState("")
  const [response, setResponse] = useState("")

  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  
  // Chrome background listener
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'setText') {
      // Set the text and speechText values here
      console.log("Received message from Chrome!")
      setText(message.text);
      // setSpeechText(message.text);
    }
  });

  // Function to handle summaries
  const handleSumSubmit = (event: any) => {
    event.preventDefault();
    
    summaryCall(text).then((value) => {
      setResponse(value)
      console.log("The value of the text summary query is below") 
      console.log(value) 
      
    });
  }

  // Function to handle text to speech
  const handleTTSSubmit = (event: any) => {
    event.preventDefault();
    
    speakText(text).then((value) => {
      setSpeechURL(value)
      
      console.log("The url of the speak text query is below") 
      console.log(value)
  
    });
  }

  const onSubmit = (e: any)  => {
    e.preventDefault();
    console.log("The value of the input is below:")
    console.log(e)
    console.log(e.nativeEvent.submitter.value)
    if (e.nativeEvent.submitter.value === "Speak") {
      handleTTSSubmit(e);
    }
    else if(e.nativeEvent.submitter.value === "Summarize"){
      handleSumSubmit(e);
    }
  };

  const onclick = async () => {
    let [tab] = await chrome.tabs.query({active: true})
    if (tab.url?.startsWith("chrome://")) return undefined;
    // This can't access React variables so need to send through Chrome API
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const highlighted = window.getSelection()?.toString()
        if (highlighted != null) {
          // alert(highlighted)
          // Send the highlighted text to the background script
          chrome.runtime.sendMessage({ action: 'setText', text: highlighted });
        }
      }
    });
  }

  console.log("Text to be analyzed")
  console.log(text)
  console.log("The speech URL is set below:")
  console.log(speechURL)
    
  return (
    <>
      <div id="sidebar_container">
            <header>
                <h2>AI-Powered Reading Assistant (AIRA)</h2>
            </header>
            <br></br>
            <Button onClick={onclick} variant="warning" id="highlight">Transfer Highlighted Text</Button>
            <br></br>
            <div id="textToSynth">  

              <form onSubmit={onSubmit}>
                      <input type="submit" value="Speak" id="speakbutton"/>
                      <input type="submit" value="Summarize"/>

                      <textarea 
                        id="manual_input" 
                        name="manual_input" 
                        placeholder="Enter your text to Speak/Summarize..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      >
                      </textarea>
              </form>
            </div>
            <div id="audio_container">
              <AudioPlayer 
                autoPlay
                src={speechURL}
                showSkipControls={false}
                showJumpControls={true}
                showFilledProgress={true}
                showFilledVolume={false}
                hasDefaultKeyBindings={false}
                autoPlayAfterSrcChange={false}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '10px',
                  width: '300px',
                  borderRadius: '5px',
                }}
              />
            </div>
  
            <div>
              <h4>AI-Generated Summary:</h4>
              <textarea 
                id="manual_output" 
                name="manual_output" 
                placeholder="Result from AI summarization..."
                value={response}
                >
              </textarea>
            </div>
        </div>   
    </>
  )
}

export default App
