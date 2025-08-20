// ChatManage.tsx

import { Phone, Video, MoreVertical, Paperclip, Send } from "lucide-react";
import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import socket from "../socket";
import type { Messages } from "../types/Messages";
import Cookies from "js-cookie";

const ChatManage: React.FC = () => {
  const currentUser = Cookies.get("currentID"); 
  const userId = currentUser ? JSON.parse(currentUser).id : null;

  const [uID, setUserID] = useState<string | null>(userId);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [msg, setMsg] = useState<Messages[]>([]);

  useEffect(() => {
    if (!userId) return;

    socket.connect();
    socket.emit("register_user", userId);

    socket.on("receive_message", (message: Messages) => {
      setMsg((prev) => [...prev, message]);
    });

    socket.on("message_sent", (message: Messages) => {
      setMsg((prev) => [...prev, message]);
      setText("");
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = () => {
    if (!text.trim() || !selectedChat || !userId || !receiverId) return;

    socket.emit("send_message", {
      conversationId: selectedChat,
      senderId: userId,
      receiverId: receiverId,   // ✅ now correct
      text,
      type: "text",
    });
  };

  if (!userId) return <p>Loading user...</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ✅ Pass onSelectChat callback */}
      <ChatList
        userId={userId}
        onSelectChat={(chatId, id, full_name) => {
          setSelectedChat(chatId);
          setReceiverId(id);
          setReceiverName(full_name);
          setMsg([]); // clear old messages if switching
        }}
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        {receiverId ? (
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {receiverName?.charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{receiverName}</h3>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {msg.map((m) => (
            <div
              key={m._id}
              className={`flex ${m.sender._id === uID ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  m.sender._id === uID
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                <p className="text-sm">{m.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    m.sender._id === uID ? "text-blue-200" : "text-gray-500"
                  }`}
                >
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        {receiverId && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center space-x-3">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatManage