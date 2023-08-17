import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import MainPage from './Pages/MainPage/MainPage'
import './App.css'

function App () {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/mainpage' element={<MainPage />} />
      </Routes>
    </>
  )
}

export default App
