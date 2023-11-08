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

function App() {
  const [text, setText] = useState("");
  const [audioType, setAudioType] = useState("");
  const [speechURL, setSpeechURL] = useState("");
  const [response, setResponse] = useState("");

  // Chrome background listener to receive messages from context menu items in service-worker.js
  chrome.runtime.onMessage.addListener(({ name, data }) => {
    if (name === "summarize-text") {
      console.log("Received message to summarize from service-worker.js!");
      console.log(data.value);
      summaryCall(data.value).then((value) => {
        setResponse(value);
        console.log("The value of the text summary query is below");
        console.log(value);
      });
    } else if (name === "text-to-speech") {
      console.log("Received message to speak from service-worker.js!");
      console.log(data);
      speakText(data.value).then((value) => {
        setSpeechURL(value);
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

    summaryCall(text).then((value) => {
      setResponse(value);
      console.log("The value of the text summary query is below");
      console.log(value);
    });
  };

  // Function to handle text to speech
  const handleTTSSubmit = (e: any) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.id === "speakbutton") {
      speakText(text).then((value) => {
        setSpeechURL(value);
        setAudioType("Speaking highlighted text...");

        console.log("The url of the speak text query is below");
        console.log(value);
      });
    } else if (e.nativeEvent.submitter.id === "speakSumbutton") {
      speakText(response).then((value) => {
        setSpeechURL(value);
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
            <p><b> Insert extension instructions here! </b></p>
        </Popover.Body>
    </Popover>
    );


  return (
    <>
      <div id="sidebar_container">
        <header>
          <h2>AI-Powered Reading Assistant (AIRA)</h2>
        </header>
        <br></br>
        <div>
          <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" overlay={help_popover}>
              <span style={{ cursor: 'pointer' }}>
                  <p>?</p>
              </span>
          </OverlayTrigger>
          </div>
        {/* <Form>
              <Form.Check // prettier-ignore
                type="switch"
                id="toolbar-mode"
                label="Enable toolbar"
              />
            </Form> */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
