import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/Users/samitsandhu/Desktop/MERN/COMP229-Portfolio_301131044/client/src/components/globalStyle.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)

