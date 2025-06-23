import React, { useState, useEffect, useRef } from 'react'; // Tambahkan useEffect dan useRef
import './ChatBox.css';

// ChatBox sekarang menerima props: messages dan onSendMessage
function ChatBox({ messages, onSendMessage }) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref untuk menggulir ke bawah

  // Gulir ke bawah setiap kali pesan berubah
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim()); // Panggil fungsi dari prop
      setNewMessage('');
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">Live Chat</div>
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
        <div ref={messagesEndRef} /> {/* Elemen kosong untuk scroll */}
      </div>
      <form className="chatbox-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatBox;