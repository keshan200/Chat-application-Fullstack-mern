import { Layout } from "lucide-react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/loginPage";








const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
       {path:"/", element: <LoginPage /> },
       {path:"/login", element: <LoginPage /> },
      

     

      
      
    ],
 },
])

export default router


