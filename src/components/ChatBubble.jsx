import React from 'react';

    function ChatBubble({ user, onClose }) {
      return (
        <div className="chat-bubble">
          <div className="chat-header">
            <span>Chatting with {user.fullName}</span>
            <button onClick={onClose}>Close</button>
          </div>
          <div className="chat-content">
            {/* Chat messages will go here */}
            <p>This is the chat area with {user.fullName}.</p>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      );
    }

    export default ChatBubble;
