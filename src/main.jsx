import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

// Store root globally so we don't recreate it
if (!window._reactRoot) {
  window._reactRoot = createRoot(container)
}

window._reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
