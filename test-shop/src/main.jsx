import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './HomePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExplorePage from './ExplorePage.jsx'
import ProductPage from './ProductPage.jsx'
import CartPage from './CartPage.jsx'
import NavBar from './NavBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/app" element={<App/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
