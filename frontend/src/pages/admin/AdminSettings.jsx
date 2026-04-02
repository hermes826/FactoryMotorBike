import { useEffect, useMemo, useState } from 'react'
import AdminLayout from './AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { apiFetch } from '../../lib/api'

export default function AdminSettings() {
  const { token } = useAuth()
  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token])
  const [form, setForm] = useState({ whatsapp: '', address: '', email: '', promotion: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      const data = await apiFetch('/api/contact')
      setForm(data)
      setLoading(false)
    }
    load()
  }, [])

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    await apiFetch('/api/contact', {
      method: 'PUT',
      headers: { ...authHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setMessage('Configuración guardada correctamente')
  }

  return (
    <AdminLayout>
      <div className="admin-page-head">
        <div>
          <p className="eyebrow">Ajustes</p>
          <h1>Configuración de contacto</h1>
        </div>
      </div>
      <div className="glass admin-form-card">
        {loading ? (
          <div className="empty-state">Cargando...</div>
        ) : (
          <form onSubmit={onSubmit} className="admin-form-grid">
            <div>
              <label className="form-label">WhatsApp</label>
              <input className="form-input" name="whatsapp" value={form.whatsapp} onChange={onChange} />
            </div>
            <div>
              <label className="form-label">Email</label>
              <input className="form-input" name="email" type="email" value={form.email} onChange={onChange} />
            </div>
            <div className="full-span">
              <label className="form-label">Dirección</label>
              <input className="form-input" name="address" value={form.address} onChange={onChange} />
            </div>
            <div className="full-span">
              <label className="form-label">Promoción activa</label>
              <textarea className="form-input" rows="4" name="promotion" value={form.promotion} onChange={onChange} />
            </div>
            {message && <div className="success-text full-span">{message}</div>}
            <div className="full-span form-actions">
              <button className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar configuración'}</button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  )
}
