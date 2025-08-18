import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/loginPage.tsx'
import ChatInterface from './pages/test.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatInterface />
  </StrictMode>,
)
