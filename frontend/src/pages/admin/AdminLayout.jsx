import { LayoutDashboard, Bike, Settings, LogOut } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLayout({ children }) {
  const { logout, admin } = useAuth()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-logo">Factory Motor Bike</Link>
        <nav className="admin-nav">
          <NavLink to="/admin" end><LayoutDashboard size={18} /> Dashboard</NavLink>
          <NavLink to="/admin/bikes/new"><Bike size={18} /> Añadir moto</NavLink>
          <NavLink to="/admin/settings"><Settings size={18} /> Configuración</NavLink>
        </nav>
        <div className="admin-user-card glass">
          <span>Sesión iniciada</span>
          <strong>{admin?.email}</strong>
          <button className="btn-secondary" onClick={logout}><LogOut size={16} /> Cerrar sesión</button>
        </div>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  )
}
