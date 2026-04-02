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
            <h1>Recogida</h1>
            <p>  
              <br></br>
            </p>
         

            <div className="info-page-content">
              <b>¿Se hacen envíos a domicilio?</b>
              <p>No, la entrega se realiza únicamente en tienda.</p>
              <b>¿Dónde se recoge?</b>
              <p>En nuestro concesionario.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}