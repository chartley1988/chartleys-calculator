import { useState } from 'react'
import './css/main.css'
import Editor from './components/Editor'
import Results from './components/Results'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App">
      <header>Stacked Calculator </header>
      <Editor></Editor>
      <Footer></Footer>
    </div>
  )
}

export default App
