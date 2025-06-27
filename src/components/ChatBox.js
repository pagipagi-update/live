// src/components/ChatBox.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

// ChatBox tidak lagi menerima prop isChatOpen
function ChatBox({ messages, onSendMessage }) { // HAPUS isChatOpen dari props
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showUsernameInput, setShowUsernameInput] = useState(true); 

  const messagesEndRef = useRef(null); 


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setShowUsernameInput(false); 
    } else {
      alert('Username tidak boleh kosong!');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && username.trim()) {
      onSendMessage(username, newMessage.trim());
      setNewMessage('');
    } else if (!username.trim()) {
        alert('Mohon masukkan username terlebih dahulu!');
    }
  };

  return (
    // HAPUS class chatbox-open/chatbox-closed
    <div className="chatbox-container">
      <div className="chatbox-header">Live Chat</div>
      
      {showUsernameInput ? (
        <form className="username-input-form" onSubmit={handleUsernameSubmit}>
          <p>Masukkan Username Anda:</p>
          <input
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength="15" 
          />
          <button type="submit">Gabung Chat</button>
        </form>
      ) : (
        <> 
          <div className="chatbox-messages">
            {messages.length === 0 ? (
              <div className="chat-info">Belum ada pesan. Mulai percakapan!</div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="chat-message">
                  <span className="chat-username">{msg.user}:</span> {msg.text}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbox-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ketik pesan Anda..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!username.trim()}
            />
            <button type="submit" disabled={!username.trim()}>Kirim</button>
          </form>
        </>
      )}
    </div>
  );
}

export default ChatBox;