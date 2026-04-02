import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginModal({ open, onClose }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      onClose()
      window.location.href = '/admin'
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>
        <p className="eyebrow">Panel privado</p>
        <h2>Iniciar sesión</h2>
        <p className="modal-copy">Accede al panel de administración para gestionar las motos, imágenes y datos de contacto.</p>
        <form onSubmit={handleSubmit} className="admin-form-grid">
          <div>
            <label className="form-label">Email</label>
            <input className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>
          <div>
            <label className="form-label">Contraseña</label>
            <input className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>
          {error && <div className="error-text">{error}</div>}
          <button className="btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
