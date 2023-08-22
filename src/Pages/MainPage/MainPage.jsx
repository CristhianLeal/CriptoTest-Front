import './mainPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Graphic from '../../Components/Graphic/Graphic'

const MainPage = () => {
  const [info, setInfo] = useState([])
  const cripto = localStorage.getItem('cripto')
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/${cripto}`)
        setInfo(response.data)
      } catch (error) {
        console.error('Error', error)
      }
    }

    fetchInfo()
  }, [])

  return (
    <div className='d-flex flex-column align-items-center'>
      <h2 className='mt-5'>Chequa el historial de tu cripto favorita</h2>
      <div>
        <div className='d-flex justify-content-center align-items-center'>
          <h3 className='text-center title'>{info.contractName}</h3>
          <img className='image' src={info.logoUrl} alt={info.contractName} />
        </div>
        <h3>Ultimo precio: $ {info?.prices?.[info.prices.length - 1]?.price} {info.quoteCurrency}</h3>
      </div>
      <div className='col-md-8 col-10'>
        <Graphic data={info.prices}></Graphic>
      </div>
    </div>
  )
}

export default MainPage
