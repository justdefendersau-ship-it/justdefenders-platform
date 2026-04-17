"use client"

/*
============================================================
JustDefenders
Maintenance Page – Stable Invoice Version
Date: 21 Feb 2026 22:05
============================================================
Features:
- Manual vehicle selection required
- Invoice upload locked until vehicle chosen
- AI extraction preview fully editable
- Required field validation
- Clean maintenance reload after insert
============================================================
*/

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function MaintenancePage() {

  const [vehicles, setVehicles] = useState<any[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [maintenance, setMaintenance] = useState<any[]>([])
  const [invoicePreview, setInvoicePreview] = useState<any>(null)
  const [uploading, setUploading] = useState(false)

  // -------------------------------------------------------
  // INITIAL LOAD
  // -------------------------------------------------------

  useEffect(() => {
    loadVehicles()
  }, [])

  useEffect(() => {
    if (selectedVehicle) {
      loadMaintenance()
    }
  }, [selectedVehicle])

  // -------------------------------------------------------
  // LOAD VEHICLES
  // -------------------------------------------------------

  async function loadVehicles() {
    const { data } =
      await supabase
        .from("vehicles")
        .select("*")

    setVehicles(data || [])
  }

  // -------------------------------------------------------
  // LOAD MAINTENANCE
  // -------------------------------------------------------

  async function loadMaintenance() {
    const { data } =
      await supabase
        .from("maintenance_records")
        .select("*")
        .eq("vehicle_id", selectedVehicle)
        .order("date", { ascending: false })

    setMaintenance(data || [])
  }

  // -------------------------------------------------------
  // HANDLE INVOICE UPLOAD
  // -------------------------------------------------------

  async function handleInvoiceUpload(file: File) {

    if (!selectedVehicle) {
      alert("Please select a vehicle first.")
      return
    }

    setUploading(true)

    try {

      const filePath =
        `${selectedVehicle}/${Date.now()}-${file.name}`

      const { error } =
        await supabase.storage
          .from("invoices")
          .upload(filePath, file)

      if (error) {
        alert("Upload failed")
        setUploading(false)
        return
      }

      const response =
        await fetch("/api/extract-invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filePath })
        })

      const data = await response.json()

      if (!data.result) {
        alert("Extraction failed")
        setUploading(false)
        return
      }

      setInvoicePreview(data.result)

    } catch (error) {
      alert("Extraction failed")
    }

    setUploading(false)
  }

  // -------------------------------------------------------
  // CONFIRM INSERT
  // -------------------------------------------------------

  async function confirmInvoiceInsert() {

    if (!selectedVehicle) {
      alert("Vehicle not selected")
      return
    }

    if (!invoicePreview?.date) {
      alert("Date is required")
      return
    }

    if (!invoicePreview?.cost) {
      alert("Cost is required")
      return
    }

    const { error } =
      await supabase
        .from("maintenance_records")
        .insert([{
          vehicle_id: selectedVehicle,
          date: invoicePreview.date,
          odometer: invoicePreview.odometer || 0,
          category: "Service",
          description: invoicePreview.description || "Service",
          cost: invoicePreview.cost,
          notes: "Imported from invoice"
        }])

    if (error) {
      alert("Insert failed: " + error.message)
      return
    }

    alert("Maintenance record created")

    await loadMaintenance()

    setInvoicePreview(null)
  }

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------

  const selectedVehicleData =
    vehicles.find(v => v.id === selectedVehicle)

  return (
    <main style={{ maxWidth: 900, margin: "auto", padding: 30 }}>

      <h1>Maintenance</h1>

      {/* VEHICLE SELECTOR */}

      <h3>Select Vehicle</h3>

      <select
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
        style={{ marginBottom: 20 }}
      >
        <option value="">-- Select Vehicle --</option>
        {vehicles.map(v => (
          <option key={v.id} value={v.id}>
            {v.make} {v.model} ({v.year})
          </option>
        ))}
      </select>

      {/* UPLOAD SECTION */}

      <h3>Upload Service Invoice (PDF)</h3>

      {!selectedVehicle && (
        <p style={{ color: "red" }}>
          Select a vehicle before uploading.
        </p>
      )}

      <input
        type="file"
        accept="application/pdf"
        disabled={!selectedVehicle}
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleInvoiceUpload(e.target.files[0])
          }
        }}
      />

      {uploading && <p>Processing invoice...</p>}

      {/* PREVIEW SECTION */}

      {invoicePreview && (
        <div style={{
          marginTop: 20,
          background: "#f4f6f8",
          padding: 20,
          borderRadius: 8
        }}>

          <h3>Invoice Preview (Editable)</h3>

          <p>
            Vehicle:
            <strong>
              {" "}
              {selectedVehicleData?.make} {selectedVehicleData?.model}
            </strong>
          </p>

          <label>Date:</label><br />
          <input
            type="date"
            value={invoicePreview.date || ""}
            onChange={(e) =>
              setInvoicePreview({
                ...invoicePreview,
                date: e.target.value
              })
            }
          />

          <br /><br />

          <label>Odometer:</label><br />
          <input
            type="number"
            value={invoicePreview.odometer || ""}
            onChange={(e) =>
              setInvoicePreview({
                ...invoicePreview,
                odometer: Number(e.target.value)
              })
            }
          />

          <br /><br />

          <label>Description:</label><br />
          <input
            type="text"
            value={invoicePreview.description || ""}
            onChange={(e) =>
              setInvoicePreview({
                ...invoicePreview,
                description: e.target.value
              })
            }
            style={{ width: "100%" }}
          />

          <br /><br />

          <label>Cost:</label><br />
          <input
            type="number"
            step="0.01"
            value={invoicePreview.cost || ""}
            onChange={(e) =>
              setInvoicePreview({
                ...invoicePreview,
                cost: Number(e.target.value)
              })
            }
          />

          <br /><br />

          <button
            onClick={confirmInvoiceInsert}
            style={{
              background: "#28a745",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: 4
            }}
          >
            Confirm & Add To Maintenance
          </button>

        </div>
      )}

      {/* MAINTENANCE HISTORY */}

      <h2 style={{ marginTop: 40 }}>Maintenance History</h2>

      {maintenance.length === 0 && (
        <p>No maintenance records for this vehicle.</p>
      )}

      {maintenance.map(record => (
        <div
          key={record.id}
          style={{
            padding: 10,
            borderBottom: "1px solid #ddd"
          }}
        >
          <strong>{record.date}</strong> — {record.description}
          <br />
          Odometer: {record.odometer} km
          <br />
          Cost: ${record.cost}
        </div>
      ))}

    </main>
  )
}
