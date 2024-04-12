import { useState, useEffect } from 'react'
import './App.css'
import { summaryCall } from './components/SummaryCall'
import { speakText } from './components/SpeakText'
import { karaokeText } from './components/GetKaraoke'
import ReactPlayer from 'react-player';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// This is the main extension function that runs when it is open
function App() {
  // const welcome_message = "https://polly.us-east-1.amazonaws.com/v1/speech?Engine=long-form&OutputFormat=mp3&SampleRate=16000&Text=Welcome%20to%20Supportive%20AI%20Reading%20Assistant%21%20We%20hope%20you%20enjoy%20using%20this%20extension%21&TextType=text&VoiceId=Danielle&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVYPXJS5YPU3J5ZSO%2F20240405%2Fus-east-1%2Fpolly%2Faws4_request&X-Amz-Date=20240405T173413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIC4ENIsHwRQQ1yz3pCjgTICFwILxS7LfR3nSIFSDhXq2AiEA%2BPcMNwKC44kpPUSTRf8%2FQo3CiviF3NksEY0RxnUXm60q0AUIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwzOTYxOTI0ODcyODAiDHF86gjJC%2BniFZxIRSqkBagoIUxRP2%2FIXKVQ%2FtvFb3ZtEhSXX22JcgOH11WnuJLf8tlksoqOThzc2McLim6GhjPhY2d2JL5HLY7Vc6xgPe9LsnmvjP%2FX3uEYjP4NSAoukMiqDkLIPp17Hv4%2BUVrUB4zJIDfQOPwv%2FnRD0sRGKsnB02jhnuwIbw6Z8rrZV1jcqHnS8NtiO0x13NkQI%2BQjnIAVVr%2FjdYpDemGJPQWW1%2Fwto5rMae4P%2Bi2aWDFTpTwePUOJOk1jh4Pfk8w8wG4ZTLkeTRYexMjQ7YTLVUXfwbR46GwEo6CwzFIxBpzREJ6vWRPkmM65pDk1hNlVgoiH1HWW2vp9vvE1JR5bjX1pp037g4WqOg5LUFzltyIwqkD%2BT9xpBiqiFohEuTn7Etxm62nIuNSwGqGjCdOCsscuBof3lxnXqOw3KSVTfB7FeVYpyPqKD1nGVtchOqMHLhPje9PJzQncsRD7A997UH7GGLlCXdcbM0TLwdTPJRrcN%2B%2F%2FVXM%2Bg0iT3T8pgG2%2FUtxiMi9L90RalriwxRyvXUDn%2B9ryfS48bz8eMHO3Z1b6bKJoaVCtfB3gOP4jDMn0gtWnSj3bIcUWok%2B3Adj694%2FWq%2FYDNzyOyT5blvPevZh8UIK5kzim%2FtQi%2FRpogk%2BD04a6QZS6BZOWeAiCvAY88s1vyrBoQJwERPrizNq572seXc69TdoT%2Fn%2FvBi3q6oc0vHAGG2omgaGmPATnaah7ccyVc8npeluu4d5NbHBmQ0bb3lnP6ebPz4Atm3qEcgghru%2FpNLELGfEeQ61vn1CdnvSsVIOL1t1IaNnFRTWpbShOQ1J0YT%2B9dkUE5pPrb7fEOPj5qWi1hmwDQS3pNjobGAOLHfGp3xIa7dV51qWMtuePtoODAqmblYLvsg7KzvLCvDfhJD5QQKYwlezAsAY63wIP3C%2Bbx%2BtjebkaJmj7fEDm8s6L8eeCeC42Uv1OKZqxIXjoTZgDfokT8A%2F02t%2BE60nEe%2F1rbs%2FeKJUzAJifiOKnl%2B1FJ6H8XsnUdVZbZD6nrIxL68TAwtRl4OBghpBn65Yf1iuv1ll72NQIGX4lzOemEH54Q2U1O7b3R%2BL%2FWuiorAWywPTkQkGCy7HkWH56SSeYbSuBKzNJsjSO5P87iY7TufJn1aWQPgxEMqisI7PfypgWeYFw8ubZ8pw4Uxfw%2BR19%2FBjMgnjnPjXqY3MzmJGVhbeq85k1OdLMC1mCxNazoDG33tRxrfykdJ3yTyYSE1WWYhacesGe5M8OJxW0nEzFJPGKPp60zIwss8%2Fr1jb2Gj5wgC1VrUyoB29I%2BnNMrtpsj6z8Tc1HllnjkiOShke55ja1jBPs93itw1u3mo7VGagclfIrG5rugU4Z%2F6ft9GUJG%2BS0NPAXmQ0rX2gMY20%3D&X-Amz-Signature=a53258dd1fb45d3f5b480a74b0854d8cfe58da30504bd5ac39597ad30c417648&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.427.0%20ua%2F2.0%20os%2FmacOS%2310.15.7%20lang%2Fjs%20md%2Fbrowser%23Chrome_123.0.0.0%20api%2Fpolly%233.427.0"
 

  // These are state variables used to hold relevant data for the extension
  const [text, setText] = useState(""); // used to hold the text that will be spoken or summarized
  const [audioType, setAudioType] = useState(""); // Used to print which audio type is being spoken (highlighted text or text summary)
  const [speechURL, setSpeechURL] = useState(""); // Used to store the URL of the audio file that is being spoken
  const [response, setResponse] = useState(""); // Used to store the response from the summary API call
  const [customSum, setCustomSum] = useState("");
  const [customSumText, setCustomSumText] = useState("");
  const [loadingSum, setLoadingSum] = useState(false); // Shows whether to display summary loading indicator
  const [loadingSpeech, setLoadingSpeech] = useState(false); // Shows whether to display speech loading indicator

  const [welcomeMessageStatus, setWelcomeMessageStatus] = useState(false);

  // TODO: eliminate audioType state variable
  console.log(audioType)
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

  function startLoadingIndicator(name: string) {
    // TODO: Wrap up loading indicator stuff in a function
    // // Activate loading indicator
    if (name === "summarize-text")
    {
      setLoadingSum(true);
    }
    else if (name === "text-to-speech") {
      setLoadingSpeech(true);
    }
   

    // Set a variable to track whether loading indicator should be deactivated
    // let shouldDeactivateLoading = true;

    // Set a timeout for 60 seconds
    const loadingTimeout = setTimeout(() => {
      // If the summaryCall hasn't returned, deactivate the loading indicator
      if (name === "summarize-text")
      {
        setLoadingSum(false);
      }
      else if (name === "text-to-speech") {
        setLoadingSpeech(false);
      }
      
      console.log("Loading indicator for summary deactivated after 60 seconds");
      // if (shouldDeactivateLoading) {
      //   setLoadingSum(false);
      //   console.log("Loading indicator for summary deactivated after 60 seconds");
      // }
      // Pause for 5 seconds before showing the alert
      setTimeout(() => {
        alert("The summary call took too long!");
      }, 1000); // 1000 milliseconds = 1 seconds
    }, 60000); // 60 seconds (60000)

    return loadingTimeout
  }

  function stopLoadingIndicator(name:string, loadingTimeout: NodeJS.Timeout) {
    // Clear the timeout, as the summaryCall has returned
    clearTimeout(loadingTimeout);
    // Deactivate loading indicator
    if (name === "summarize-text")
    {
      setLoadingSum(false);
    }
    else if (name === "text-to-speech") {
      setLoadingSpeech(false);
    }
  }

  /* END OF HELPER FUNCTIONS

  //Karaoke stuff */
  async function activateKaraoke(urlString:any)
  {
    let requestOptions: RequestInit = {
      method: 'GET',
      //headers: myHeaders,
      redirect: 'follow'
    };
    console.log("IN ACTIVATE KARAOKE");
    let json = '';
    let [tab] = await chrome.tabs.query({active: true})
    if (tab.url?.startsWith("chrome://")) return undefined;
    fetch(urlString, requestOptions)
      .then(response => response.text())
      .then(result => {
        //console.log("Here da good stuff");
        //console.log("speechmarks", result);
        json = result;
      chrome.scripting.executeScript({
      target: { tabId: tab.id! },
       func: (json) => {
        //take away karaoke id from previously created span so it
        //doesnt mess with the current span
        console.log("HERE ARE THE SPEECHMARKS");
        console.log(json);
        console.log("I GOT HERE");
        var prevSpan = document.getElementById("karaoke") as HTMLElement;
        
        if(prevSpan != null)
        {
          prevSpan.removeAttribute('id');
        }
         var selection = window.getSelection()?.getRangeAt(0);
         var selectedText = selection?.extractContents();
         console.log(selectedText!.textContent);
         var span = document.createElement("textarea");
         if(selectedText!.textContent != null)
         {
            span.innerHTML = selectedText!.textContent;
            span.style.width = "100%";
            span.style.height = "100px";
         }
         span.id = "karaoke";
         //span.style.backgroundColor = "yellow";
        //  if(selectedText)
        //  {
        //   span.appendChild(selectedText);
        //  }
        //  else {
        //   console.log('ERROR');
        //  }
         selection?.insertNode(span);
         
         function highlighter(start : any, finish : any/*, word : any*/) {
          let textarea = document.getElementById("karaoke") as HTMLInputElement;
          console.log(start + "," + finish + ",");
          textarea!.focus();
          textarea!.setSelectionRange(start, finish);
        }

         function setTimers() {
            //read through the speechmarks file and set timers for every word
            console.log(json);
            let speechmarks = json.split("\n");
            for (let i = 0; i < speechmarks.length; i++) {
            console.log(i + ":" + speechmarks[i]);
              if (speechmarks[i].length == 0) {
                continue;
              }
                console.log(speechmarks[i]);
                let smjson = JSON.parse(speechmarks[i]);
                let t = smjson["time"];
                let s = smjson["start"];
                let f = smjson["end"];
                //let word = smjson["value"];
                setTimeout(highlighter, t, s, f/*, word*/);
            }

          }
          setTimers();
        
       },
       args: [json]
   }); 

      })
      .catch((error) => {
        console.error('Error fetching or parsing data:', error);
      });
  }
  

  /* START OF CONTEXT MENU FUNCTIONS */

  // Function that uses Chrome background listener to receive messages from context menu items in service-worker.js
  const messageListener = ({ name, data }: { name: string; data: any }) => {
    
    // Summary context menu item
    if (name === "summarize-text") {
      console.log("Received message to summarize from service-worker.js!");
      console.log(data);
      const timer = startLoadingIndicator(name)

      // TODO: this code block resembles another code block in this file where we also have to establish a lower and upper limit on summaryCall
      const numWords = countWords(data.value);
      console.log("Number of words detected")
      console.log(numWords)
      // Establish lower and upper limit on summaryCall
      if ((numWords > 5) && (numWords < 1000)) {
        console.log("Doing a summary call");
        
        // I think its because it's wihtin this function
        // Fetch customSum from chrome.storage.local
        // let customSumBruh = "";
  
        chrome.storage.local.get(['customSum'], (result) => {
          if (result.customSum !== undefined) {
            // Use set customization
            const customSumBruh = result.customSum.toString();

            // Use customSumFromStorage as needed
            console.log('customSum fetched from chrome.storage.local:', customSumBruh);
            summaryCall(customSumBruh,data.value).then((value) => {
              setResponse(value);
              console.log("The summary call returned: ");
              console.log(value);
              stopLoadingIndicator(name, timer)
            });
          }
          else {
            // No customization needed
            summaryCall("",data.value).then((value) => {
              setResponse(value);
              console.log("The summary call returned: ");
              console.log(value);
              stopLoadingIndicator(name, timer)
            });
          } 
        });
        
        // stopLoadingIndicator(name, timer)
      }
      else {
        stopLoadingIndicator(name, timer)
        alert("Your selected text is out of bounds at " + numWords + " words. Acceptable range is from 5 to 1000 words")
      }

    // Speech context menu option
    } else if (name === "text-to-speech") {
      console.log("Received message to speak from service-worker.js!");
      console.log(data);
      setWelcomeMessageStatus(false);
      const timer = startLoadingIndicator(name)

      // get voice selection from dropdown menu
      var voice = (document.getElementById("voiceSelect") as HTMLInputElement)
        .value; // assumes voice is either Danielle or Gregory
      var voice_type = "long-form"; // voices Danielle and Gregory require voice-type=long-form
      // if the voice type selected is Joanna or Matthew, we know its not long form
      if (voice === "Joanna" || voice === "Matthew" || voice === "Joanna (News)" || voice === "Matthew (News)") {
        voice_type = "neural"; // voices "Joanna" and "Matthew" require voice-type=neural
      }
      
      speakText(data.value, voice, voice_type).then((value) => {
        // Important, creates URL from object
        const audioUrl = URL.createObjectURL(value!);
        console.log("Look here now!")
        console.log(audioUrl);
        setSpeechURL(audioUrl);
        
        stopLoadingIndicator(name, timer)
        setAudioType("🗣️");
        console.log("The url of the speak text query is below");
        console.log(value);
      });
      karaokeText(data.value, voice, voice_type).then((url) => {
        console.log("TRIGGERING ACTIVATE KARAOKE");
        activateKaraoke(url);
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
    const timer = startLoadingIndicator("summarize-text"); 

    // TODO: This is duplicated code from line 55
    const numWords = countWords(text);
    console.log("Number of words detected")
    console.log(numWords)
    // Establish lower and upper limit on summaryCall
    if ((numWords > 5) && (numWords < 1000)) {
      console.log("Doing a summary call");

      summaryCall(customSum,text).then((value) => {
        setResponse(value);
        console.log("The summary call returned: ");
        console.log(value);
        stopLoadingIndicator("summarize-text", timer);
        
      });
    }
    else {
      stopLoadingIndicator("summarize-text", timer);
      alert("Your selected text is out of bounds at " + numWords + " words. Acceptable range is from 5 to 1000 words")
    }

    
  };

  // Function to handle manual text to speech
  const handleTTSSubmit = (e: any) => {
    e.preventDefault();
    // Activate loading indicator 
    const timer = startLoadingIndicator("text-to-speech");

    // TODO: Wrap voice stuff in a function
    // Gets voice selection from drop down menu
    var voice = (document.getElementById('voiceSelect') as HTMLInputElement).value;
    var voice_type = "long-form";
    if (voice === "Joanna" || voice === "Matthew" || voice === "Joanna (News)" || voice === "Matthew (News)")
    {
      voice_type = "neural";
    }
    if (e.nativeEvent.submitter.id === "speakbutton") {
      speakText(text, voice, voice_type).then((value) => {
        //activateKaraoke();
        const audioUrl = URL.createObjectURL(value!);
        setSpeechURL(audioUrl);
        // Deactivate loading indicator
        stopLoadingIndicator("text-to-speech", timer);
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
        stopLoadingIndicator("text-to-speech", timer);
        setAudioType("Speaking text summary...");
        console.log("The url of the speak summary text query is below");
        console.log(value);
      });
    }
  };
  // Consider custom summary for manual input
  const handleCustomSum = (e: any) => {
    e.preventDefault();
    // Set the value of customSum using setCustomSum
    console.log(e)
    console.log("Inside custom summary")
    const newSum = customSumText
    setCustomSum(newSum)
    console.log("Text that user wants:")
    console.log(customSumText)
    chrome.storage.local.set({ customSum: customSumText })
    console.log({ customSum: customSumText })
    console.log("Set customSum in Chrome local storage")
    // console.log(customSum)
    // Set the value of customSum using setCustomSum
    // setCustomSum(value);
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
    else if (e.nativeEvent.submitter.id === "custSumButton") {
      handleCustomSum(e);
    }
  };

  // const toggleManual = async () => {
  //   console.log("Toggling manual input");
  //   let title = document.getElementById("manualTitle");
  //   let button = document.getElementById(
  //     "toggleManualButton"
  //   ) as HTMLInputElement;
  //   if (
  //     document.getElementById("manualForm")?.style.display == "" ||
  //     document.getElementById("manualForm")?.style.display == "none"
  //   ) {
  //     document
  //       .getElementById("manualForm")
  //       ?.style.setProperty("display", "grid");
  //     document
  //       .getElementById("manualGrid")
  //       ?.style.setProperty("grid-template-rows", "0.5fr 5fr");
  //     document.documentElement.style.setProperty("min-height", "950px");
  //     if (title != undefined) {
  //       title.textContent = "Manually Input Text: ";
  //     }
  //     if (button != undefined) {
  //       button.value = "ON";
  //     }
  //   } else if (document.getElementById("manualForm")?.style.display == "grid") {
  //     document
  //       .getElementById("manualForm")
  //       ?.style.setProperty("display", "none");
  //     document
  //       .getElementById("manualGrid")
  //       ?.style.setProperty("grid-template-rows", "1fr");
  //     document.documentElement.style.setProperty("min-height", "fit-content");

  //     if (title != undefined) {
  //       title.textContent = "Toggle Manual Input: ";
  //     }
  //     if (button != undefined) {
  //       button.value = "OFF";
  //     }
  //   }
  // };

  /* END OF MANUAL INPUT FUNCTIONS */
  
  /* START OF FUNCTIONS RELATED TO SETTINGS MENU IMPLEMENTATION */
 
  // Checks whether a click occurs outside of the drop down menu, and closes the menu if it does
  function checkNeedCloseMenu(e:any)
  {
      let subMenu = document.getElementById("subMenu")
      let dropdownClicked = e.target.parentNode.className
      if(dropdownClicked !== "dropdown-style-select" && dropdownClicked !== "dropdown-font-size" && dropdownClicked !== "dropdown-spacing-select" &&
      dropdownClicked !== "sub-menu" && dropdownClicked !== "sub-menu-wrap open-menu" && dropdownClicked !== "dropdown-voice-select" 
      && dropdownClicked !== "switch-container" && dropdownClicked !== "dropdown-copypaste-select")
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

  // function customizeInput(e:any)
  // {
  //   let customMenu = document.getElementById("customizeMenu");
  //   customMenu?.classList.toggle("open-menu");

  //   e.stopPropagation()
  // }

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

      // Alter visibility of manualGrid id
      console.log("Trying to get whole element")
      var manualGridElement = document.getElementById('manualGrid')
      console.log(manualGridElement)
      var manualGridStatus = (document.getElementById('copyPasteSelect') as HTMLInputElement).value;
      console.log("Tryig to get status of manual grid")
      console.log(manualGridStatus)
      // Check if manualGridElement is defined and not null
      if (manualGridElement && manualGridStatus === 'Hide') {
        // Set visibility to 'hidden' if it's currently 'visible'
        manualGridElement.style.visibility = 'hidden';
        manualGridElement.style.maxHeight = '0px';
      } else if (manualGridElement && manualGridStatus === 'Show'){
        // Set visibility to 'visible' if it's not 'visible' or manualGridElement is undefined/null
        manualGridElement.style.visibility = 'visible';
        manualGridElement.style.maxHeight= 'fit-content';
      }


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

  /* START OF SAVING TO LOCAL STORAGE STUFF */

  // Function to load settings menu values from chrome.storage.local
  const loadOptionsFromStorage = () => {
    chrome.storage.local.get(['fontSize', 'fontStyle', 'lineSpacing', 'voice'], (result) => {
      // Update state variables with values from storage
      const fontSizeSelect = document.getElementById('fontSizeSelect') as HTMLSelectElement | null;
      const fontStyleSelect = document.getElementById('fontStyleSelect') as HTMLSelectElement | null;
      const lineSpacingSelect = document.getElementById('lineSpacingSelect') as HTMLSelectElement | null;
      const voiceSelect = document.getElementById('voiceSelect') as HTMLSelectElement | null;

      fontSizeSelect!.value = result.fontSize || '2vw';
      fontStyleSelect!.value = result.fontStyle || 'OpenDyslexic-Regular';
      lineSpacingSelect!.value = result.lineSpacing || '200%';
      voiceSelect!.value = result.voice || 'Danielle';

      // Update the selected options in the settings menu dropdowns
      
    });  
  };

  // Define the function to save options
  const saveOptions = () => {
    const fontSize = (document.getElementById('fontSizeSelect') as HTMLSelectElement).value;
    const fontStyle = (document.getElementById('fontStyleSelect') as HTMLSelectElement).value;
    const lineSpacing = (document.getElementById('lineSpacingSelect') as HTMLSelectElement).value;
    const voice = (document.getElementById('voiceSelect') as HTMLSelectElement).value;
    // Adding customSum option
    const customSum = ""

    const options = {
      fontSize,
      fontStyle,
      lineSpacing,
      voice,
      customSum
    };

    // Save options to local storage
    chrome.storage.local.set(options, () => {
      console.log('Options saved:', options);
    });
  };

  // useEffect hook to add event listeners when the component mounts
  useEffect(() => {
    loadOptionsFromStorage();
    
    document.getElementById('fontSizeSelect')?.addEventListener('change', saveOptions);
    document.getElementById('fontStyleSelect')?.addEventListener('change', saveOptions);
    document.getElementById('lineSpacingSelect')?.addEventListener('change', saveOptions);
    document.getElementById('voiceSelect')?.addEventListener('change', saveOptions);

    

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      document.getElementById('fontSizeSelect')?.removeEventListener('change', saveOptions);
      document.getElementById('fontStyleSelect')?.removeEventListener('change', saveOptions);
      document.getElementById('lineSpacingSelect')?.removeEventListener('change', saveOptions);
      document.getElementById('voiceSelect')?.removeEventListener('change', saveOptions);
    };
  }, []); // Empty dependency array to ensure this effect runs only once on mount
  /* END OF LOCAL CHROME SAVING STUFF */

  // Generate Welcome Message
  useEffect(() => {
    const welcome_message = "Welcome to Supportive AI Reading Assistant. We hope you enjoy using this extension!"

    // Initial call to speakText with welcome message, hardcode parameters for now
    //
    // Not using setSpeechURL bc we want speechURL to be initialized to 
    // the welcome message and we need that to be set so the audio player
    // loads correctly
    speakText(welcome_message,"Danielle","long-form").then((value) => {
      // Important, creates URL from object
      const welcomeURL = URL.createObjectURL(value!);
      console.log("Look here now for welcomeURL!")
      console.log(welcomeURL);
      setSpeechURL(welcomeURL);
      setWelcomeMessageStatus(true);
    });
  }, []); // Empty dependency array to ensure this effect runs only once on mount


  console.log("The speech URL is below:")
  console.log(speechURL)

  /* ALL ZE HELP POPOVERS ARE BELOW YO */

   // Tooltip next to 'I want questions for a ...' to help users 
   const audio_help_popover = (
    <Popover id="help-popup">
        <Popover.Body>
            <p><b> 
              <strong>All narrated text is loaded into this audio player.</strong>
              <br></br>
              <br></br>
              Simply press the play button to listen and click the three dots 
              at the end for more audio options. 
            </b></p>
        </Popover.Body>
    </Popover>
    );

    const sum_help_popover = (
      <Popover id="help-popup">
        <Popover.Body>
            <p><b> 
              <strong>After summarizing text, the summary will appear in the textbox below</strong>
              <br></br>
              <br></br>
              If you'd like to customize your summary, for example, to be in bullet points or another form, 
              then hover over the "Customize" button and specify how you'd like your summary to be customized in the 
              textbox that appears. 
            </b></p>
        </Popover.Body>
    </Popover>
    );

    const copypaste_help_popover = (
      <Popover id="help-popup">
        <Popover.Body>
            <p><b> 
              <strong>Copy/paste text into the textbox below. </strong>
              <br></br>
              <br></br>
              Use this form as an alternative to the context menu options. Text in the box below can be summarized or spoken. 
            </b></p>
        </Popover.Body>
    </Popover>
    );

    const customize_popover = (
      <Popover id="help-popup">
        <Popover.Body>
            <p><b> 
              <strong> Customize your summary!  </strong>
              <br></br>
              <br></br>
              Use this form to customize your summary to your needs. Text in the box below can be summarized or spoken. 
            </b></p>
            <form id='customizeSummaryForm' onSubmit={onSubmit}>
                <input type="submit" value="Apply" id="custSumButton" />
                <textarea
                  id="customize_summary"
                  name="customize_summary"
                  placeholder="For example, try saying &quot;Put the summary into bullet points&quot;..."
                  value={customSumText}
                  onChange={(e) => setCustomSumText(e.target.value)}
                ></textarea>   
            </form>
        </Popover.Body>
    </Popover>
    )

  
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
               <h2>Settings: </h2>
               <div className = "dropdown-font-size">
                 <label htmlFor="font-size-select">
                   Font Size:
                 </label>
                 <select className="font-size-select" onChange={changeCSS} id = "fontSizeSelect">
                   <option value="2vw">2vw</option>
                   <option value="3vw">3vw</option>
                  </select>
               </div>
               <div className="dropdown-style-select">
                 <label htmlFor="font-style-select">
                   Font Style:
                 </label>
                 <select className="font-style-select" onChange={changeCSS} id = "fontStyleSelect">
                   <option value="OpenDyslexic-Regular">OpenDyslexic-Regular</option>
                   <option value="times-new-roman">Times New Roman</option>
                 </select>
               </div>
               <div className="dropdown-spacing-select">
                 <label htmlFor="line-spacing-select">
                   Line Spacing:
                 </label>
                 <select className="line-spacing-select" onChange={changeCSS} id = "lineSpacingSelect">
                   <option value="200%">200%</option>
                   <option value="500%">500%</option>
                 </select>
               </div>
               {/* <h2>Text-to-Speech Voice:</h2> */}
               <div className="dropdown-voice-select">
                 <label htmlFor="voice-select">
                   Text-to-Speech Voice:
                 </label>
                 <select className="voice-select" onChange={changeCSS} id = "voiceSelect">
                   <option value="Danielle">Danielle</option>
                   <option value="Joanna">Joanna</option>
                   <option value="Matthew">Matthew</option>
                   <option value="Joanna (News)">Joanna (News)</option>
                   <option value="Matthew (News)">Matthew (News)</option>
                   <option value="Gregory">Gregory</option>
                 </select>
               </div>

               <div className="dropdown-copypaste-select">
                  <label htmlFor="copypaste-select">
                    Copy/Paste
                  </label>
                  {/* <Form id="switch_container">
                    <Form.Check type="switch" id='toggleManualButton' onChange={changeCSS} label={<h5>Copy/Paste</h5>}/>
                  </Form> */}
                  <select className="copypaste-select" onChange={changeCSS} id = "copyPasteSelect">
                   <option value="Hide">Hide</option>
                   <option value="Show">Show</option>
                   
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
        
        {/* If no speech is available then hide player from user */}
        <div id='textToSpeechControls'>
          <div className="read-aloud">
              <h5 id='ttsTitle'>Read Aloud:</h5>
              <OverlayTrigger trigger={["hover", "focus"]} overlay={audio_help_popover}>
              <span style={{ cursor: 'pointer' }}>
                <InfoCircle className="info-icon" size={24} /> {/* Adjust size as needed */}
              </span>
            </OverlayTrigger>
          </div>

          <div id='ttsSpinner'>
          {loadingSpeech ? (
              <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
              </div>
          ) : (
              welcomeMessageStatus ? (

                <div id="welcomeIndicator"> </div>

              ) : (
                  // Your code for when loadingSpeech is false and speechURL is not empty
                  // For example:
                  <div id="audioIndicator"> </div>
              )
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
              <h3>Welcome!</h3>
            )}
          </div>
        </div>
        <br></br>
        <div id='manualGrid'>
          <div className="read-aloud">
            <h5 id='manualTitle'>Copy/Paste:</h5>
            <OverlayTrigger trigger={["hover", "focus"]} overlay={copypaste_help_popover}>
                <span style={{ cursor: 'pointer' }}>
                  <InfoCircle className="info-icon" size={24} /> {/* Adjust size as needed */}
                </span>
              </OverlayTrigger>
          </div>
          {/* <Form id="switch_container">
            <Form.Check type="switch" id='toggleManualButton' onChange={toggleManual} label={<h5>Copy/Paste</h5>}/>
          </Form> */}
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
          <h5 id='sumTitle'>Summary:</h5>
          <OverlayTrigger trigger={["hover", "focus"]} overlay={sum_help_popover}>
              <span style={{ cursor: 'pointer' }}>
                <InfoCircle className="info-icon" size={24} /> {/* Adjust size as needed */}
              </span>
            </OverlayTrigger>
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
          
          

          <OverlayTrigger trigger={["click", "focus"]} placement="bottom" overlay={customize_popover}>
              <span style={{ cursor: 'pointer' }} id='customizeHover'>
                 <div>Customize</div>
              </span>
            </OverlayTrigger>

            {/* <div className="customize-menu-wrap" id="customizeMenu">
              <form id='customizeSummaryForm' onSubmit={onSubmit}>
                <input type="submit" value="Customize" id="custSumButton" />
                <textarea
                  id="customize_summary"
                  name="customize_summary"
                  placeholder="For example, try saying &quot;Put the summary into bullet points&quot;..."
                  value={customSumText}
                  onChange={(e) => setCustomSumText(e.target.value)}
                ></textarea>   
              </form>
            </div> */}
        </div>
      </div>
    </>
  );
}


export default App;
