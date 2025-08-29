// ChatManage.tsx

import { Phone, Video, MoreVertical, Paperclip, Send } from "lucide-react";
import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import socket from "../socket";
import type { Messages } from "../types/Messages";
import Cookies from "js-cookie";
import { getAllMessageByConversation } from "../service/messageService";
import type { Conversation } from "../types/Conversation";
import axios from "axios";
import { toast } from "react-toastify";

const ChatManage: React.FC = () => {
  const currentUser = Cookies.get("currentID"); 
  const userId = currentUser ? JSON.parse(currentUser).id : null;

  const [uID, setUserID] = useState<string | null>(userId);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [msg, setMsg] = useState<Messages[]>([]);
  const [conversations ,setConversations] =  useState<Conversation[]>([])

   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  


  

useEffect(() => {
  if (!userId) return;

  if (!socket.connected) socket.connect();
  socket.emit("register_user", userId);
  const handleReceive = (message: Messages) => {
    if ((message.sender?._id || message.sender) !== userId) {
      setMsg((prev) => [...prev, message]);
    }
  };

  const handleSent = (message: Messages) => {
    setMsg((prev) => [...prev, message]);
    setText("");
  };

    socket.on("online_users", (users: string[]) => {
        setOnlineUsers(users);
    });

  socket.on("receive_message", handleReceive);
  socket.on("message_sent", handleSent);

  return () => {
    socket.off("receive_message", handleReceive);
    socket.off("message_sent", handleSent);
  
  };
}, [userId]);




const fetchMessages = async (conversationId: string) => {
  try {
  
    const messages = await getAllMessageByConversation(conversationId);
    setMsg(messages); 
    console.log("Messages:", messages);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};


useEffect(() => {
  if (selectedChat) fetchMessages(selectedChat);
}, [selectedChat]);



  const sendMessage = () => {
    if (!text.trim() || !selectedChat || !userId || !receiverId) return;

    socket.emit("send_message", {
      conversationId: selectedChat,
      senderId: userId,
      receiverId: receiverId,   
      text,
      type: "text",
    });
  };

  if (!userId) return <p>Loading user...</p>;

   

  return (
    <div className="flex h-screen bg-gray-50">
     
      <ChatList
        userId={userId}
        onSelectChat={(chatId, id, full_name) => {
          setSelectedChat(chatId);
          setReceiverId(id);
          setReceiverName(full_name);
          setMsg([]); 
          
        }}
       isOnline
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

                 {receiverId && onlineUsers.includes(receiverId) ? (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          ) : (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 border-2 border-white rounded-full"></span>
          )}

               
              </div>

              
              <div>
                <h3 className="font-semibold text-gray-900">{receiverName}</h3>
                 {receiverId && onlineUsers.includes(receiverId) ? (
            <span className="text-green-500">Online</span>
          ) : (
            <span className="text-gray-400">Offline</span>
          )}
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
             className={`flex ${
             (m.sender?._id || m.sender) === uID ? "justify-end" : "justify-start"
             }`}
             >
  <div
    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
      (m.sender?._id || m.sender) === uID
        ? "bg-blue-600 text-white rounded-br-md"
        : "bg-gray-100 text-gray-900 rounded-bl-md"
    }`}
  >
    <p className="text-sm">{m.text}</p>
    <p
      className={`text-xs mt-1 ${
        (m.sender?._id || m.sender) === uID ? "text-blue-200" : "text-gray-500"
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