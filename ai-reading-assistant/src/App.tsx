import { useState } from 'react'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const [text, setText] = useState("")
  // const [speechText, setSpeechText] = useState("")
  // const [highlightText, setHighlightText] = useState("")
  const [speechURL, setSpeechURL] = useState("")
  const [response, setResponse] = useState("")

  // chrome.action.onClicked.addListener((tab)=>{
  //   chrome.scripting.executeScript({
  //       target: { tabId: tab.id! },
  //       func: () => {
  //         alert("hello!")
  //       }
  //   });
  // });

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
    // console.log(e.target.btn.value);
    // console.log(e.target.text.value); //??
    // console.log(e.state.value); //??
    console.log("The value of the input is below:")
    console.log(e)
    //console.log(e.target[0].value)
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
  // console.log(speechText)
    
  return (
    <>
      <div id="sidebar_container">
            <header>
                <h1>AI-Powered Reading Assistant (AIRA)</h1>
            </header>
            <br></br>
            <button onClick={onclick}>Transfer Highlighted Text</button>
            <br></br>
            {/* Text to Speech Button */}
            <div id="textToSynth">  
              {/* <input autofocus size="23" type="text" id="textEntry" value="It's very good to meet you."/> */}
              {/* <button class="btn default" onClick="speakText()">Synthesize</button> */}
              {/* <p id="result">Enter text above then click Synthesize</p> */}

              <form onSubmit={onSubmit}>
                      <input type="submit" value="Speak"/>
                      <input type="submit" value="Summarize"/>
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
            </div>
            {/*<audio id="audioPlayback" controls>
              <source id="audioSource" type="audio/mp3" src={speechURL}></source>
              {/* document.getElementById("audioPlayback").load(); // why no complain? */}
            {/* </audio> */}
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
                  backgroundColor: 'black',
                  border: '1px solid #ccc',
                  padding: '10px',
                  width: '300px',
                  borderRadius: '5px',
                  // Add more inline styles here
                }}
                // other props here
                // TODO: need more? need to customize...
              />
            </div>
  
            <br></br>
            <div>
              <h4>AI generated text summary:</h4>
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
    </>
  )
}

export default App
