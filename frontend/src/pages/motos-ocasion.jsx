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
            <h1>Motos de Ocasión</h1>

            <div className="info-page-content">
              <p></p>

<b>¿Las motos usadas están revisadas?</b>

<p>Sí, todas nuestras motos usadas pasan por una revisión previa para garantizar su correcto funcionamiento y estado antes de la venta.</p>

<b>¿Se puede entregar una moto como parte del pago?</b>

<p>Sí, aceptamos tu moto como parte del pago, previa valoración.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}