import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Agent = ({ name, iconUrls, defaultEmotion,headingMessage }) => {
    const [emotion, setEmotion] = useState(defaultEmotion);
     

    // Function to change the displayed emotion
    const changeEmotion = (newEmotion) => {
        if (!iconUrls[newEmotion]) {
            console.error("Emotion not recognized: ", newEmotion);
            return;
        }
        setEmotion(newEmotion);
    };

    

    return (
        <div className="agent">
            <img src={iconUrls[emotion]} alt={`${name} - ${emotion}`} style={{ width: '50px', height: '50px' }} />
            <h2>{headingMessage}</h2>
        </div>
    );
};

export default Agent;
