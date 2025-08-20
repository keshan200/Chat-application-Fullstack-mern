import React, { useEffect, useState } from "react";
import socket from "../socket";
import { Search } from "lucide-react";
import type { Acceptchats } from "../types/AcceptChats";

interface ChatListProps {
  userId: string;
  onSelectChat: (chatId: string,  id:string ,full_name: string ) => void;
}

const ChatList = ({ userId ,onSelectChat }: ChatListProps) => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [AcceptChats, setAcceptChats] = useState<Acceptchats[]>([]);

  useEffect(() => {
    socket.connect();
    socket.emit("accepted_user", userId);

    socket.on("chat_list", (data: Acceptchats[]) => {
      setAcceptChats(data);
      console.log("Accepted chats received:", data);
    });

    return () => {
      socket.off("chat_list");
      socket.disconnect();
    };
  }, [userId]);

  return (
    <div className="w-85 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 friendborder-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {AcceptChats.map((chat, index) => {
          // find friend user (skip logged-in user)
          const friend = chat.participants.find((p) => p._id !== userId);

          return (
            <div
               key={friend?._id}
              onClick={() => {
                setSelectedChat(index);
                onSelectChat(chat._id, friend?._id ?? "", friend?.full_name ?? "");
              }}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                selectedChat === index
                  ? "bg-blue-50 border-blue-500"
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {friend?.full_name.charAt(0)}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {friend?.full_name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>

                <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {/* unread count if needed */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
