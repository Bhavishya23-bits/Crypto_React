import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import Coin_Context_provider from './context/Coin_context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Coin_Context_provider>
        <App />
      </Coin_Context_provider>
    </BrowserRouter>
  </StrictMode>,
)
