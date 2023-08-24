import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Home, MainPage } from './Pages'

function App () {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/mainpage' element={<MainPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  )
}
export default App
