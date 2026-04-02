import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function MantenimientoBasico() {
  return (
    <div className="site-shell home-dark">
      <main className="info-page">
        <div className="container info-page-container">
          <Link to="/" className="back-link">
            <ChevronLeft size={18} /> Volver al inicio
          </Link>

          <section className="info-page-card">
            <p className="eyebrow">Información</p>
            <h1>Compra</h1>

            <div className="info-page-content">
              <p></p>

<b>¿Qué incluye el precio de la moto?</b>

<p>Incluye impuestos, matriculación y traspaso.</p>

<b>¿Se puede reservar una moto?</b>

<p>Si, puedes reservarla mediante el pago de un depósito.</p>

<b>¿Se pueden probar las motos?</b>
<p>No, salvo casos excepcionales con motos de demo nuevas.</p>
<b>¿Qué documentación es necesaria para el contrato de compra-venta?</b>
<p>Tu documento de identificación.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}