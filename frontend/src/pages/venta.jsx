import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function SegurosMoto() {
  return (
    <div className="site-shell home-dark">
      <main className="info-page">
        <div className="container info-page-container">
          <Link to="/" className="back-link">
            <ChevronLeft size={18} /> Volver al inicio
          </Link>

          <section className="info-page-card">
            <p className="eyebrow">Información</p>
            <h1>Venta</h1>
            <br></br>
            <div className="info-page-content">
              <b>¿Cómo puedo vender mi moto?</b>
              <p>
                Debes ponerte en contacto con nosotros y acudir a tienda para realizar la valoración.
              </p>
              <b>¿Se puede hacer la tasación online?</b>
              <p>No, la valoración es presencial.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}