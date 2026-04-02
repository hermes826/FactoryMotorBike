import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MoreHorizontal, Plus, Star, Trash2, Pencil } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../lib/api'
import AdminLayout from './AdminLayout'
import StatusBadge from '../../components/StatusBadge'

export default function AdminDashboard() {
  const { token } = useAuth()
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token])

  const loadBikes = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await apiFetch('/api/bikes', { headers: authHeaders })
      setBikes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBikes()
  }, [])

  const stats = {
    total: bikes.length,
    disponible: bikes.filter((b) => b.status === 'disponible').length,
    reservada: bikes.filter((b) => b.status === 'reservada').length,
    vendida: bikes.filter((b) => b.status === 'vendida').length,
  }

  const removeBike = async (bikeId) => {
    if (!window.confirm('¿Eliminar esta moto?')) return
    await apiFetch(`/api/bikes/${bikeId}`, { method: 'DELETE', headers: authHeaders })
    await loadBikes()
  }

  const toggleFeatured = async (bike) => {
    await apiFetch(`/api/bikes/${bike.id}`, {
      method: 'PUT',
      headers: { ...authHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !bike.featured }),
    })
    await loadBikes()
  }

  return (
    <AdminLayout>
      <div className="admin-page-head">
        <div>
          <p className="eyebrow">Panel privado</p>
          <h1>Dashboard</h1>
        </div>
        <Link to="/admin/bikes/new" className="btn-primary"><Plus size={18} /> Añadir Moto</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><span>Total</span><strong>{stats.total}</strong></div>
        <div className="stat-card"><span>Disponibles</span><strong>{stats.disponible}</strong></div>
        <div className="stat-card"><span>Reservadas</span><strong>{stats.reservada}</strong></div>
        <div className="stat-card"><span>Vendidas</span><strong>{stats.vendida}</strong></div>
      </div>

      <div className="admin-table-wrap glass">
        <div className="admin-table-head">
          <h2>Motos</h2>
          <button className="btn-secondary"><MoreHorizontal size={16} /> Vista general</button>
        </div>
        {loading ? (
          <div className="empty-state">Cargando motos...</div>
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : bikes.length ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Marca</th>
                <th>Destacada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike) => (
                <tr key={bike.id}>
                  <td>
                    <strong>{bike.title}</strong>
                    <span>{bike.year || '—'} · {bike.model || 'Sin modelo'}</span>
                  </td>
                  <td>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(bike.price)}</td>
                  <td><StatusBadge status={bike.status} /></td>
                  <td>{bike.brand || '—'}</td>
                  <td>{bike.featured ? 'Sí' : 'No'}</td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/admin/bikes/${bike.id}`} className="icon-btn"><Pencil size={16} /></Link>
                      <button className="icon-btn" onClick={() => toggleFeatured(bike)} title="Destacar"><Star size={16} /></button>
                      <button className="icon-btn danger" onClick={() => removeBike(bike.id)} title="Eliminar"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">No hay motos creadas todavía.</div>
        )}
      </div>
    </AdminLayout>
  )
}
