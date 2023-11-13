import { useState } from 'react'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'
// import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';
// import 'react-h5-audio-player/lib/styles.css';
// import Popover from "react-text-selection-popover";
// import { AiFillQuestionCircle } from 'react-icons/AiFillQuestionCircle';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
//import { Popover, OverlayTrigger } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';

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
  // const help_popover = (
  //   <Popover id="help-popup" style={{ zIndex: 9999 }}>
  //       <Popover.Body>
  //           <p><b> Insert extension instructions here! </b></p>
  //       </Popover.Body>
  //   </Popover>
  //   );

  // const onResetFocus = async () => {
  //   let [tab] = await chrome.tabs.query({active: true})
  //   if (tab.url?.startsWith("chrome://")) return undefined;
  //   // This can't access React variables so need to send through Chrome API
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: () => {
  //       var focusedElements = document.querySelectorAll('.ancestor');
  //       for(var j = 0; j < focusedElements.length; j++)
  //       {
  //         //can try removing spans themselves too
  //         focusedElements[j].classList.remove('ancestor');
  //       }
  //     }
  //   });
  //   console.log("Reset!");
  // }
   
  function toggleMenu()
  {
     let subMenu = document.getElementById("subMenu");
     subMenu?.classList.toggle("open-menu");
  }

  const changeCSS = async () => {
      console.log("Triggered change CSS")
      //  let [tab] = await chrome.tabs.query({active: true})
      //  if (tab.url?.startsWith("chrome://")) return undefined;
      //  var fontSize = document.querySelector('#fontSizeSelect');
      //  var fontStyle = document.querySelector('#fontStyleSelect');
      //  var lineSpace = document.querySelector("#lineSpacingSelect");
      //  // This can't access React variables so need to send through Chrome API
      //  chrome.scripting.executeScript({
      //    target: { tabId: tab.id! },
      //     func: () => {
            
            
            
      //     }
      // });   
  }


  return (
    <>
      <div id="sidebar_container">
        <header>
          <div id='logoImage'></div>
          <h2 id='titleName'>Supportive AI Reading Assistant</h2>
          <div id='settingsIcon' onClick={toggleMenu}></div>
          <div className="hero">
           <div className = "sub-menu-wrap" id="subMenu">
             <div className ="sub-menu">
               <div className = "dropdown-font-size">

                 <label htmlFor="font-size-select">
                   Choose a Font Size:
                 </label>
                 <select className="font-size-select" onChange={changeCSS} id = "fontSizeSelect">
                   <option value="12px">12px</option>
                   <option value="20px">20px</option>
                 </select>


               </div>
               <div className="dropdown-style-select">
                 <label htmlFor="font-style-select">
                   Choose a Font Style:
                 </label>
                 <select className="font-style-select" onChange={changeCSS} id = "fontStyleSelect">
                   <option value="dyslexie">Dyslexie</option>
                   <option value="times-new-roman">Times New Roman</option>
                 </select>
               </div>
               <div className="dropdown-spacing-select">
                 <label htmlFor="line-spacing-select">
                   Choose a Line Spacing:
                 </label>
                 <select className="line-spacing-select" onChange={changeCSS} id = "lineSpacingSelect">
                   <option value="two-hundred">200%</option>
                   <option value="five-hundred">500%</option>
                 </select>
               </div>
             </div>
           </div>
          </div>
        </header>
        <div id='helpHover'>
          <span id='helpHeading'>HELP</span>
          <div id='helpTooltip'>
            Please highlight text on any webpage and right click. <br></br>
            Then, select the desired tool from the AI Reading Assistant menu!
          </div>
        </div>
        {/* <div id="resfocuscontainer">
         <Button className = "resfocus" variant="secondary" onClick={onResetFocus}>Reset Focus</Button>{' '}
       </div> */}
        <br></br>
        {/* <div>
          <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={help_popover}>
              <span style={{ cursor: 'pointer' }}>
                  <p>?</p>
              </span>
          </OverlayTrigger>
        </div> */}
        <br></br>
        
        {/* If no speech is available then hide player from user */}
        <div id='textToSpeechControls'>
          <h5 id='ttsTitle'>Text-To-Speech-Controls:</h5>
          <div id='ttsSpinner'>
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
          
          <div id="audio_container">
            {speechURL ? (
              <ReactPlayer
                url={speechURL}
                playing={true}
                controls={true}
                playbackRate={1.0} // Adjust the playback rate as needed
                width="100%"
                height="50px"
              />
            ) : (
              <h4>Utilize text-to-speech to activate player </h4>
            )}
          </div>
        </div>
        <br></br>
        <br></br>
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
        <div id='summaryOutput'>
          <h5 id='sumTitle'>Generated Summary:</h5>
          {/* Loading indicator shows when backend is processing */}
          <div id='spinner'>
            {loadingSum && (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
            )}
          </div>
          <form id='summaryForm' onSubmit={onSubmit}>
            <textarea
              id="manual_output"
              name="manual_output"
              placeholder="Result from AI summarization..."
              value={response}
            ></textarea>
            <input type="submit" value="" id="speakSumbutton" />
          </form>
        </div>
      </div>
    </>
  );
}


export default App;
