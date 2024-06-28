import React, { useState, useEffect, useRef } from 'react';
import './chatStyles.css'; // Import the CSS file
import PatientInfo1 from './PatientInfo1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

const ChatForm = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [placeholder, setPlaceholder] = useState("Ask me anything...");
  const textareaRef = useRef(null);
  const micRef = useRef(null);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
   
  if (recognition) {
    recognition.continuous = true;
     
    recognition.onresult = event => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setMessage(text);
      setIsListening(false);
      setPlaceholder("Ask me anything...");
    };
    recognition.onend = () => {
      console.log("Recognition ended");
      setIsListening(false);
      setPlaceholder("Ask me anything...");
    };
    recognition.onerror = (event) => {
      console.error("Recognition error: ", event.error);
      if (event.error === 'no-speech') {
        console.log('No speech detected, try again.');
      }
       
      setIsListening(false); // Ensure we reset listening state on error
    };
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ' && event.target === document.body && !isListening && recognition) {
        event.preventDefault();
        console.log("Spacebar pressed - Starting recognition"); // Debugging keydown
        setIsListening(true);
        setPlaceholder("Listening...");
        recognition.start();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === ' ' && isListening && recognition) {
        console.log("Spacebar released - Stopping recognition"); // Debugging keyup
        setIsListening(false);
        recognition.stop();
      }
    };

    const handleClickOutside = (event) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target) &&
          micRef.current && !micRef.current.contains(event.target)) {
        console.log("Click outside - Stopping recognition"); // Debugging clicks outside
        setIsListening(false);
        recognition.stop();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [recognition, isListening]);

  const justCheck =() => {
    console.log ("check ",isListening);
    if (isListening) {
      
      console.log ("stopping " , isListening);
      setIsListening(false); // Immediately set listening to false
      recognition.stop(); // Stop recognition if it's already running
       
      setPlaceholder("Ask me anything..."); 
    } else {
      try {
        setIsListening(true); // Set listening to true before starting
        setPlaceholder("Listening...");
        recognition.start(); // Attempt to start recognition
        
      } catch (error) {
        console.error("Error starting recognition: ", error);
        setIsListening(false); // Reset listening if start fails
        setPlaceholder("Ask me anything...");
      }
    }

  }
  const toggleListening = () => {
    console.log("Current listening state in toggle listning : ", isListening);
    if (isListening) {
      recognition.stop(); // Stop recognition if it's already running
      setIsListening(false); // Immediately set listening to false
      setPlaceholder("Ask me anything...");
    } else {
      try {
        setIsListening(true); // Set listening to true before starting
        setPlaceholder("Listening...");
        recognition.start(); // Attempt to start recognition
      } catch (error) {
        console.error("Error starting recognition: ", error);
        setIsListening(false); // Reset listening if start fails
        setPlaceholder("Ask me anything...");
      }
    }
  };
  

  const handleGenerateResponse = () => {
    setIsLoading(true);
    const requestBody = { userMessage: message };
    const baseURL = "http://127.0.0.1:5000/";
    const endpoint = "get_patient_symptom";
    const url = baseURL + endpoint;

    console.log("Sending request to server: ", message); // Debugging server request
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      console.log("Response received from server: ", data); // Debugging response data
      setResponse(data);
    })
    .catch(error => {
      console.error("Error: ", error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="formContainer">
      <PatientInfo1 response={response} />
      
      <div className="inputWithIcon">
        <textarea 
          className="formControl"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={textareaRef}
        ></textarea>
        <button className="micBtn" onClick={justCheck} ref={micRef} aria-label="Activate voice input">
          <FontAwesomeIcon icon={isListening ? faStop : faMicrophone} />
        </button>
      </div>
      <button className="formBtn" onClick={handleGenerateResponse}>
        {isLoading ? "Analyzing..." : "Analyse"}
      </button>
      <div className="responseContainer">
        <h3>Response</h3>
        <p>Data: {JSON.stringify(response)}</p>
      </div>
    </div>
  );
};

export default ChatForm;
