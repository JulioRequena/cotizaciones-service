import React, { useEffect, useState } from 'react'
import CotizacionesList from './components/CotizacionesList'

function App() {
  const [cotizaciones, setCotizaciones] = useState([])

  useEffect(() => {
    fetch('/api/cotizaciones')
      .then(res => res.json())
      .then(data => setCotizaciones(data))
      .catch(err => console.error('Error al obtener cotizaciones:', err))
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📈 Cotizaciones</h1>
      <CotizacionesList cotizaciones={cotizaciones} />
    </div>
  )
}

export default App
