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

      // Set a variable to track whether loading indicator should be deactivated
      let shouldDeactivateLoading = true;

      // Set a timeout for 60 seconds
      const loadingTimeout = setTimeout(() => {
        // If the summaryCall hasn't returned, deactivate the loading indicator
        if (shouldDeactivateLoading) {
          setLoadingSum(false);
          console.log("Loading indicator deactivated after 60 seconds");
        }
        alert("The summary call took too long!")
      }, 60000); // 60 seconds


      summaryCall(data.value).then((value) => {
        // Clear the timeout, as the summaryCall has returned
        clearTimeout(loadingTimeout);

        setResponse(value);

        // Deactivate loading indicator only if the timeout hasn't already occurred
        shouldDeactivateLoading = false;
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

      // Set a variable to track whether loading indicator should be deactivated
      let shouldDeactivateLoading = true;

      // Set a timeout for 60 seconds
      const loadingTimeout = setTimeout(() => {
        // If the summaryCall hasn't returned, deactivate the loading indicator
        if (shouldDeactivateLoading) {
          setLoadingSpeech(false);
          console.log("Loading indicator deactivated after 60 seconds");
        }
        alert("The text-to-speech call took too long!")
      }, 60000); // 60 seconds

      speakText(data.value).then((value) => {
        // Clear the timeout, as the summaryCall has returned
        clearTimeout(loadingTimeout);

        const audioUrl = URL.createObjectURL(value!);
        setSpeechURL(audioUrl);

        // Deactivate loading indicator only if the timeout hasn't already occurred
        shouldDeactivateLoading = false;
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
    // Deprecated code!!!!!!
    console.log("IN SUMMARY SUBMIT")
    event.preventDefault();

    // Activate loading indicator 
    setLoadingSum(true)

    // Set a variable to track whether loading indicator should be deactivated
    // let shouldDeactivateLoading = true;
    console.log("Submitted summary HERE")
    // Set a timeout for 60 seconds
    
    
    summaryCall(text).then((value) => {
      console.log("IN SUMMARY SUBMIT")
      setResponse(value);
      // Deactivate loading indicator
      // Clear the timeout, as the summaryCall has returned
      // clearTimeout(loadingTimeout);
      // Deactivate loading indicator only if the timeout hasn't already occurred
      // shouldDeactivateLoading = false;
      // setLoadingSum(false)
      // console.log("The value of the text summary query is below");
      // console.log(value);
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
  function checkNeedCloseMenu(e:any)
  {
      console.log(e)
      let subMenu = document.getElementById("subMenu")
      let dropdownClicked = e.target.parentNode.className
      if(dropdownClicked !== "dropdown-style-select" && dropdownClicked !== "dropdown-font-size" && dropdownClicked !== "dropdown-spacing-select" &&
      dropdownClicked !== "sub-menu" && dropdownClicked !== "sub-menu-wrap open-menu")
      {
          if(subMenu?.classList.contains("open-menu"))
          {
            subMenu.classList.remove("open-menu")
          }
          
      }
  }
  document.body.addEventListener("click", (e) => checkNeedCloseMenu(e), false)
   
  function toggleMenu(e:any)
  {
     let subMenu = document.getElementById("subMenu");
     subMenu?.classList.toggle("open-menu");

     e.stopPropagation()
  }

  chrome.tabs.onActivated.addListener(function (activeInfo) {
    var fontSize = (document.getElementById('fontSizeSelect') as HTMLInputElement).value;
    var fontStyle = (document.getElementById('fontStyleSelect') as HTMLInputElement).value;
    var lineSpace = (document.getElementById('lineSpacingSelect') as HTMLInputElement).value;
    console.log(fontSize);
    chrome.scripting.executeScript({
      target: { tabId: activeInfo.tabId! },
      func: (fontSize, lineSpace, fontStyle) => {
         console.log(fontSize);
         document.documentElement.style.setProperty('--selected-size', fontSize);
         document.documentElement.style.setProperty('--line-spacing', lineSpace);
         document.documentElement.style.setProperty('--selected-style', fontStyle);
        
        
       },
       args: [fontSize, lineSpace, fontStyle]
   });
   
 })
 
 
 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    var fontSize = (document.getElementById('fontSizeSelect') as HTMLInputElement).value;
    var fontStyle = (document.getElementById('fontStyleSelect') as HTMLInputElement).value;
    var lineSpace = (document.getElementById('lineSpacingSelect') as HTMLInputElement).value;
    console.log(fontSize);
    if(changeInfo.status == 'complete')
    {
      chrome.scripting.executeScript({
        target: { tabId: tabId! },
        func: (fontSize, lineSpace, fontStyle) => {
           console.log(fontSize);
           document.documentElement.style.setProperty('--selected-size', fontSize);
           document.documentElement.style.setProperty('--line-spacing', lineSpace);
           document.documentElement.style.setProperty('--selected-style', fontStyle);
          
          
         },
         args: [fontSize, lineSpace, fontStyle]
     });
    }
   
 })
 
 
  //This is required for when a user makes changes right then and there on the webpage,
  //will apply it to the current webpage
  const changeCSS = async () => {
      console.log("Triggered change CSS")
       let [tab] = await chrome.tabs.query({active: true})
       if (tab.url?.startsWith("chrome://")) return undefined;
       var fontSize = (document.getElementById('fontSizeSelect') as HTMLInputElement).value;
       var fontStyle = (document.getElementById('fontStyleSelect') as HTMLInputElement).value;
       var lineSpace = (document.getElementById('lineSpacingSelect') as HTMLInputElement).value;
        console.log(fontSize);
       // This can't access React variables so need to send through Chrome API
       chrome.scripting.executeScript({
         target: { tabId: tab.id! },
          func: (fontSize, lineSpace, fontStyle) => {
            console.log(fontSize);
            document.documentElement.style.setProperty('--selected-size', fontSize);
            document.documentElement.style.setProperty('--line-spacing', lineSpace);
            document.documentElement.style.setProperty('--selected-style', fontStyle);
           
          },
          args: [fontSize, lineSpace, fontStyle]
      });  
  }
 
  return (
    <>
      <div id="sidebar_container">
        <header>
          <div id='logoImage'></div>
          <h2 id='titleName'>Supportive AI Reading Assistant</h2>
          <div id='settingsIcon' onClick={(e) => toggleMenu(e)}></div>
          <div className="hero">
           <div className = "sub-menu-wrap" id="subMenu">
             <div className ="sub-menu">
               <h2>Text Focus Features: </h2>
               <div className = "dropdown-font-size">
                 <label htmlFor="font-size-select">
                   Choose a Font Size:
                 </label>
                 <select className="font-size-select" onChange={changeCSS} id = "fontSizeSelect">
                   <option value="2vw">2vw</option>
                   <option value="3vw">3vw</option>
                 </select>
               </div>
               <div className="dropdown-style-select">
                 <label htmlFor="font-style-select">
                   Choose a Font Style:
                 </label>
                 <select className="font-style-select" onChange={changeCSS} id = "fontStyleSelect">
                   <option value="OpenDyslexic-Regular">Dyslexie</option>
                   <option value="times-new-roman">Times New Roman</option>
                 </select>
               </div>
               <div className="dropdown-spacing-select">
                 <label htmlFor="line-spacing-select">
                   Choose a Line Spacing:
                 </label>
                 <select className="line-spacing-select" onChange={changeCSS} id = "lineSpacingSelect">
                   <option value="200%">200%</option>
                   <option value="500%">500%</option>
                 </select>
               </div>
             </div>
           </div>
          </div>
        </header>
        <div id='helpContainer'>
          <div id='helpHover'>
            <span id='helpHeading'>HELP</span>
            {/* Bug #14 */}
            <div id='helpTooltip'>
              Please highlight text on any webpage and right click. <br></br>
              Then, select the desired options from the AI Reading Assistant menu!

              Summarize: Condenses selected text into digestable summary using ChatGPT
              Speak: Reads aloud selected text 
              Text Focus: Adds on custom styling for enhanced readability
              Reset Page Focus: Eliminates all custom user styling on webpage
              
            </div>
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
          <h5 id='ttsTitle'>Text-To-Speech Controls:</h5>
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
            {/* Bug #13 */}
            {response && (
              <div id='speakHover'>
                <input type="submit" value="" id="speakSumbutton" />
                <div id="speakSumTooltip">Speak Text</div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}


export default App;
