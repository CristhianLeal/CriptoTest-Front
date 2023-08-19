import './mainPage.css'
import axios from 'axios'

const MainPage = () => {
  const Actualizar = async () => {
    try {
      const response = await axios.get('http://localhost:8003/')
      console.log(response.data)
    } catch (error) {
      console.error('Error', error)
    }
  }
  return (
    <div>
      <h1>Hola</h1>
      <button onClick={Actualizar}>Actualizar</button>
    </div>
  )
}

export default MainPage
