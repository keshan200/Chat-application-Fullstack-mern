import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/useAuth";

const Layout = () => {

  const {isAuthenticating,isLoggedIn} =  useAuth()

  if(isAuthenticating){
    return <div>loading......</div>
  }


  return (
    <div className="h-screen flex overflow-hidden">

      <div className="flex-shrink-0">
        <SideBar />
      </div>

      <main className="h-full overflow-y-auto flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
