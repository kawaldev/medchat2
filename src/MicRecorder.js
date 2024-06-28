import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';

export default function MicRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [transcript, setTranscript] = useState("");
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const speechRecognition = new window.webkitSpeechRecognition();
            speechRecognition.continuous = true;
            speechRecognition.interimResults = true;
            speechRecognition.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const transcriptPiece = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        setTranscript((prev) => prev + transcriptPiece);
                    } else {
                        interimTranscript += transcriptPiece;
                    }
                }
                setTranscript((prev) => prev + interimTranscript);
            };
            setRecognition(speechRecognition);
        } else {
            console.log('Web Speech API is not supported in this browser.');
        }
    }, []);

    const startRecording = () => {
        setIsRecording(true);
        recognition && recognition.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        recognition && recognition.stop();
    };

    const onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        setRecordedAudio(recordedBlob.blobURL);
    };

    return (
        <div>
            <h1>Microphone Recorder with Speech to Text</h1>
            <ReactMic
                record={isRecording}
                className="sound-wave"
                onStop={onStop}
                strokeColor="#000000"
                backgroundColor="#FF4081" />
            <button onClick={startRecording} disabled={isRecording}>Start</button>
            <button onClick={stopRecording} disabled={!isRecording}>Stop</button>
            {recordedAudio && <audio src={recordedAudio} controls />}
            <textarea value={transcript} readOnly />
        </div>
    );
}
