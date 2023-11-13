import { useState } from 'react'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import Popover from "react-text-selection-popover";
// import { AiFillQuestionCircle } from 'react-icons/AiFillQuestionCircle';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function App() {
  const [text, setText] = useState("");
  const [audioType, setAudioType] = useState("");
  const [speechURL, setSpeechURL] = useState("");
  const [response, setResponse] = useState("");
  const [loadingSum, setLoadingSum] = useState(false);
  const [loadingSpeech, setLoadingSpeech] = useState(false);
  console.log(speechURL)

  // Chrome background listener to receive messages from context menu items in service-worker.js
  chrome.runtime.onMessage.addListener(({ name, data }) => {
    if (name === "summarize-text") {
      console.log("Received message to summarize from service-worker.js!");
      console.log(data.value);
      // Activate loading indicator 
      setLoadingSum(true)
      summaryCall(data.value).then((value) => {
        setResponse(value);
        // Deactivate loading indicator
        setLoadingSum(false)
        console.log("The value of the text summary query is below");
        console.log(value);
      });
    } else if (name === "text-to-speech") {
      console.log("Received message to speak from service-worker.js!");
      console.log(data);
      // Activate loading indicator 
      setLoadingSpeech(true)
      speakText(data.value).then((value) => {
        const audioUrl = URL.createObjectURL(value!);
        setSpeechURL(audioUrl);
        // Deactivate loading indicator
        setLoadingSpeech(false)
        setAudioType("Speaking highlighted text...");
        console.log("The url of the speak text query is below");
        console.log(value);
      });
    } else if (name === "text-focus") {
      console.log("Received message to focus text from service-worker.js!");
      console.log(data);
    }
  });

  // Function to handle summaries
  const handleSumSubmit = (event: any) => {
    event.preventDefault();
    // Activate loading indicator 
    setLoadingSum(true)
    summaryCall(text).then((value) => {
      setResponse(value);
      // Deactivate loading indicator
      setLoadingSum(false)
      console.log("The value of the text summary query is below");
      console.log(value);
    });
  };

  // Function to handle text to speech
  const handleTTSSubmit = (e: any) => {
    e.preventDefault();
    // Activate loading indicator 
    setLoadingSpeech(true)

    if (e.nativeEvent.submitter.id === "speakbutton") {
      speakText(text).then((value) => {
        const audioUrl = URL.createObjectURL(value!);
        setSpeechURL(audioUrl);
        // Deactivate loading indicator
        setLoadingSpeech(false)
        setAudioType("Speaking highlighted text...");

        console.log("The url of the speak text query is below");
        console.log(value);
      });
    } 
    
    else if (e.nativeEvent.submitter.id === "speakSumbutton") {
      speakText(response).then((value) => {
        const audioUrl = URL.createObjectURL(value!);
        setSpeechURL(audioUrl);
        // Deactivate loading indicator
        setLoadingSpeech(false)
        setAudioType("Speaking text summary...");
        console.log("The url of the speak summary text query is below");
        console.log(value);
      });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("The value of the input is below:");
    console.log(e);
    console.log(e.nativeEvent.submitter.value);
    if (
      e.nativeEvent.submitter.id === "speakbutton" ||
      e.nativeEvent.submitter.id === "speakSumbutton"
    ) {
      handleTTSSubmit(e);
    } else if (e.nativeEvent.submitter.id === "sumbutton") {
      handleSumSubmit(e);
    }
  };

  // Tooltip at top of UI to help users
  const help_popover = (
    <Popover id="help-popup" style={{ zIndex: 9999 }}>
        <Popover.Body>
            <p><b> 
            Please highlight text on any webpage and select the relevant 
            functionality you desire from the context menu!
            </b></p>
        </Popover.Body>
    </Popover>
    );

  const onResetFocus = async () => {
    let [tab] = await chrome.tabs.query({active: true})
    if (tab.url?.startsWith("chrome://")) return undefined;
    // This can't access React variables so need to send through Chrome API
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        var focusedElements = document.querySelectorAll('.ancestor');
        for(var j = 0; j < focusedElements.length; j++)
        {
          //can try removing spans themselves too
          focusedElements[j].classList.remove('ancestor');
        }
      }
    });
    console.log("Reset!");
  }
   


  return (
    <>
      <div id="sidebar_container">
        <header>
          <h2>Supportive AI-Reading Assistant (SARA)</h2>
        </header>
        <br></br>
        <div id="resfocuscontainer">
         <Button className = "resfocus" variant="secondary" onClick={onResetFocus}>Reset Focus</Button>{' '}
       </div>
        <br></br>
        <div>
          <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={help_popover}>
              <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                  <p>HELP</p>
              </span>
          </OverlayTrigger>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          {loadingSpeech ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
          ) : (
            <p id="audioIndicator">
              {audioType}
            </p>
          )}
        </div>
        
        {/* If no speech is available then hide player from user */}
        {speechURL ? (
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
        ) : (
          <p>Utilize text-to-speech to activate player </p>
        )}

        
        <div>
          <br></br>
          <h5>AI-Generated Summary:</h5>
          {/* Loading indicator shows when backend is processing */}
          {loadingSum && (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          )}
          <form onSubmit={onSubmit}>
            <input type="submit" value="Speak Summary" id="speakSumbutton" />
            <textarea 
              style={{height: "500px"}}
              id="manual_output"
              name="manual_output"
              placeholder="Result from AI summarization..."
              value={response}
            ></textarea>
          </form>
        </div>
        
        {/* Hiding this on UI for now since now integrated well */}
        <div id="textToSynth" style={{ display: 'none' }}>
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
      </div>
    </>
  );
}

export default App
