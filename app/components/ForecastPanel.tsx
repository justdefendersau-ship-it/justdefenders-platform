/*
=====================================================
MEMOIZED FORECAST PANEL
Timestamp: 28 Feb 2026 12:45
=====================================================
*/

"use client"

import { memo } from "react"

export default memo(function ForecastPanel({
  forecast
}: any) {

  if (!forecast) return null

  return (
    <div className="card">
      <h3>Price Forecast</h3>
      <p>Predicted: ${forecast.predicted_price?.toFixed(2)}</p>
      <p>Volatility: {forecast.volatility?.toFixed(2)}</p>
      <p>Risk Score: {forecast.risk_score?.toFixed(3)}</p>
    </div>
  )
})