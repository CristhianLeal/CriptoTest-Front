import './mainPage.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Graphic from '../../Components/Graphic/Graphic'
import Table from '../../Components/Table/Table'
import { Link } from 'react-router-dom'
import Form from '../../Components/Form/Form'

const MainPage = () => {
  const [data, setData] = useState([])
  const cripto = localStorage.getItem('cripto')
  const quoteCurrency = localStorage.getItem('quoteCurrency')
  const [, setVisible] = useState(false)
  const [contVisibleA, setContVisibleA] = useState([])
  const SRef0 = useRef(null)
  const SRef1 = useRef(null)
  const SRef2 = useRef(null)
  const SRef3 = useRef(null)
  const handleScroll = () => {
    const refs = [SRef0, SRef1, SRef2, SRef3]
    const visibilities = refs.map((ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        return rect.top <= window.innerHeight && rect.bottom >= 0
      }
      return false
    })
    setVisible(visibilities.some((visibility) => visibility))
    setContVisibleA(visibilities)
  }
  useEffect(() => {
    handleScroll()
    window.scrollTo(0, 0)
    window.addEventListener('scroll', handleScroll)
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
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
    <div className='d-flex flex-column align-items-center justify-content-center conten'>
      <div ref={SRef0} className={`d-flex flex-md-row flex-column justify-content-center align-items-center mt-4 gap-1 EfectTransX1 ${contVisibleA[0] ? 'EfectVisible1' : ''}`}>
        <h3 className='col-md-11 col-10 titleH3 text-center'>Chequea el historial de tu cripto favorita!</h3>
        <Link className='col-md-1 col-4 controller me-4 mt-2 mt-md-0 mb-2 mb-md-0 text-decoration-none link' to='/'>
          <button className='controller w-100 py-md-0 py-2'>
          <i className='bi bi-arrow-90deg-left'> Pagina principal</i>
          </button>
        </Link>
      </div>
      <div ref={SRef1} className={`w-100 EfectTransX2 ${contVisibleA[1] ? 'EfectVisible2' : ''}`}>
        <Table data={data}></Table>
      </div>
      <div ref={SRef2} className={`col-md-8 col-11 mt-3 EfectTransY ${contVisibleA[2] ? 'EfectVisible4' : ''}`}>
        <Graphic data={data.prices}></Graphic>
      </div>
      <div ref={SRef3} className={`mt-5 px-2 mb-3 EfectTransX1 ${contVisibleA[3] ? 'EfectVisible1' : ''}`}>
        <h3 className='text-center titleH3'>Quieres buscar una nueva moneda?</h3>
        <Form ></Form>
      </div>
    </div>
  )
}

export default MainPage
