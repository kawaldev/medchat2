import React from 'react';
import './chatStyles.css'; // Ensure you have styles defined for the chat bubble

const MessageBubble = ({ message }) => {
    return (
        <div className="message-bubble">
            {message}
        </div>
    );
};

export default MessageBubble;
