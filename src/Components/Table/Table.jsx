import './table.css'
const Table = (data) => {
  return (
    <div>
      <table className='table table-bordered'>
        <thead>
          <tr className="text-center align-middle">
            <th>Nombre</th>
            <th>Logo</th>
            <th>Precio Actual</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center align-middle">
            <td>{data.data.contractName}</td>
            <td><img className='image' src={data.data.logoUrl} alt={data.contractName} /></td>
            <td>$ {data?.data?.prices?.[data.data.prices.length - 1]?.price} {data.data.quoteCurrency}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
