import { Link } from 'react-router-dom'
import './home.css'
const Home = () => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1 className='mt-5'>Bienvenidos a cotizador de cripto</h1>
        <h2 className='mt-3'>El lugar donde podras saber si es conveniente o no invertir</h2>
        <button className='butt mt-4'>
          <Link to='/mainpage'>Pagina Principal</Link>
        </button>
    </div>
  )
}

export default Home
