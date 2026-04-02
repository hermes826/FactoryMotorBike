import SobreNosotros from './pages/SobreNosotros'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import BikeDetail from './pages/BikeDetail'
import AdminDashboard from './pages/admin/AdminDashboard'
import BikeForm from './pages/admin/BikeForm'
import AdminSettings from './pages/admin/AdminSettings'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import Financiacion from './pages/Financiacion'
import SegurosMoto from './pages/SegurosMoto'
import MantenimientoBasico from './pages/MantenimientoBasico'
import MotosOcasion from './pages/motos-ocasion'
import Venta from './pages/venta'
import Recogida from './pages/recogida'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moto/:id" element={<BikeDetail />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/bikes/new" element={<ProtectedRoute><BikeForm /></ProtectedRoute>} />
        <Route path="/admin/bikes/:id" element={<ProtectedRoute><BikeForm /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/financiacion" element={<Financiacion />} />
        <Route path="/seguros-moto" element={<SegurosMoto />} />
        <Route path="/mantenimiento-basico" element={<MantenimientoBasico />} />
        <Route path="/motos-ocasion" element={<MotosOcasion />} />
        <Route path="/venta" element={<Venta />} />
        <Route path="/recogida" element={<Recogida />} />
      </Routes>
    </AuthProvider>
  )
}
