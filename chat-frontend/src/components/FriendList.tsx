import React, { useEffect, useState } from "react";
import { Search, UserPlus, Users } from "lucide-react";

interface Friend {
  _id: string;
  full_name: string;
  email: string;
  avatar?: string;
  status?: string;
}

interface FriendListProps {
  userId: string;
  onSendInvite: (friendId: string, friendName: string) => void;
  isOnline: boolean;
}

const FriendList = ({ userId, onSendInvite, isOnline }: FriendListProps) => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      _id: "1",
      full_name: "John Doe",
      email: "john@example.com",
      status: "Available for chat"
    },
    {
      _id: "2", 
      full_name: "Sarah Wilson",
      email: "sarah@example.com",
      status: "Busy"
    },
    {
      _id: "3",
      full_name: "Mike Johnson",
      email: "mike@example.com", 
      status: "Online"
    },
    {
      _id: "4",
      full_name: "Emma Davis",
      email: "emma@example.com",
      status: "Away"
    },
    {
      _id: "5",
      full_name: "Alex Brown",
      email: "alex@example.com",
      status: "Do not disturb"
    }
  ]);
  
  const [onlineUsers, setOnlineUsers] = useState<string[]>(["1", "3", "4"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteSent, setInviteSent] = useState<string[]>([]);

  // Filter friends based on search term
  const filteredFriends = friends.filter(friend =>
    friend.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendInvite = (friendId: string, friendName: string) => {
    // Add to sent invites list
    setInviteSent(prev => [...prev, friendId]);
    
    // Call parent callback
    onSendInvite(friendId, friendName);
    
    // Remove from sent list after 3 seconds to show it was processed
    setTimeout(() => {
      setInviteSent(prev => prev.filter(id => id !== friendId));
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'online':
      case 'available for chat':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
      case 'do not disturb':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="w-85 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {friends.length}
            </span>
          </div>
          
          {/* Add Friend Button */}
          <button
            onClick={() => onSendInvite("", "Add New Friend")}
            className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Friends List */}
      <div className="flex-1 overflow-y-auto">
        {filteredFriends.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Users className="w-12 h-12 mb-4 text-gray-300" />
            <p className="text-lg font-medium">No friends found</p>
            <p className="text-sm">Try adjusting your search</p>
          </div>
        ) : (
          filteredFriends.map((friend) => {
            const isUserOnline = onlineUsers.includes(friend._id);
            const hasInviteSent = inviteSent.includes(friend._id);

            return (
              <div
                key={friend._id}
                className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {friend.full_name.charAt(0).toUpperCase()}
                    </div>
                    {/* Online indicator */}
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${
                        isUserOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {friend.full_name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(friend.status || '')}`}
                        />
                        <span className="text-xs text-gray-500">
                          {isUserOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {friend.email}
                    </p>
                    
                    {friend.status && (
                      <p className="text-xs text-gray-600 truncate mt-1">
                        {friend.status}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{onlineUsers.length} online</span>
          <span>{friends.length} total friends</span>
        </div>
      </div>
    </div>
  );
};

export default FriendList;