import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { format } from 'date-fns'
import 'react-toastify/dist/ReactToastify.css'
import './form.css'

const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    const formattedDate = format(new Date(data.date), 'yyyy/MM/dd')
    try {
      const response = await axios.post('http://localhost:8003/', {
        city: data.city,
        date: formattedDate
      })
      toast.success('Formulario enviado exitosamente', {
        position: 'top-center',
        autoClose: 1500
      })
      console.log(response)
      reset()
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
      toast.error(`Ocurrió un error al enviar el formulario:${error.response.data.message} `, {
        position: 'top-center',
        autoClose: 1500
      })
    }
  }

  return (
    <div className="login-container mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <div className="login-form">
              <h2 className='text-center'>Donde quieres saber el pronostico?</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group text-center">
                  <label>Ciudad</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese la ciudad"
                    {...register('city', {
                      required: 'La ciudad es requerida',
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: 'Ingrese solo letras en el campo de ciudad'
                      },
                      minLength: {
                        value: 4,
                        message: '4 es el minimo de letras en el campo de ciudad'
                      }
                    })}
                  />
                  {errors.city && <span className="error">{errors.city.message}</span>}
                </div>

                <div className="form-group text-center">
                  <label>Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register('date', {
                      required: 'Ingrese una fecha',
                      validate: (value) => {
                        const selectedDate = new Date(value)
                        const minDate = new Date('2010-01-01')
                        const MaxDate = new Date(new Date().getTime() + 300 * 24 * 60 * 60 * 1000)
                        if (selectedDate < minDate) {
                          return 'La fecha debe ser a partir del 1 de enero de 2010'
                        } else if (selectedDate > MaxDate) {
                          return 'La fecha debe ser menor que 300 días adelante'
                        }
                        return true
                      }
                    })}
                  />
                  {errors.date && <span className="error">{errors.date.message}</span>}
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-primary" type="submit">
                    Mira tu pronostico!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Form
