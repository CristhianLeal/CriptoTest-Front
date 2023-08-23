import './home.css'
import Form from '../../Components/Form/Form'
import { useEffect, useRef, useState } from 'react'
const Home = () => {
  const [, setVisible] = useState(false)
  const [contVisibleA, setContVisibleA] = useState([])
  const SRef0 = useRef(null)
  const SRef1 = useRef(null)
  const SRef2 = useRef(null)
  const handleScroll = () => {
    const refs = [SRef0, SRef1, SRef2]
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

  return (
    <div className='d-flex flex-column align-items-center conten'>
      <h1 ref={SRef0} className={`titleH1 mt-5 text-center mb-4 EfectTransX1 ${contVisibleA[0] ? 'EfectVisible1' : ''}`}>Bienvenidos a tu cripto historial</h1>
      <h2 ref={SRef1} className={`titleH2 mt-3 text-center mb-5 EfectTransX2 ${contVisibleA[1] ? 'EfectVisible2' : ''}`} >El lugar donde podras saber como se comportó tu cripto favorita</h2>
      <div ref={SRef2} className={`mt-lg-4 mt-0 EfectSize ${contVisibleA[2] ? 'EfectVisible3' : ''} mb-4`}>
        <Form ></Form>
      </div>
    </div>
  )
}

export default Home
