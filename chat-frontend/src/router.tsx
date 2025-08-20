
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/loginPage";

import Layout from "./pages/Layout";
import PublicLayout from "./pages/PublicLayout";
import ChatManage from "./pages/ChatManage";








const router = createBrowserRouter([
   {
    element: <PublicLayout />,
    children: [  
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    element: <Layout />,
    children: [
      { path: "/chat", element: <ChatManage/> },
      
    ],
  },
]);

export default router


