import { MessageCircle, Users, Star, Archive, Bell, Moon, Settings } from "lucide-react";
import { useState } from "react";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("/chat");

  const menuItems = [
    { name: "Chat", path: "/chat", icon: MessageCircle },
    { name: "Friends", path: "/freinds", icon: Users },
    { name: "Favorites", path: "/favorites", icon: Star },
    { name: "Archive", path: "/archive", icon: Archive },
  ];

  const bottomMenuItems = [
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Dark Mode", path: "/darkmode", icon: Moon },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleNavigation = (path:string) => {
    setActiveItem(path);
   
    console.log(`Navigating to: ${path}`);
  };

  const isActive = (path :string) => activeItem === path;

  return (
    <div className="w-16 h-screen bg-white border-r border-gray-200 flex flex-col items-center px-3 py-4">
      {/* Logo */}
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
        <MessageCircle className="w-6 h-6 text-white" />
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
              title={item.name}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Bottom Navigation */}
      <div className="flex flex-col space-y-4">
        {bottomMenuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
              title={item.name}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;