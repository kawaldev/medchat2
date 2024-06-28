import React, { useState, useEffect, useRef } from 'react';
import './chatStyles.css'; // Import the CSS file
import PatientInfo1 from './PatientInfo1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import Agent from './Agent';
import MessageBubble from './MessageBubble';
import VoiceInputControl from './VoiceInputControl';
import ChatController from './ChatController';

const ChatFormWithAgent = ({ initialState }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [header, setHeader] = useState("test");

  const [chatMessage, setChatMessage] = useState("boo");
  const [qaQuestions, setQAQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [placeholder, setPlaceholder] = useState("Ask me anything...");
  const textareaRef = useRef(null);
  const micRef = useRef(null);

// Initialize the chatController only once
const chatControllerRef = useRef(null);
if (!chatControllerRef.current) {
    chatControllerRef.current = new ChatController({
        setHeader:setHeader,
        setBubbleMessage: setChatMessage,
        setQAContent: setQAQuestions
    }, initialState);
}
const chatController = chatControllerRef.current;

const handleOnSubmit = () =>
{
  setIsLoading(true);
  chatController.handleEvent("onsubmit",message);
}

  //const chatMessage= "Please define your problem in a clear way. Mention when this started , whats the sevierity etc"
  const baseIco="/Agents/AgentA/"
  const agentIcons = {
    Angry: baseIco+'/Angry.ico',
    Sad: baseIco+'/Sad.ico',
    Happy: baseIco+'/Happy.ico',
    Surprise: baseIco+"/Surise.ico"
  };
  return (
    <div className="formContainer">
      <Agent
                name="MedBot"
                iconUrls={agentIcons}
                defaultEmotion="Happy"
                headingMessage={header}

      />
      <MessageBubble message={chatMessage} />
      <div className="inputWithIcon">
        <textarea 
          className="formControl"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={textareaRef}
        ></textarea>
          
      <VoiceInputControl setMessage={setMessage} placeholder={placeholder} setPlaceholder={setPlaceholder} />
   
      </div>
      <button className="formBtn" onClick={handleOnSubmit}>
        {isLoading ? "Analyzing..." : "Submit"}
      </button>
      <div className="responseContainer">
        <h3>Response</h3>
        <p>Data: {JSON.stringify(response)}</p>
      </div>
    </div>
  );
};

export default ChatFormWithAgent;
