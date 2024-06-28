import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

const VoiceInputControl = ({ setMessage, placeholder, setPlaceholder }) => {
  const [isListening, setIsListening] = useState(false);
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

      setIsListening(false);
    };
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ' && event.target === document.body && !isListening && recognition) {
        event.preventDefault();
        setIsListening(true);
        setPlaceholder("Listening...");
        recognition.start();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === ' ' && isListening && recognition) {
        setIsListening(false);
        recognition.stop();
      }
    };

    const handleClickOutside = (event) => {
      if (micRef.current && !micRef.current.contains(event.target)) {
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

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setPlaceholder("Ask me anything...");
    } else {
      try {
        setIsListening(true);
        setPlaceholder("Listening...");
        recognition.start();
      } catch (error) {
        console.error("Error starting recognition: ", error);
        setIsListening(false);
        setPlaceholder("Ask me anything...");
      }
    }
  };

  return (
    <button className="micBtn" onClick={toggleListening} ref={micRef} aria-label="Activate voice input">
      <FontAwesomeIcon icon={isListening ? faStop : faMicrophone} />
    </button>
  );
};

export default VoiceInputControl;
