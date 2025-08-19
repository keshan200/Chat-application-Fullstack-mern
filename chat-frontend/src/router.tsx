
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Test from "./pages/test";
import Layout from "./pages/Layout";
import PublicLayout from "./pages/PublicLayout";







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
      { path: "/test", element: <Test /> },
    ],
  },
]);

export default router


