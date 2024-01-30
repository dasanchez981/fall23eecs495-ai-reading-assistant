import { useState, useEffect } from 'react'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.min.css';

// This is the main extension function that runs when it is open
function App() {
  // These are state variables used to hold relevant data for the extension
  const [text, setText] = useState(""); // used to hold the text that will be spoken or summarized
  const [audioType, setAudioType] = useState(""); // Used to print which audio type is being spoken (highlighted text or text summary)
  const [speechURL, setSpeechURL] = useState(""); // Used to store the URL of the audio file that is being spoken
  const [response, setResponse] = useState(""); // Used to store the response from the summary API call
  const [loadingSum, setLoadingSum] = useState(false); // Shows whether to display summary loading indicator
  const [loadingSpeech, setLoadingSpeech] = useState(false); // Shows whether to display speech loading indicator

  // Used to limit the number of words allowed to be input by user
  function countWords(inputString: string): number {
    // Use a regular expression to split the string into words
    const wordsArray = inputString.split(/\s+/);
    // Filter out empty strings in case there are multiple spaces between words
    const filteredWordsArray = wordsArray.filter(word => word !== '');
    // Return the length of the array, which represents the number of words
    return filteredWordsArray.length;
  }

  /* START OF HELPER FUNCTIONS */


  /* END OF HELPER FUNCTIONS

  /* START OF CONTEXT MENU FUNCTIONS */


  // Function that uses Chrome background listener to receive messages from context menu items in service-worker.js
  const messageListener = ({ name, data }: { name: string; data: any }) => {
    
    // Summary context menu item
    if (name === "summarize-text") {
      console.log("Received message to summarize from service-worker.js!");
      console.log(data);
      // TODO: Wrap up loading indicator stuff in a function
      // Activate loading indicator
      setLoadingSum(true);

      // Set a variable to track whether loading indicator should be deactivated
      let shouldDeactivateLoading = true;

      // Set a timeout for 60 seconds
      const loadingTimeout = setTimeout(() => {
        // If the summaryCall hasn't returned, deactivate the loading indicator
        if (shouldDeactivateLoading) {
          setLoadingSum(false);
          console.log("Loading indicator for summary deactivated after 60 seconds");
        }
        alert("The summary call took too long!");
      }, 60000); // 60 seconds


      // TODO: this code block resembles another code block in this file where we also have to establish a lower and upper limit on summaryCall
      const numWords = countWords(data.value);
      console.log("Number of words detected")
      console.log(numWords)
      // Establish lower and upper limit on summaryCall
      if ((numWords > 5) && (numWords < 1000)) {
        console.log("Doing a summary call");
        summaryCall(data.value).then((value) => {
          // Clear the timeout, as the summaryCall has returned
          clearTimeout(loadingTimeout);

          setResponse(value);
          console.log("The summary call returned: ");
          console.log(value);

          // Deactivate loading indiecator only if the timeout hasn't already occurred
          shouldDeactivateLoading = false;
          // Deactivate loading indicator
          setLoadingSum(false);
        });
      }
      else {
        alert("Your selected text is out of bounds at " + numWords + " words. Acceptable range is from 5 to 1000 words")
        // Clear the timeout, as the summaryCall has returned
        clearTimeout(loadingTimeout);
        // Deactivate loading indicator only if the timeout hasn't already occurred
        shouldDeactivateLoading = false;
        // Deactivate loading indicator
        setLoadingSum(false);
      }

    // Speech context menu option
    } else if (name === "text-to-speech") {
      console.log("Let's fix this");
      console.log("Received message to speak from service-worker.js!");
      console.log(data);
      // Activate loading indicator
      setLoadingSpeech(true);

      // Set a variable to track whether loading indicator should be deactivated
      let shouldDeactivateLoading = true;

      // Set a timeout for 60 seconds
      const loadingTimeout = setTimeout(() => {
        // If the summaryCall hasn't returned, deactivate the loading indicator
        if (shouldDeactivateLoading) {
          setLoadingSpeech(false);
          console.log(
            "Loading indicator for speech deactivated after 60 seconds"
          );
        }
        alert("The text-to-speech call took too long!");
      }, 60000); // 60 seconds

      // get voice selection from dropdown menu
      var voice = (document.getElementById("voiceSelect") as HTMLInputElement)
        .value; // assumes voice is either Danielle or Gregory
      var voice_type = "long-form"; // voices Danielle and Gregory require voice-type=long-form
      // if the voice type selected is Joanna or Matthew, we know its not long form
      if (voice === "Joanna" || voice === "Matthew") {
        voice_type = "neural"; // voices "Joanna" and "Matthew" require voice-type=neural
      }

      speakText(data.value, voice, voice_type).then((value) => {
        // Clear the timeout, as the summaryCall has returned
        clearTimeout(loadingTimeout);

        const audioUrl = URL.createObjectURL(value!);
        setSpeechURL(audioUrl);

        // Deactivate loading indicator only if the timeout hasn't already occurred
        shouldDeactivateLoading = false;
        // Deactivate loading indicator
        setLoadingSpeech(false);
        setAudioType("Speaking highlighted text...");
        console.log("The url of the speak text query is below");
        console.log(value);
      });

      // Text focus context menu option
    } else if (name === "text-focus") {
      console.log("Received message to focus text from service-worker.js!");
      console.log(data);
    }
  };

  // Ensure that this only adds a listener once to the receiver function messageListener
  useEffect(() => {
    // Ensure listener only added once
    if (!chrome.runtime.onMessage.hasListener(messageListener)) {
      console.log("Adding listener to message function")
      // Add listener defined above
      chrome.runtime.onMessage.addListener(messageListener);
    }

    // Clean up the listener when the component unmounts
    return () => {
      console.log("Removing listener from message function");
      chrome.runtime.onMessage.removeListener(messageListener);
    };

  }, []); // Empty dependency array ensures the effect runs only once the component mounts

  /* END OF CONTEXT MENU FUNCTIONS
  
  /* MANUAL INPUT FUNCTIONS BELOW */

  // Function to handle manual input summaries
  const handleSumSubmit = (e: any) => {
    e.preventDefault();
    // Activate loading indicator
    setLoadingSum(true);

    // Set a variable to track whether loading indicator should be deactivated
    let shouldDeactivateLoading = true;

    // Set a timeout for 60 seconds
    const loadingTimeout = setTimeout(() => {
      // If the summaryCall hasn't returned, deactivate the loading indicator
      if (shouldDeactivateLoading) {
        setLoadingSum(false);
        console.log("Loading indicator for summary deactivated after 60 seconds");
      }
      alert("The summary call took too long!");
    }, 60000); // 60 seconds

    // TODO: This is duplicated code from line 55
    const numWords = countWords(text);
    console.log("Number of words detected")
    console.log(numWords)
    // Establish lower and upper limit on summaryCall
    if ((numWords > 5) && (numWords < 1000)) {
      console.log("Doing a summary call");
      summaryCall(text).then((value) => {
        // Clear the timeout, as the summaryCall has returned
        clearTimeout(loadingTimeout);

        setResponse(value);
        console.log("The summary call returned: ");
        console.log(value);

        // Deactivate loading indicator only if the timeout hasn't already occurred
        shouldDeactivateLoading = false;
        // Deactivate loading indicator
        setLoadingSum(false);
      });
    }
    else {
      alert("Your selected text is out of bounds at " + numWords + " words. Acceptable range is from 5 to 1000 words")
      // Clear the timeout, as the summaryCall has returned
      clearTimeout(loadingTimeout);
      // Deactivate loading indicator only if the timeout hasn't already occurred
      shouldDeactivateLoading = false;
      // Deactivate loading indicator
      setLoadingSum(false);
    }

    
  };

  // Function to handle manual text to speech
  const handleTTSSubmit = (e: any) => {
    e.preventDefault();
    // Activate loading indicator 
    setLoadingSpeech(true)

    // TODO: Wrap voice stuff in a function
    // Gets voice selection from drop down menu
    var voice = (document.getElementById('voiceSelect') as HTMLInputElement).value;
    var voice_type = "long-form";
    if(voice === "Joanna" || voice === "Matthew")
    {
      voice_type = "neural";
    }
    if (e.nativeEvent.submitter.id === "speakbutton") {
      speakText(text, voice, voice_type).then((value) => {
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
      speakText(response, voice, voice_type).then((value) => {
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

  // Function to handle any manual input and direct to proper function 
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("inside onSubmit")

    console.log(e.nativeEvent.submitter.id);
    // Direct to TTSSubmit function
    if (
      e.nativeEvent.submitter.id === "speakbutton" ||
      e.nativeEvent.submitter.id === "speakSumbutton"
    ) {
      handleTTSSubmit(e);
    // Direct to SumSubmit function
    } else if (e.nativeEvent.submitter.id === "sumbutton") {
      handleSumSubmit(e);
    }
  };

  const toggleManual = async () => {
    console.log("Toggling manual input");
    let title = document.getElementById("manualTitle");
    let button = document.getElementById(
      "toggleManualButton"
    ) as HTMLInputElement;
    if (
      document.getElementById("manualForm")?.style.display == "" ||
      document.getElementById("manualForm")?.style.display == "none"
    ) {
      document
        .getElementById("manualForm")
        ?.style.setProperty("display", "grid");
      document
        .getElementById("manualGrid")
        ?.style.setProperty("grid-template-rows", "0.5fr 5fr");
      document.documentElement.style.setProperty("min-height", "950px");
      if (title != undefined) {
        title.textContent = "Manually Input Text: ";
      }
      if (button != undefined) {
        button.value = "ON";
      }
    } else if (document.getElementById("manualForm")?.style.display == "grid") {
      document
        .getElementById("manualForm")
        ?.style.setProperty("display", "none");
      document
        .getElementById("manualGrid")
        ?.style.setProperty("grid-template-rows", "1fr");
      document.documentElement.style.setProperty("min-height", "fit-content");

      if (title != undefined) {
        title.textContent = "Toggle Manual Input: ";
      }
      if (button != undefined) {
        button.value = "OFF";
      }
    }
  };

  /* END OF MANUAL INPUT FUNCTIONS */
  
  /* START OF FUNCTIONS RELATED TO SETTINGS MENU IMPLEMENTATION */
 
  // Checks whether a click occurs outside of the drop down menu, and closes the menu if it does
  function checkNeedCloseMenu(e:any)
  {
      let subMenu = document.getElementById("subMenu")
      let dropdownClicked = e.target.parentNode.className
      if(dropdownClicked !== "dropdown-style-select" && dropdownClicked !== "dropdown-font-size" && dropdownClicked !== "dropdown-spacing-select" &&
      dropdownClicked !== "sub-menu" && dropdownClicked !== "sub-menu-wrap open-menu" && dropdownClicked !== "dropdown-voice-select")
      {
          if(subMenu?.classList.contains("open-menu"))
          {
            subMenu.classList.remove("open-menu")
          }
          
      }
  }

  // Adds a click listener to the entire document, so that we can close the menu if clicked outside menu
  document.body.addEventListener("click", (e) => checkNeedCloseMenu(e), false)
   
  function toggleMenu(e:any)
  {
     let subMenu = document.getElementById("subMenu");
     subMenu?.classList.toggle("open-menu");

     e.stopPropagation()
  }

  // Whenever a tab is open with extension sets CSS styling based on settings menu options
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
 
 // Adds a listener for when a new URL is navigated to in a tab
 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  // Get options from settings menu
    var fontSize = (document.getElementById('fontSizeSelect') as HTMLInputElement).value;
    var fontStyle = (document.getElementById('fontStyleSelect') as HTMLInputElement).value;
    var lineSpace = (document.getElementById('lineSpacingSelect') as HTMLInputElement).value;
    console.log(fontSize);
    // Insert CSS text focus settings into the new website in the tab
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
 
 
  // Handles changing of text focus settings while on current active webpage
  const changeCSS = async () => {
      console.log("Triggered change CSS")
       let [tab] = await chrome.tabs.query({active: true})
       if (tab.url?.startsWith("chrome://")) return undefined;
       // Get options from settings menu
       var fontSize = (document.getElementById('fontSizeSelect') as HTMLInputElement).value;
       var fontStyle = (document.getElementById('fontStyleSelect') as HTMLInputElement).value;
       var lineSpace = (document.getElementById('lineSpacingSelect') as HTMLInputElement).value;
        console.log(fontSize);
       // This can't access React variables so need to send through Chrome API
       // Insert new values for CSS variables into the webpage
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
  /* END OF SETTINGS MENU FUNCTIONS */
  
  return (
    <>
      <div id="sidebar_container">
        <header>
          <div id='logoImage'></div>
          <h2 id='titleName'>Supportive AI Reading Assistant</h2>
          <div id='settingsIcon' onClick = {toggleMenu}></div>
          <div className="hero">
           <div className = "sub-menu-wrap" id="subMenu">
             <div className ="sub-menu">
               <h2>Text Focus Options: </h2>
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
               <h2>Text-to-Speech Voice:</h2>
               <div className="dropdown-voice-select">
                 <label htmlFor="voice-select">
                   Choose a Voice:
                 </label>
                 <select className="voice-select" onChange={changeCSS} id = "voiceSelect">
                   <option value="Danielle">Danielle</option>
                   <option value="Joanna">Joanna</option>
                   <option value="Matthew">Matthew</option>
                   <option value="Gregory">Gregory</option>
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
              Then, select the desired options from the AI Reading Assistant menu!<br></br>
              -------------------------------------<br></br>
              <strong>Summarize:</strong> Condenses selected text into digestable summary using ChatGPT<br></br>
              -------------------------------------<br></br>
              <strong>Speak:</strong> Reads aloud selected text <br></br>
              -------------------------------------<br></br>
              <strong>Text Focus:</strong> Adds on custom styling for enhanced readability<br></br>
              -------------------------------------<br></br>
              <strong>Reset Page Focus:</strong> Eliminates all custom user styling on webpage
              
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
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
        <div id='manualGrid'>
          <h5 id='manualTitle'>Toggle Manual Input:</h5>
          <input type="button" id='toggleManualButton' onClick={toggleManual} value="OFF"></input>
            <form id='manualForm' onSubmit={onSubmit}>
              <input type="submit" value="Speak Text" id="speakbutton" />
              <input type="submit" value="Summarize" id="sumbutton" />

              <textarea
                id="manual_input"
                name="manual_input"
                placeholder="Input your text to Speak/Summarize..."
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
