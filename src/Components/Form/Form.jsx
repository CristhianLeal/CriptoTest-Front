import { useForm } from 'react-hook-form'
import { useState } from 'react'
import './form.css'

const Form = () => {
  const [dateN, setDateN] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    // reset()
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column align-items-center'>
        <div className="form-group">
          <label className='px-2'>Seleccioná tu cripto: </label>
          <select
            name="cripto"
            className={`${errors?.cripto ? 'is-invalid' : ''}`}
            {...register('cripto', { required: 'cripto is required' })}
            >
            <option value="eth-mainnet">Ether</option>
            <option value="matic-mainnet">Polygon</option>
          </select>
          {errors.cripto && <span className="error">{errors.cripto.message}</span>}
        </div>
        <div className="form-group mt-3">
          <label className='px-2'>Seleccioná tu moneda: </label>
          <select
            name="moneda"
            className={`${errors?.moneda ? 'is-invalid' : ''}`}
            {...register('moneda', { required: 'moneda is required' })}
            >
            <option value="USD">USD</option>
            <option value="PESO">PESO</option>
            <option value="EUR">EURO</option>
          </select>
          {errors.moneda && <span className="error">{errors.moneda.message}</span>}
        </div>
        <div className="form-group mt-3">
          <label>Fecha hasta:</label>
          <input
          type='date'
          name='dateTo'
          className="form-control"
          {...register('dateTo', {
            required: 'Ingrese una fecha',
            validate: (value) => {
              const today = new Date()
              const selectedDate = new Date(value)
              if (selectedDate > today) {
                return 'La fecha no debe ser mayor al dia de hoy'
              }
              setDateN(value)
              return true
            }
          })}
          />
          {errors.dateTo && <span className="error">{errors.dateTo.message}</span>}
        </div>
        <div className="form-group mt-3">
          <label>Fecha desde:</label>
          <input
          type="date"
          name='dateFrom'
          className="form-control"
          {...register('dateFrom', {
            required: 'Ingrese una fecha',
            validate: (value) => {
              const yesterday = new Date()
              yesterday.setDate(yesterday.getDate() - 1)
              const selectedDate = new Date(value)
              const maxDate = new Date(dateN)
              maxDate.setDate(maxDate.getDate() - 30)
              if (selectedDate > yesterday) {
                return 'La fecha debe ser menor que el dia de ayer'
              } else if (selectedDate.toISOString().split('T')[0] >= dateN) {
                return 'La fecha no debe ser mayor que la final'
              } else if (selectedDate < maxDate) {
                return 'El historico no puede ser mayor que 30 días'
              }
              return true
            }
          })}
          />
          {errors.dateFrom && <span className="error">{errors.dateFrom.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">Historico</button>
      </form>
    </div>
  )
}

export default Form
