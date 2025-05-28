import './styles/index.css';
import './styles/reset.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ResumeProvider } from './context/ResumeContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </StrictMode>,
)