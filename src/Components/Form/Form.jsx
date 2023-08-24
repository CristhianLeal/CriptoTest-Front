import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import './form.css'
import { toast } from 'react-toastify'

const Form = () => {
  const [dateFinal, setDateFinal] = useState(null)
  const [dateInitial, setDateInitial] = useState(null)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:8003/', data)
      if (data.cripto === 'eth-mainnet') {
        localStorage.setItem('cripto', 'Ether')
      } else if (data.cripto === 'matic-mainnet') {
        localStorage.setItem('cripto', 'Matic Token')
      }
      localStorage.setItem('quoteCurrency', data.quoteCurrency)
      localStorage.setItem('dateFrom', data.dateFrom)
      localStorage.setItem('dateTo', data.dateTo)
      window.location.href = '/mainpage'
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Error', error)
    }
    reset()
  }
  return (
    <div className='form p-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column align-items-center total'>
        <div className='form-group'>
          <label className='px-2'>Seleccioná tu cripto: </label>
          <select
            name='cripto'
            className={`${errors?.cripto ? 'is-invalid' : ''}`}
            {...register('cripto', { required: 'cripto is required' })}
            >
            <option value='eth-mainnet'>Ether</option>
            <option value='matic-mainnet'>Polygon</option>
          </select>
          {errors.cripto && <span className='error'>{errors.cripto.message}</span>}
        </div>
        <div className='form-group mt-3'>
          <label className='px-2'>Seleccioná tu moneda: </label>
          <select
            name='quoteCurrency'
            className={`${errors?.quoteCurrency ? 'is-invalid' : ''}`}
            {...register('quoteCurrency', { required: 'El tipo de moneda es requerido' })}
            >
            <option value='USD'>USD</option>
            <option value='GBP'>GBP</option>
            <option value='EUR'>EURO</option>
          </select>
          {errors.quoteCurrency && <span className='error'>{errors.quoteCurrency.message}</span>}
        </div>
        <div className='form-group mt-3'>
          <label>Fecha desde:</label>
          <input
          type='date'
          name='dateFrom'
          className='form-control'
          {...register('dateFrom', {
            required: 'Ingrese una fecha',
            validate: (value) => {
              const selectedDate = new Date(value)
              if (selectedDate > yesterday) {
                return 'La fecha debe ser menor que el dia de ayer'
              } else if (selectedDate.toISOString().split('T')[0] >= dateFinal) {
                return 'La fecha no debe ser mayor que la final'
              }
              setDateInitial(value)
              return true
            }
          })}
          />
          {errors.dateFrom && <span className='error'>{errors.dateFrom.message}</span>}
        </div>
        <div className='form-group mt-3'>
          <label>Fecha hasta:</label>
          <input
          type='date'
          name='dateTo'
          className='form-control'
          {...register('dateTo', {
            required: 'Ingrese una fecha',
            validate: (value) => {
              const selectedDate = new Date(value)
              setDateFinal(value)
              const maxDate = new Date(dateInitial)
              maxDate.setFullYear(maxDate.getFullYear() + 1)
              if (selectedDate > today) {
                return 'La fecha no debe ser mayor al dia de hoy'
              } else if (selectedDate.toISOString().split('T')[0] < dateInitial) {
                return 'La fecha no debe ser menor que el dia desde'
              } else if (selectedDate > maxDate) {
                return 'El historico no puede ser mayor que 1 año'
              }
              setDateFinal(value)
              return true
            }
          })}
          />
          {errors.dateTo && <span className='error'>{errors.dateTo.message}</span>}
        </div>
        <button type='submit' className='p-2 mt-3 controller'>Historico</button>
      </form>
    </div>
  )
}

export default Form
