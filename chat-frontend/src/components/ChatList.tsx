import { Search } from 'lucide-react'
import React, { useState } from 'react'

const ChatList = () => {

 const [selectedChat, setSelectedChat] = useState(0);
 
 const chats = [
    {
      id: 1,
      name: "Sarah Wilson",
      lastMessage: "Hey! How's the project going?",
      time: "2m ago",
      unread: 2,
      avatar: "SW",
      online: true
    },
    {
      id: 2,
      name: "Dev Team",
      lastMessage: "The new features are ready for testing",
      time: "15m ago",
      unread: 0,
      avatar: "DT",
      online: false
    },
    {
      id: 3,
      name: "Alex Chen",
      lastMessage: "Thanks for the help yesterday!",
      time: "1h ago",
      unread: 1,
      avatar: "AC",
      online: true
    },
    {
      id: 4,
      name: "Marketing Team",
      lastMessage: "Campaign results look promising",
      time: "3h ago",
      unread: 0,
      avatar: "MT",
      online: false
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      lastMessage: "Let's schedule a meeting for next week",
      time: "1d ago",
      unread: 0,
      avatar: "ER",
      online: false
    }
  ];


  return (
     <div className="w-85  bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
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
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(index)}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                selectedChat === index 
                  ? 'bg-blue-50 border-blue-500' 
                  : 'border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default ChatList
