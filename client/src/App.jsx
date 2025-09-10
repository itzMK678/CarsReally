import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './pages/HeroSection'
import About from './components/About'
import Footer from './components/Footer'
import BookEvent from './pages/BookEvent'

function App() {


  return (
    <>
    <Navbar />
    <HeroSection />
    <About />
    <BookEvent/>
   <Footer/>
    </>
  )
}

export default App
