import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function Financiacion() {
  return (
    <div className="site-shell home-dark">
      <main className="info-page">
        <div className="container info-page-container">
          <Link to="/" className="back-link">
            <ChevronLeft size={18} /> Volver al inicio
          </Link>

          <section className="info-page-card">
            <p className="eyebrow">Información</p>
            <h1>Financiación</h1>
            <p className="info-page-lead">
              Te ayudamos a estudiar opciones de financiación para que puedas encontrar una fórmula de pago cómoda y adaptada a tu situación.
            </p>

            <div className="info-page-content">
              <p>
                En Factory Motor Bike queremos ponerte las cosas fáciles. Podemos orientarte sobre distintas posibilidades de financiación según el tipo de moto, el importe y tus necesidades.
              </p>
              <p>
                Aquí puedes explicar más adelante qué documentación pedís, plazos aproximados, importes mínimos y cualquier condición que quieras mostrar a tus clientes.
              </p>
              <p>
                Si quieres información personalizada, ponte en contacto con nosotros y te ayudaremos a valorar la mejor opción.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}