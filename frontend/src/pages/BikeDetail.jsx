import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Gauge, Calendar, ShieldCheck, X } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'
import { apiFetch, fileUrl } from '../lib/api'

export default function BikeDetail() {
  const { id } = useParams()
  const [bike, setBike] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showImageModal, setShowImageModal] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [bikeData, contactData] = await Promise.all([
          apiFetch(`/api/bikes/${id}`),
          apiFetch('/api/contact')
        ])
        setBike(bikeData)
        setSelectedImage(bikeData.images?.[0] || '')
        setContact(contactData)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="page-loader">Cargando moto...</div>
  if (!bike) return <div className="page-loader">Moto no encontrada</div>

  return (
    <div className="detail-page">
      <div className="container detail-header">
        <Link to="/" className="ghost-link inline-link">
          <ChevronLeft size={16} /> Volver al catálogo
        </Link>
      </div>

      <div className="container detail-layout">
        <div className="detail-media glass">
          <div className="detail-main-image">
            {selectedImage ? (
              <button
                type="button"
                className="detail-image-open"
                onClick={() => setShowImageModal(true)}
                aria-label="Abrir imagen en grande"
              >
                <img src={fileUrl(selectedImage)} alt={bike.title} />
              </button>
            ) : (
              <div className="bike-card-placeholder">Sin imagen</div>
            )}
          </div>

          <div className="detail-thumbs">
            {bike.images?.map((img) => (
              <button
                key={img}
                onClick={() => setSelectedImage(img)}
                className={selectedImage === img ? 'thumb active' : 'thumb'}
                type="button"
              >
                <img src={fileUrl(img)} alt="Vista" />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <div className="detail-topline">
            <StatusBadge status={bike.status} />
            {bike.featured && <span className="featured-pill">Destacada</span>}
          </div>

          <h1>{bike.title}</h1>

          <div className="price-xl">
            {new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR'
            }).format(bike.price)}
          </div>

          <p className="detail-description">{bike.description}</p>

          <div className="spec-grid">
            <div>
              <Calendar size={18} />
              <span>Año</span>
              <strong>{bike.year || '—'}</strong>
            </div>

            <div>
              <Gauge size={18} />
              <span>Kilómetros</span>
              <strong>
                {bike.kilometers != null
                  ? `${bike.kilometers.toLocaleString('es-ES')} km`
                  : '—'}
              </strong>
            </div>

            <div>
              <ShieldCheck size={18} />
              <span>Condición</span>
              <strong>{bike.condition}</strong>
            </div>

            <div>
              <ShieldCheck size={18} />
              <span>Marca / Modelo</span>
              <strong>{[bike.brand, bike.model].filter(Boolean).join(' ') || '—'}</strong>
            </div>
          </div>

          <div className="detail-actions">
            {contact?.whatsapp && (
              <a
                href={`https://wa.me/34${contact.whatsapp}`}
                className="btn-whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                Consultar por WhatsApp
              </a>
            )}

            {contact?.email && (
              <a href={`mailto:${contact.email}`} className="btn-secondary">
                Solicitar más información
              </a>
            )}
          </div>
        </div>
      </div>

      {showImageModal && selectedImage && (
        <div
          className="image-lightbox"
          onClick={() => setShowImageModal(false)}
        >
          <button
            type="button"
            className="image-lightbox-close"
            onClick={() => setShowImageModal(false)}
            aria-label="Cerrar imagen"
          >
            <X size={22} />
          </button>

          <div
            className="image-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={fileUrl(selectedImage)} alt={bike.title} />
          </div>
        </div>
      )}
    </div>
  )
}