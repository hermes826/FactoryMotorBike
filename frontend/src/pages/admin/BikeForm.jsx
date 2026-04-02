import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImagePlus, Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { apiFetch, fileUrl } from '../../lib/api'
import AdminLayout from './AdminLayout'

const defaultForm = {
  title: '',
  brand: '',
  model: '',
  price: '',
  year: '',
  kilometers: '',
  condition: 'ocasion',
  status: 'disponible',
  description: '',
  featured: false,
}

export default function BikeForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { token } = useAuth()
  const [form, setForm] = useState(defaultForm)
  const [images, setImages] = useState([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(isEdit)
  const [error, setError] = useState('')
  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token])

  useEffect(() => {
    if (!isEdit) return
    async function loadBike() {
      try {
        const bike = await apiFetch(`/api/bikes/${id}`, { headers: authHeaders })
        setForm({
          title: bike.title || '',
          brand: bike.brand || '',
          model: bike.model || '',
          price: bike.price ?? '',
          year: bike.year ?? '',
          kilometers: bike.kilometers ?? '',
          condition: bike.condition || 'ocasion',
          status: bike.status || 'disponible',
          description: bike.description || '',
          featured: !!bike.featured,
        })
        setImages(bike.images || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadBike()
  }, [id, isEdit])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      price: Number(form.price),
      year: form.year ? Number(form.year) : null,
      kilometers: form.kilometers ? Number(form.kilometers) : null,
    }
    try {
      const path = isEdit ? `/api/bikes/${id}` : '/api/bikes'
      const method = isEdit ? 'PUT' : 'POST'
      const result = await apiFetch(path, {
        method,
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      navigate(isEdit ? '/admin' : `/admin/bikes/${result.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const body = new FormData()
    body.append('file', file)
    await apiFetch(`/api/bikes/${id}/images`, {
      method: 'POST',
      headers: authHeaders,
      body,
    })
    const bike = await apiFetch(`/api/bikes/${id}`, { headers: authHeaders })
    setImages(bike.images || [])
    e.target.value = ''
  }

  const handleDeleteImage = async (path) => {
    await apiFetch(`/api/bikes/${id}/images/${encodeURIComponent(path).replace(/%2F/g, '/')}`, {
      method: 'DELETE',
      headers: authHeaders,
    })
    setImages((prev) => prev.filter((item) => item !== path))
  }

  return (
    <AdminLayout>
      <div className="admin-page-head">
        <div>
          <p className="eyebrow">Formulario</p>
          <h1>{isEdit ? 'Editar moto' : 'Crear moto'}</h1>
        </div>
        <Link to="/admin" className="btn-secondary">Volver</Link>
      </div>

      <div className="glass admin-form-card">
        {loading ? (
          <div className="empty-state">Cargando...</div>
        ) : (
          <form onSubmit={handleSubmit} className="admin-form-grid">
            <div>
              <label className="form-label">Título</label>
              <input className="form-input" name="title" value={form.title} onChange={onChange} required />
            </div>
            <div>
              <label className="form-label">Marca</label>
              <input className="form-input" name="brand" value={form.brand} onChange={onChange} />
            </div>
            <div>
              <label className="form-label">Modelo</label>
              <input className="form-input" name="model" value={form.model} onChange={onChange} />
            </div>
            <div>
              <label className="form-label">Precio</label>
              <input className="form-input" name="price" type="number" step="0.01" value={form.price} onChange={onChange} required />
            </div>
            <div>
              <label className="form-label">Año</label>
              <input className="form-input" name="year" type="number" value={form.year} onChange={onChange} />
            </div>
            <div>
              <label className="form-label">Kilómetros</label>
              <input className="form-input" name="kilometers" type="number" value={form.kilometers} onChange={onChange} />
            </div>
            <div>
              <label className="form-label">Condición</label>
              <select className="form-input" name="condition" value={form.condition} onChange={onChange}>
                <option value="nuevo">Nuevo</option>
                <option value="km0">KM 0</option>
                <option value="ocasion">Ocasión</option>
              </select>
            </div>
            <div>
              <label className="form-label">Estado</label>
              <select className="form-input" name="status" value={form.status} onChange={onChange}>
                <option value="disponible">Disponible</option>
                <option value="reservada">Reservada</option>
                <option value="vendida">Vendida</option>
              </select>
            </div>
            <div className="full-span">
              <label className="form-label">Descripción</label>
              <textarea className="form-input" rows="6" name="description" value={form.description} onChange={onChange} required />
            </div>
            <div className="checkbox-row full-span">
              <input id="featured" type="checkbox" name="featured" checked={form.featured} onChange={onChange} />
              <label htmlFor="featured">Marcar como destacada</label>
            </div>
            {error && <div className="error-text full-span">{error}</div>}
            <div className="full-span form-actions">
              <button className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear moto'}</button>
            </div>
          </form>
        )}
      </div>

      {isEdit && (
        <div className="glass admin-form-card image-manager">
          <div className="image-manager-head">
            <div>
              <p className="eyebrow">Galería</p>
              <h2>Imágenes</h2>
            </div>
            <label className="btn-secondary upload-btn">
              <ImagePlus size={16} /> Subir imagen
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </label>
          </div>
          <div className="admin-image-grid">
            {images.length ? (
              images.map((path) => (
                <div key={path} className="admin-image-card">
                  <img src={fileUrl(path)} alt="Moto" />
                  <button className="icon-btn danger floating" onClick={() => handleDeleteImage(path)}><Trash2 size={16} /></button>
                </div>
              ))
            ) : (
              <div className="empty-state">Todavía no hay imágenes.</div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
