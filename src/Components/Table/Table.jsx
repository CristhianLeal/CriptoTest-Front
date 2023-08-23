import './table.css'

const Table = (data) => {
  return (
    <div className="table-container">
      <table className="styled-table">
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
            <td><img className="image" src={data.data.logoUrl} alt={data.data.contractName} /></td>
            <td>$ {data?.data?.prices?.[data.data.prices.length - 1]?.price} {data.data.quoteCurrency}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table
