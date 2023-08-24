import './home.css'
import { Form } from '../../Components'
import { useEffect, useRef, useState } from 'react'

const Home = () => {
  const [isVisible, setIsVisible] = useState([])
  const elementRef0 = useRef(null)
  const elementRef1 = useRef(null)
  const elementRef2 = useRef(null)
  const handleScroll = () => {
    const refs = [elementRef0, elementRef1, elementRef2]
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
    handleScroll()
    window.scrollTo(0, 0)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='d-flex flex-column align-items-center conten'>
      <h1 ref={elementRef0} className={`titleH1 mt-5 text-center mb-4 effect-translateX-toLeft ${isVisible[0] ? 'EfectVisible1' : ''}`}>Bienvenidos a tu cripto historial</h1>
      <h2 ref={elementRef1} className={`titleH2 mt-3 text-center mb-5 effect-translateX-toRight ${isVisible[1] ? 'EfectVisible2' : ''}`} >El lugar donde podras saber como se comportó tu cripto favorita</h2>
      <div ref={elementRef2} className={`mt-lg-4 mt-0 effect-size ${isVisible[2] ? 'EfectVisible3' : ''} mb-4`}>
        <Form ></Form>
      </div>
    </div>
  )
}

export default Home
