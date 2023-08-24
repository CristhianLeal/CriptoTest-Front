import './mainPage.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Form, Graphic, Table } from '../../Components'

const MainPage = () => {
  const [data, setData] = useState([])
  const [isVisible, setIsVisible] = useState([])
  const cripto = localStorage.getItem('cripto')
  const quoteCurrency = localStorage.getItem('quoteCurrency')
  const titleRef = useRef(null)
  const tableRef = useRef(null)
  const graphicRef = useRef(null)
  const formRef = useRef(null)
  const handleScroll = () => {
    const refs = [titleRef, tableRef, graphicRef, formRef]
    const visibilities = refs.map((ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        return rect.top <= window.innerHeight && rect.bottom >= 0
      }
      return false
    })
    setIsVisible(visibilities)
  }
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`https://cryptotest-api.onrender.com/${cripto}/${quoteCurrency}`)
        setData(response.data)
        toast.success('Historico cargado exitosamente')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    handleScroll()
    window.scrollTo(0, 0)
    window.addEventListener('scroll', handleScroll)
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    fetchdata()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <div className='d-flex flex-column align-items-center justify-content-center conten'>
      <div ref={titleRef} className={`d-flex flex-md-row flex-column justify-content-center align-items-center mt-4 gap-1 effect-translateX-toLeft ${isVisible[0] ? 'EfectVisible1' : ''}`}>
        <h3 className='col-md-11 col-10 titleH3 text-center'>Chequea el historial de tu cripto favorita!</h3>
        <Link className='col-md-1 col-4 controller me-4 mt-2 mt-md-0 mb-2 mb-md-0 text-decoration-none link' to='/'>
          <button className='controller w-100 py-md-0 py-2'>
          <i className='bi bi-arrow-90deg-left'> Pagina principal</i>
          </button>
        </Link>
      </div>
      <div ref={tableRef} className={`w-100 effect-translateX-toRight ${isVisible[1] ? 'EfectVisible2' : ''}`}>
        <Table data={data}/>
      </div>
      <div ref={graphicRef} className={`col-md-9 col-11 mt-3 effect-translateX-toLeft ${isVisible[2] ? 'EfectVisible1' : ''}`}>
        <Graphic data={data.prices}/>
      </div>
      <div ref={formRef} className={`mt-2 px-2 mb-3 effect-translateX-toRight ${isVisible[3] ? 'EfectVisible2' : ''}`}>
        <h3 className='text-center titleH3'>Quieres buscar una nueva moneda?</h3>
        <Form />
      </div>
    </div>
  )
}

export default MainPage
