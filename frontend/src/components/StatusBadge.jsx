export default function StatusBadge({ status }) {
  const label = {
    disponible: 'Disponible',
    reservada: 'Reservada',
    vendida: 'Vendida',
  }[status] || status

  return <span className={`status-badge status-${status}`}>{label}</span>
}
