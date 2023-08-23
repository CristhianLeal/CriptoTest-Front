import './mainPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Graphic from '../../Components/Graphic/Graphic'
import Table from '../../Components/Table/Table'
import { Link } from 'react-router-dom'

const MainPage = () => {
  const [data, setData] = useState([])
  const cripto = localStorage.getItem('cripto')
  const quoteCurrency = localStorage.getItem('quoteCurrency')
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/${cripto}/${quoteCurrency}`)
        setData(response.data)
      } catch (error) {
        console.error('Error', error)
      }
    }
    fetchdata()
  }, [])

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
      <div className='d-flex flex-md-row flex-column justify-content-center align-items-center mt-4 gap-1'>
        <h3 className='col-md-11 col-10 titleH3 text-center'>Chequea el historial de tu cripto favorita!</h3>
        <Link className='col-md-1 col-4 controller me-4 mt-2 mt-md-0 mb-2 mb-md-0 text-decoration-none link' to='/'>
          <button className='controller w-100'>
            Pagina principal
          </button>
        </Link>
      </div>
      <div className='w-100'>
        <Table data={data}></Table>
      </div>
      <div className='col-md-8 col-11 mt-3'>
        <Graphic data={data.prices}></Graphic>
      </div>
    </div>
  )
}

export default MainPage
