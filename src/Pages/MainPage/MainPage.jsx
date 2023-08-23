import './mainPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Graphic from '../../Components/Graphic/Graphic'
import Table from '../../Components/Table/Table'

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
      <h2 className='mt-5 text-center'>Chequea el historial de tu cripto favorita!</h2>
      <div className='w-75'>
        <Table data={data}></Table>
      </div>
      <div className='col-md-8 col-11'>
        <Graphic data={data.prices}></Graphic>
      </div>
    </div>
  )
}

export default MainPage
