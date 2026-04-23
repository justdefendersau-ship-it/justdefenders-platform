'use client'

import { useEffect, useState } from 'react'

export default function AlertsPanel({ activeVin }) {
  const [alerts, setAlerts] = useState([])

  function generateDemoAlerts() {
    return [
      {
        part: 'Starter Motor',
        message: '🔥 Price dropped 12%',
      },
      {
        part: 'Brake Pads',
        message: '⚠️ High failure rate reported',
      },
      {
        part: 'Fuel Pump',
        message: '📈 Price trending upward',
      }
    ]
  }

  useEffect(() => {
    setAlerts(generateDemoAlerts())
  }, [activeVin])

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ color: '#555' }}>Alerts</h3>

      {alerts.map((a, i) => (
        <div key={i} style={{
          background: '#fff',
          padding: '12px',
          marginTop: '8px',
          borderRadius: '8px',
          borderLeft: '4px solid #f59e0b'
        }}>
          <strong>{a.part}</strong>
          <div style={{ fontSize: '13px', color: '#555' }}>
            {a.message}
          </div>
        </div>
      ))}
    </div>
  )
}