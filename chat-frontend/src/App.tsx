// src/App.tsx
import React, { useState, useEffect } from "react";
import { socket } from "./socket";

interface Message {
  _id: string;
  conversation: string;
  sender: string;
  receiver: string;
  text: string;
  type: string;
}

const App = () => {
  const [userId, setUserId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // User register කරලා socket connect කරන්න
  useEffect(() => {
    if (userId) {
      socket.connect();
      socket.emit("register_user", userId);
    }
  }, [userId]);

  // Messages listen කරන event
  useEffect(() => {
    const handleReceive = (msg: Message) => setMessages(prev => [...prev, msg]);
    const handleError = (data: any) => alert(data.message);

    socket.on("receive_message", handleReceive);
    socket.on("message_sent", handleReceive);
    socket.on("error_message", handleError);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("message_sent", handleReceive);
      socket.off("error_message", handleError);
    };
  }, []);

  // Message යවන්න
  const handleSend = () => {
    if (!userId || !receiverId || !text) return;

    socket.emit("send_message", {
      
      senderId: userId,
      receiverId: receiverId,
      text,
      type: "text",
    });

    setText("");
  };

  return (
    <div>
      <h2>Chat Test</h2>
      <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <input placeholder="Receiver ID" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
      <input placeholder="Message..." value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSend}>Send</button>

      <div>
        {messages.map((msg) => (
          <div key={msg._id}>
            {msg.sender} → {msg.receiver}: {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
