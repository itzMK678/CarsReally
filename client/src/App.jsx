import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './pages/HeroSection'
import About from './components/About'

function App() {


  return (
    <>
    <Navbar />
    <HeroSection />
    <About />
    </>
  )
}

export default App
