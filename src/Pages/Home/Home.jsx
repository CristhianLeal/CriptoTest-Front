import './home.css'
import Form from '../../Components/Form/Form'
const Home = () => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1 className='mt-5 text-center'>Bienvenidos a cotizador de cripto</h1>
      <h2 className='mt-3 text-center'>El lugar donde podras saber si es conveniente o no invertir</h2>
      <Form ></Form>
    </div>
  )
}

export default Home
