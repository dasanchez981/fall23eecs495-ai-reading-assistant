import { useState } from 'react'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const [text, setText] = useState("")
  const [speechText, setSpeechText] = useState("")
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
      setSpeechText(message.text);
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
    
    speakText(speechText).then((value) => {
      setSpeechURL(value)
      console.log("The url of the speak text query is below") 
      console.log(value) 
  
    });
  }

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

  const moveSide = async () => {
    let [tab] = await chrome.tabs.query({active: true})
    if (tab.url?.startsWith("chrome://")) return undefined;
    // This can't access React variables so need to send through Chrome API
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        if(!(document.getElementsByTagName("html")[0].style.marginLeft == "380px")){
          // let originHTML = document.getElementsByTagName("html")[0].style.marginLeft = "380px";
          let iframe = document.createElement("iframe");
          iframe.id = 'extensionSidebar';
          document.body.appendChild(iframe);
      
          let extURL = chrome.runtime.getURL('index.html');
          iframe.src=extURL;
          iframe.scrolling="no";
      
          // iframe.style="position: fixed; top: 0; height: 100%; left: 0; width: 354px; padding:10px 13px; background-color:#D3D9DE; z-index: 99999; margin: 0;";
        }else{
            document.getElementsByTagName("html")[0].style.marginLeft = "0px";
            document.getElementById('extensionSidebar')!.remove();
        }
      }
    });
  }

  console.log("Text to be analyzed")
  console.log(text)
  console.log(speechText)
    
  return (
    <>
      <div id="sidebar_container">
            <header>
                <h1>AI-Powered Reading Assistant (AIRA)</h1>
            </header>
            <br></br>
            <button onClick={moveSide}>Move to Side</button>
            <button onClick={onclick}>Transfer Highlighted Text</button>
            <br></br>
            {/* Text to Speech Button */}
            <div id="textToSynth">
              {/* <input autofocus size="23" type="text" id="textEntry" value="It's very good to meet you."/> */}
              {/* <button class="btn default" onClick="speakText()">Synthesize</button> */}
              {/* <p id="result">Enter text above then click Synthesize</p> */}

              <form onSubmit={handleTTSSubmit}>
                      <input type="submit" value="Speak"/>

                      {/* <button onClick={() => } type="button" id="summarization" className="inputButtons">
                        Summarize
                      </button> */}

                      <textarea 
                        id="manual_input" 
                        name="manual_input" 
                        placeholder="Enter your text to Speak..."
                        value={speechText}
                        onChange={(e) => setSpeechText(e.target.value)}
                      >
                      </textarea>
              </form>
            </div>
            <audio id="audioPlayback" controls>
              <source id="audioSource" type="audio/mp3" src={speechURL}></source>
              document.getElementById("audioPlayback").load(); // why no complain?
            </audio>
            <AudioPlayer
              autoPlay
              src={speechURL}
              showSkipControls={true}
              showJumpControls={true}
              showFilledProgress={true}
              showFilledVolume={true}
              hasDefaultKeyBindings={true}
              autoPlayAfterSrcChange={true}
              // other props here
              // TODO: need more? need to customize...
            />
            {/* Text Summarization Button */}
            <div>
                <h4>Please insert text into the text block below:</h4>
                <div id="input_with_buttons">
                    {/* <!-- On button click, call the API necessary to do the function, pull element value to upload the text through JS--> */}
                    {/* <button type="button" id="textToSpeech" className="inputButtons">Text to Speech</button> */}
                    
                    
                    <form onSubmit={handleSumSubmit}>
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
