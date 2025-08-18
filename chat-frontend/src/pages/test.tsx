import React, { useState } from 'react';
import { 
  MessageCircle, 
  Users, 
  Settings, 
  Search, 
  Send, 
  Paperclip, 
  Smile,
  MoreVertical,
  Phone,
  Video,
  Star,
  Archive,
  Bell,
  Moon
} from 'lucide-react';

const ChatInterface = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');

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

  const messages = [
    {
      id: 1,
      sender: "Sarah Wilson",
      content: "Hey! How's the project going?",
      time: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "Me",
      content: "It's going great! Just finished the main components.",
      time: "10:32 AM",
      isMe: true
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      content: "Awesome! Can't wait to see the final result. When do you think it'll be ready for review?",
      time: "10:35 AM",
      isMe: false
    },
    {
      id: 4,
      sender: "Me",
      content: "I should have it ready by tomorrow evening. I'll send you a preview link.",
      time: "10:37 AM",
      isMe: true
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        
        <nav className="flex flex-col space-y-4">
          <button className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition-colors">
            <Users className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition-colors">
            <Star className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition-colors">
            <Archive className="w-5 h-5" />
          </button>
        </nav>

        <div className="flex-1"></div>

        <div className="flex flex-col space-y-4">
          <button className="w-10 h-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex items-center justify-center transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
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

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                SW
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Sarah Wilson</h3>
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.isMe
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-900 rounded-bl-md'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.isMe ? 'text-blue-200' : 'text-gray-500'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>

            <button className="w-10 h-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;