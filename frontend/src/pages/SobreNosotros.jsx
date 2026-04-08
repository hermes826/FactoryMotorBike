import { Link } from 'react-router-dom'
import { ChevronLeft, MapPin, Phone } from 'lucide-react'

export default function SobreNosotros() {
  return (
    <div className="site-shell home-dark">
      <main className="about-page">
        <div className="container about-container">
          <Link to="/" className="back-link">
            <ChevronLeft size={18} /> Volver al inicio
          </Link>

          <section className="about-hero-block">
            <p className="eyebrow">Sobre nosotros</p>
            <h1>Factory Motor Bike</h1>
            <p className="about-lead">
              Somos una tienda especializada en motos en La Laguna, Tenerife.
              Trabajamos con motos de ocasión, km 0 y multimarca, buscando siempre
              ofrecer un trato cercano, transparencia y un catálogo bien seleccionado.
            </p>
          </section>

          <section className="about-grid">
            <article className="about-card">
              <h2>Nuestra filosofía</h2>
              <p>
                Queremos que comprar o vender una moto sea un proceso claro,
                cómodo y con confianza. Nos gusta asesorar bien a cada cliente y
                ayudarle a encontrar una moto que encaje con lo que necesita.
              </p>
            </article>

            <article className="about-card">
              <h2>Qué ofrecemos</h2>
              <p>
                Trabajamos con motos revisadas, opciones de ocasión y unidades
                seleccionadas. También atendemos consultas sobre venta de motos,
                documentación y orientación básica durante el proceso.
              </p>
            </article>

            <article className="about-card">
              <h2>Dónde estamos</h2>
              <p className="about-inline">
                <MapPin size={16} />  C. Juana Blanca, 43, 38203 La Laguna
              </p>
              <p className="about-inline">
                <Phone size={16} /> 922 888 020
              </p>
            </article>
          </section>

          <section className="about-story">
            <h2>Más sobre nuestro proyecto</h2>
            <p>
              En Factory Motor Bike apostamos por una atención directa y una
              selección de motos pensada para quienes buscan calidad, confianza y
              buen acompañamiento antes y después de la compra.
            </p>
            <p>
              Nuestro objetivo es convertirnos en un punto de referencia para
              motoristas en Tenerife, ofreciendo una experiencia seria, cercana y
              profesional.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
