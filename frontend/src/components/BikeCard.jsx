import { Link } from 'react-router-dom'
import { Gauge, Star } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { fileUrl } from '../lib/api'

function conditionLabel(condition) {
  return {
    nuevo: 'Nueva',
    km0: 'KM 0',
    ocasion: 'Ocasión',
  }[condition] || condition
}

export default function BikeCard({ bike, style }) {
  const cover = bike.images?.[0]

  return (
    <article className="bike-card bike-card-dark animate-fade-in-up" style={style} data-testid={`bike-card-${bike.id}`}>
      <Link to={`/moto/${bike.id}`} className="bike-card-image-wrap dark-card-image-wrap">
        {cover ? <img src={fileUrl(cover)} alt={bike.title} className="bike-card-image" /> : <div className="bike-card-placeholder">Sin imagen</div>}
        <div className="bike-card-topline">
          <div className="bike-card-tags">
            <span className="bike-mini-pill">{conditionLabel(bike.condition)}</span>
            {bike.featured && (
              <span className="featured-pill compact-pill">
                <Star size={12} fill="currentColor" /> Destacada
              </span>
            )}
          </div>
          <StatusBadge status={bike.status} />
        </div>
      </Link>

      <div className="bike-card-body dark-card-body">
        <div className="bike-card-meta compact-meta">
          <span>{bike.brand || 'Moto'}</span>
          {bike.year && <span>{bike.year}</span>}
        </div>
        <h3>{bike.title}</h3>
        <div className="bike-card-footer dark-card-footer">
          <div>
            <strong>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(bike.price)}</strong>
            {bike.kilometers != null ? (
              <span className="km-badge minimal-km"><Gauge size={13} /> {bike.kilometers.toLocaleString('es-ES')} km</span>
            ) : (
              <span>{bike.model || 'Ver ficha completa'}</span>
            )}
          </div>
          <Link to={`/moto/${bike.id}`} className="details-link">Ver detalles</Link>
        </div>
      </div>
    </article>
  )
}
