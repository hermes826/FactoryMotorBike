import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Phone, Search, SlidersHorizontal } from 'lucide-react'
import BikeCard from '../components/BikeCard'
import LoginModal from '../components/LoginModal'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../lib/api'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [bikes, setBikes] = useState([])
  const [contact, setContact] = useState(null)
  const [filter, setFilter] = useState('todas')
  const [showLogin, setShowLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [brandFilter, setBrandFilter] = useState('todas')
  const [conditionFilter, setConditionFilter] = useState('todas')
  const [sortBy, setSortBy] = useState('recentes')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [bikesData, contactData] = await Promise.all([
          apiFetch('/api/bikes'),
          apiFetch('/api/contact')
        ])
        setBikes(bikesData)
        setContact(contactData)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const brands = useMemo(() => {
    const unique = [...new Set(bikes.map((bike) => bike.brand).filter(Boolean))]
    return unique.sort((a, b) => a.localeCompare(b, 'es'))
  }, [bikes])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    const results = bikes.filter((bike) => {
      const matchesStatus = filter === 'todas' ? true : bike.status === filter
      const matchesBrand = brandFilter === 'todas' ? true : bike.brand === brandFilter
      const matchesCondition = conditionFilter === 'todas' ? true : bike.condition === conditionFilter

      const haystack = [
        bike.title,
        bike.brand,
        bike.model,
        String(bike.year || ''),
        bike.description
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesQuery = !query || haystack.includes(query)

      return matchesStatus && matchesBrand && matchesCondition && matchesQuery
    })

    results.sort((a, b) => {
      switch (sortBy) {
        case 'precio-asc':
          return a.price - b.price
        case 'precio-desc':
          return b.price - a.price
        case 'anio-desc':
          return (b.year || 0) - (a.year || 0)
        default:
          return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      }
    })

    return results
  }, [bikes, filter, brandFilter, conditionFilter, search, sortBy])

  return (
    <div className="site-shell home-dark">
      <header className="home-hero">
        <div className="hero-overlay" />

        <div className="hero-topbar">
          {isAuthenticated ? (
            <Link to="/admin" className="hero-login-link" data-testid="admin-link">
              Panel admin
            </Link>
          ) : (
            <button
              className="hero-login-link"
              data-testid="login-button"
              onClick={() => setShowLogin(true)}
            >
              Iniciar sesión
            </button>
          )}
        </div>

        <div className="container hero-inner">
          <div className="hero-copy-block animate-fade-in-up">
            <p className="hero-location">La Laguna, Tenerife</p>
            <h1>Factory Motor Bike</h1>
            <p className="hero-subtitle">
              Tu tienda de motos en La Laguna. Motos de ocasión, km 0 y multimarca.
            </p>

            <div className="hero-actions">
              <a href="#catalogo" className="btn-primary" data-testid="ver-motos-btn">
                Ver motos disponibles <ChevronDown size={16} />
              </a>

              <details className="demo-bike-dropdown">
                <summary className="demo-bike-summary">
                  <span>Demo Bike - Reserva tu prueba de moto BSA</span>
                  <ChevronDown size={16} />
                </summary>

                <div className="demo-bike-menu">
                  <a href="mailto:factorymotorbike@hotmail.com" className="demo-bike-link">
                    Correo: factorymotorbike@hotmail.com
                  </a>

                  <a
                    href="https://wa.me/34666208341?text=Hola,%20quiero%20reservar%20una%20prueba%20de%20moto%20BSA"
                    className="demo-bike-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp Demo Bike
                  </a>
                </div>
              </details>
            </div>

            <div className="contact-actions">
              <details className="contact-hours-dropdown">
                <summary>Horario</summary>
                <div className="contact-hours-menu">
                  <div><strong>Lunes</strong><span>10:00–13:00, 17:00–20:00</span></div>
                  <div><strong>Martes</strong><span>10:00–13:00, 17:00–20:00</span></div>
                  <div><strong>Miércoles</strong><span>10:00–13:30, 17:00–20:00</span></div>
                  <div><strong>Jueves</strong><span>10:00–13:00, 17:00–20:00</span></div>
                  <div><strong>Viernes</strong><span>10:00–13:00, 17:00–20:00</span></div>
                  <div><strong>Sábado</strong><span>10:00–13:00</span></div>
                  <div><strong>Domingo</strong><span>Cerrado</span></div>
                </div>
              </details>
            </div>
          </div>
        </div>

        <a className="hero-scroll-indicator" href="#catalogo" aria-label="Ir al catálogo">
          <ChevronDown size={18} />
        </a>
      </header>

      <main>
        <section className="catalog-section container" id="catalogo">
          <div className="section-heading dark-heading">
            <div>
              <p className="eyebrow">Catálogo</p>
              <h2>Nuestras Motos</h2>
            </div>
          </div>

          <div className="filters filters-status">
            {['todas', 'disponible', 'reservada', 'vendida'].map((status) => (
              <button
                key={status}
                className={`filter-pill ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
                data-testid={`filter-${status}`}
              >
                {status === 'todas'
                  ? 'Todas'
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="catalog-toolbar glass">
            <div className="catalog-search">
              <Search size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por marca, modelo, título o año"
              />
            </div>

            <div className="toolbar-selects">
              <label className="toolbar-select">
                <SlidersHorizontal size={16} />
                <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                  <option value="todas">Todas las marcas</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </label>

              <label className="toolbar-select">
                <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)}>
                  <option value="todas">Todas las condiciones</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Km0">KM 0</option>
                  <option value="Ocasión">Ocasión</option>
                </select>
              </label>

              <label className="toolbar-select">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="recentes">Más recientes</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="anio-desc">Año: más nuevas</option>
                </select>
              </label>
            </div>
          </div>

          <div className="results-row">
            <span>
              {filtered.length} moto{filtered.length === 1 ? '' : 's'} encontradas
            </span>

            {(search || brandFilter !== 'todas' || conditionFilter !== 'todas') && (
              <button
                className="clear-filters"
                onClick={() => {
                  setSearch('')
                  setBrandFilter('todas')
                  setConditionFilter('todas')
                  setSortBy('recentes')
                }}
              >
                Limpiar búsqueda
              </button>
            )}
          </div>

          <div className="catalog-grid catalog-grid-home">
            {loading ? (
              <div className="empty-state dark-empty">Cargando catálogo...</div>
            ) : filtered.length ? (
              filtered.map((bike, index) => (
                <BikeCard
                  key={bike.id}
                  bike={bike}
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))
            ) : (
              <div className="empty-state dark-empty">
                No hay motos que coincidan con esos filtros.
              </div>
            )}
          </div>
        </section>

        <section className="contact-section-dark">
          <div className="container contact-grid-3">
            <article className="info-card">
              <p className="eyebrow">Ayuda</p>
              <h2>Preguntas frecuentes</h2>

              <div className="info-links">
                <Link to="/financiacion" className="info-link-btn">
                  Financiación
                </Link>

                <Link to="/seguros-moto" className="info-link-btn">
                  Garantía
                </Link>
                <Link to="/mantenimiento-basico" className="info-link-btn">
                  Compra
                </Link>
                <Link to="/motos-ocasion" className="info-link-btn">
                  Motos Ocasión
                </Link>
                <Link to="/venta" className="info-link-btn">
                  Venta
                </Link>
                <Link to="/recogida" className="info-link-btn">
                  Recogida
                </Link>
              </div>
            </article>

            <article className="info-card info-card-featured">
              <p className="eyebrow">Contacto</p>
              <h2>Visítanos</h2>

              {contact?.whatsapp && (
                <a
                  href={`https://wa.me/34${contact.whatsapp}`}
                  className="btn-whatsapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Phone size={17} /> WhatsApp: {contact.whatsapp}
                </a>
              )}

              <p></p>

              <a href="tel:+34922888020" className="contact-phone-box">
                <Phone size={17} /> Teléfono fijo: 922 888 020
              </a>

              <a href="/sobre-nosotros" className="info-link-text">
                Más sobre nosotros
              </a>
            </article>

            <article className="info-card">
              <p className="eyebrow">Compra / Venta</p>
              <h2>¿Quieres vender tu moto?</h2>
              <p className="info-card-text">
                Si quieres vender tu moto, ponte en contacto con nosotros y valoraremos tu caso
                para darte una propuesta.
              </p>

              <a href="mailto:factorymotorbike@hotmail.com" className="btn-primary">
                Contáctanos
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="home-footer">© 2026 Factory Motor Bike. Todos los derechos reservados.</footer>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  )
}
