import { Line } from 'react-chartjs-2'
import './graphic.css'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Graphic = (data) => {
  const [scaleMin, setScaleMin] = useState(0)
  const [scaleMax, setScaleMax] = useState(0)
  const [fScale, setFScale] = useState(0)
  const dateFrom = localStorage.getItem('dateFrom')
  const dateTo = localStorage.getItem('dateTo')
  const quoteCurrency = localStorage.getItem('quoteCurrency')
  let minPrice = Number.POSITIVE_INFINITY
  let maxPrice = Number.NEGATIVE_INFINITY
  let Average = 0
  const dataFiltred = data?.data?.filter(item => {
    const dateF = new Date(item.date)
    return dateF >= new Date(dateFrom) && dateF <= new Date(dateTo)
  }).reverse()
  const price = dataFiltred?.map(item => {
    const parsedPrice = parseFloat(item.price)
    Average = Average + parsedPrice
    minPrice = Math.min(minPrice, parsedPrice)
    maxPrice = Math.max(maxPrice, parsedPrice)
    return parsedPrice
  })
  const date = dataFiltred?.map(item => item.date)
  const midata = {
    labels: date,
    datasets: [
      {
        label: 'precio',
        data: price,
        tension: 0.5,
        borderColor: 'rgba(0, 0, 116, 1)',
        pointRadius: 2,
        pointBorderColor: 'rgba(0, 0, 116, 1)',
        pointBackgroundColor: 'rgba(0, 0, 116, 1)'
      }
    ]
  }
  const misoptions = {
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        min: scaleMin,
        max: scaleMax,
        ticks: {
          color: 'rgb(0, 0, 0)'
        }
      },
      x: {
        ticks: {
          color: 'rgb(0, 0, 0)'
        }
      }
    }
  }
  const scaleInc = () => {
    if (scaleMin < scaleMax) {
      if (scaleMax - fScale <= scaleMin + fScale) {
        setScaleMin(scaleMin + (scaleMax - scaleMin) / 2 - (fScale / 10))
        setScaleMax(scaleMax - (scaleMax - scaleMin) / 2 + (fScale / 10))
      } else {
        setScaleMin(scaleMin + fScale)
        setScaleMax(scaleMax - fScale)
      }
    }
  }
  const scaleDec = () => {
    if (scaleMax > scaleMin) {
      setScaleMin(scaleMin - fScale)
      setScaleMax(scaleMax + fScale)
    }
  }
  const foco = () => {
    setScaleMin(minPrice - maxPrice / 200)
    setScaleMax(maxPrice + maxPrice / 200)
  }
  const graphicUp = () => {
    setScaleMin(scaleMin + fScale)
    setScaleMax(scaleMax + fScale)
  }
  const graphicDown = () => {
    setScaleMin(scaleMin - fScale)
    setScaleMax(scaleMax - fScale)
  }
  useEffect(() => {
    setScaleMin(minPrice - maxPrice / 200)
    setScaleMax(maxPrice + maxPrice / 200)
    setFScale(maxPrice / 200)
  }, [data])
  useEffect(() => {
  }, [scaleMin, scaleMax])

  return (
    <div className='d-flex flex-column'>
      <div className='d-flex flex-column flex-md-row justify-content-center align-items-center graphicStyle px-md-5 px-0'>
        <Line data={midata} options={misoptions} className='w-100 h-auto graphicSize'/>
        <div className='d-flex flex-md-column flex-row gap-4 mt-md-0 mt-3 mb-3 mb-md-0'>
          <button className='p-md-1 p-2 controller' onClick={scaleInc}>+</button>
          <button className='p-md-1 p-2 controller' onClick={scaleDec}>-</button>
          <button className='p-md-1 p-2 controller' onClick={foco}>Foco</button>
          <button className='p-md-1 p-2 controller' onClick={graphicUp}><i className='bi bi-caret-up-fill'></i></button>
          <button className='p-md-1 p-2 controller' onClick={graphicDown}><i className='bi bi-caret-down-fill'></i></button>
        </div>
      </div>
      <div className='mt-4'>
        <h4 className='text-center text-decoration-underline styleText fs-2'>Historicos en el pediodo seleccionado</h4>
        <ul className='list-unstyled'>
          <li className='text-center styleText fs-3'>• Precio Mínimo: {quoteCurrency} {minPrice}</li>
          <li className='text-center styleText fs-3'>• Precio Máximo: {quoteCurrency} {maxPrice}</li>
          <li className='text-center styleText fs-3'>• Precio Promedio: {quoteCurrency} {(Average / dataFiltred?.length)}</li>
        </ul>
      </div>
    </div>
  )
}

export default Graphic
