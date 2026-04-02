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
            <h1>Garantía</h1>
            <p className="info-page-lead">
              En Factory Motor Bike trabajamos para ofrecer motos en buen estado y con total transparencia, por eso todas nuestras motos de ocasión incluyen garantía conforme a la normativa vigente.
            </p>

            <div className="info-page-content">
              <p>
                Nuestro objetivo es que compres con tranquilidad y confianza. Antes de la entrega, revisamos cada moto para asegurarnos de que cumple con unos estándares mínimos de funcionamiento y seguridad. Aun así, si surge cualquier problema cubierto por la garantía, nos comprometemos a darte una solución de forma rápida y profesional.
              </p>
              <p>
                La garantía cubre defectos mecánicos no derivados del uso indebido, desgaste normal o mantenimiento incorrecto. En caso de incidencia, es importante contactar con nosotros lo antes posible para poder evaluar la situación y proceder según corresponda.
              </p>
              <p>
                Si tienes cualquier duda sobre la cobertura, duración o condiciones específicas, estaremos encantados de explicártelo de forma clara antes de la compra.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}