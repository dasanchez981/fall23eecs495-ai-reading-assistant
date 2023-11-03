import { useState } from 'react'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Button from 'react-bootstrap/Button';
// import Popover from "react-text-selection-popover";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';

function App() {
  const [text, setText] = useState("")
  const [audioType, setAudioType] = useState("")
  const [speechURL, setSpeechURL] = useState("")
  const [response, setResponse] = useState("")

  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  
   // Chrome background listener to receive messages from context menu items in service-worker.js
   chrome.runtime.onMessage.addListener(({ name, data }) => {
    if (name === 'summarize-text') {
      console.log("Received message to summarize from service-worker.js!");
      console.log(data)
    }
    else if (name === 'text-to-speech') {
      console.log("Received message to speak from service-worker.js!")
      console.log(data)
    }
    else if (name === 'text-focus') {
      console.log("Received message to focus text from service-worker.js!")
      console.log(data)
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
  const handleTTSSubmit = (e: any) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.id === "speakbutton") {
      speakText(text).then((value) => {
        setSpeechURL(value)
        setAudioType("Speaking highlighted text...")
  
        console.log("The url of the speak text query is below") 
        console.log(value)
    
      });
    }
    else if(e.nativeEvent.submitter.id === "speakSumbutton"){
      speakText(response).then((value) => {
        setSpeechURL(value)
        setAudioType("Speaking text summary...")
        console.log("The url of the speak summary text query is below") 
        console.log(value)
    
      });
    }
    
  }

  const onSubmit = (e: any)  => {
    e.preventDefault();
    console.log("The value of the input is below:")
    console.log(e)
    console.log(e.nativeEvent.submitter.value)
    if (e.nativeEvent.submitter.id === "speakbutton" || e.nativeEvent.submitter.id==="speakSumbutton") {
      handleTTSSubmit(e);
    }
    else if(e.nativeEvent.submitter.id === "sumbutton"){
      handleSumSubmit(e);
    }
  };

  // This is experimental approach to implementing toolbar functionality
  // Right now the 'Activate Toolbar' button has to be pressed in order for the toolbar 
  // listener to be activated
  const onclick = async () => {
    let [tab] = await chrome.tabs.query({active: true})
    if (tab.url?.startsWith("chrome://")) return undefined;
    console.log("Toolbar has been activated")
    // This can't access React variables so need to send through Chrome API
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        console.log("Executing script on webpage to add listener")
        document.addEventListener("click", () => {
          const selection = window.getSelection()
          const highlighted = window.getSelection()?.toString()
          console.log("Within toolbar listener")
          //console.log(highlighted);
          if(highlighted != '') {
            console.log("If shown then activate toolbar works!")
            console.log("Selection location: ");
            console.log(selection?.getRangeAt(0))
            console.log("bounding rectangle:")
            console.log(selection?.getRangeAt(0).getBoundingClientRect())
            
            
            // Both methods may need to extend an HTMLElement and then appended like in iFrame method
            // Extending HTML element is involved and requires a lot of code and coordination
            // In consideration but need to think about, see https://github.com/MariusBongarts/medium-highlighter
            // for example of what we might have to do
            
            // *** Popover Method***
            // <Popover>
            //   <div className="popover">
            //       <b>B</b>
            //   </div>
            // </Popover>
            
            // *** Manual IFrame Method ***
            // var rect = selection?.getRangeAt(0).getBoundingClientRect();
            // var elem = document.createElement("iframe");
            // document.body.appendChild(elem);
            // elem.setAttribute("style", "position: fixed; height: 50px; width: 50px; padding:10px 13px; background-color:#D3D9DE; z-index: 99999; margin: 0;");
            // let element = document.createElement("iframe");
            // document.body.appendChild(element);
            // element.setAttribute("style", "position: fixed; top: 0; height: 50px; left: 0; width: 50px; padding:10px 13px; background-color:#D3D9DE; z-index: 99999; margin: 0;");
            // elem.setAttribute("style",`top: ${rect?.top}`)
            // elem.setAttribute("style",`left: ${rect?.left}`)
            //https://stackoverflow.com/questions/1589721/get-selected-text-position-and-place-an-element-next-to-it/1589912#1589912
            /*var range = selection?.getRangeAt(0).cloneRange()
            range?.collapse(false)
            var markerEl = document.createElement("span");
            markerEl.appendChild( document.createTextNode("\ufeff") );
            range?.insertNode(markerEl);

            if (markerEl) {
              // Lazily create element to be placed next to the selection
              var selectionEl;
              if (!selectionEl) {
                  selectionEl = document.createElement("div");
                  selectionEl.style.border = "solid darkblue 1px";
                  selectionEl.style.backgroundColor = "lightgoldenrodyellow";
                  selectionEl.innerHTML = "&lt;- selection";
                  selectionEl.style.position = "absolute";
  
                  document.body.appendChild(selectionEl);
              }
              var obj = markerEl;
              var left = 0, top = 0;
              do {
                  left += obj.offsetLeft;
                  top += obj.offsetTop;
              } while (obj = obj.offsetParent);

                  // Move the button into place.
                  // Substitute your jQuery stuff in here
                  selectionEl.style.left = left + "px";
                  selectionEl.style.top = top + "px";

                  markerEl.parentNode?.removeChild(markerEl);
            }*/
          }
        });
      }
    });
  }
    
  return (
    <>
      <div id="sidebar_container">
        <header>
          <h2>AI-Powered Reading Assistant (AIRA)</h2>
        </header>
        <br></br>
        {/* <Form>
              <Form.Check // prettier-ignore
                type="switch"
                id="toolbar-mode"
                label="Enable toolbar"
              />
            </Form> */}
        <Button onClick={onclick} variant="warning" id="highlight">
          Activate Toolbar (Deprecated)
        </Button>
        <br></br>
        <p id="audioIndicator"> {audioType} </p>
        {/* TODO: Figure out why audio playback being goofy */}
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
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
            }}
          />
        </div>
        <div id="textToSynth">
          <form onSubmit={onSubmit}>
            <input type="submit" value="Speak Text" id="speakbutton" />
            <input type="submit" value="Summarize" id="sumbutton" />

            <textarea
              id="manual_input"
              name="manual_input"
              placeholder="Enter your text to Speak/Summarize..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </form>
        </div>
        <div>
          <br></br>
          <h5>AI-Generated Summary:</h5>
          <form onSubmit={onSubmit}>
            <input type="submit" value="Speak Summary" id="speakSumbutton" />
            <textarea
              id="manual_output"
              name="manual_output"
              placeholder="Result from AI summarization..."
              value={response}
            ></textarea>
          </form>
        </div>
      </div>
    </>
  );
}

export default App
