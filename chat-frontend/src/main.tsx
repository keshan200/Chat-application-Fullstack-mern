import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/loginPage.tsx'
import ChatInterface from './pages/test.tsx'
import SideBar from './components/SideBar.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
