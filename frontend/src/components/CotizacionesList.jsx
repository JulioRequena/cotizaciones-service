import React from 'react'

function CotizacionesList({ cotizaciones }) {
  if (!cotizaciones.length) return <p>Cargando cotizaciones...</p>

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Moneda</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {cotizaciones.map((c, i) => (
          <tr key={i}>
            <td>{c.nombre}</td>
            <td>{c.valor}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CotizacionesList
