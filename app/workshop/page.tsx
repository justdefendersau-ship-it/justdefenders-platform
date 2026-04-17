/*
============================================================
JustDefenders
Workshop Job Card System
Invoices + Payments + Status
Date: 22 Feb 2026
============================================================
*/

"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import Brand from "../../components/Brand"

type JobCard = {
  id: string
  description: string
  labour_hours: number
  labour_rate: number
  organization_id: string
}

type Part = {
  id: string
  name: string
  quantity: number
  cost_price: number
  sale_price: number
}

type Invoice = {
  id: string
  invoice_number: number
  subtotal: number
  gst: number
  total: number
  status: string
  pdf_path: string
  created_at: string
}

export default function WorkshopPage() {

  const [jobs, setJobs] = useState<JobCard[]>([])
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [parts, setParts] = useState<Part[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])

  const [paymentAmount, setPaymentAmount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("bank transfer")

  useEffect(() => {
    loadJobs()
  }, [])

  async function loadJobs() {
    const { data } =
      await supabase.from("job_cards").select("*")
    setJobs(data || [])
  }

  async function loadParts(jobId: string) {
    const { data } =
      await supabase
        .from("job_parts")
        .select("*")
        .eq("job_card_id", jobId)

    setParts(data || [])
  }

  async function loadInvoices(jobId: string) {
    const { data } =
      await supabase
        .from("invoices")
        .select("*")
        .eq("job_card_id", jobId)
        .order("created_at", { ascending: false })

    setInvoices(data || [])
  }

  async function recordPayment(invoiceId: string, total: number) {

    if (!selectedJob) return

    await supabase
      .from("payments")
      .insert({
        organization_id:
          jobs.find(j => j.id === selectedJob)?.organization_id,
        invoice_id: invoiceId,
        amount: paymentAmount,
        payment_method: paymentMethod
      })

    if (paymentAmount >= total) {
      await supabase
        .from("invoices")
        .update({
          status: "paid",
          paid_at: new Date().toISOString()
        })
        .eq("id", invoiceId)
    }

    loadInvoices(selectedJob)
    setPaymentAmount(0)
  }

  return (
    <main style={{ padding: 40 }}>

      <h1><Brand /> Workshop</h1>

      <h2>Select Job</h2>

      {jobs.map(job => (
        <button
          key={job.id}
          onClick={() => {
            setSelectedJob(job.id)
            loadParts(job.id)
            loadInvoices(job.id)
          }}
          style={{ display: "block", marginBottom: 10 }}
        >
          {job.description}
        </button>
      ))}

      {selectedJob && (
        <div style={{ marginTop: 40 }}>

          <h2>Previous Invoices</h2>

          {invoices.length === 0 && (
            <p>No invoices yet.</p>
          )}

          {invoices.map(inv => (

            <div
              key={inv.id}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                marginBottom: 10
              }}
            >

              <strong>
                INV-{inv.invoice_number}
              </strong><br />

              Date:
              {new Date(inv.created_at)
                .toLocaleDateString("en-AU")}
              <br />

              Total:
              ${inv.total.toFixed(2)}
              <br />

              Status:
              <span
                style={{
                  color:
                    inv.status === "paid"
                      ? "green"
                      : "red",
                  fontWeight: "bold"
                }}
              >
                {inv.status}
              </span>

              <br />

              <button
                onClick={() =>
                  window.open(
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/workshop-invoices/${inv.pdf_path}`,
                    "_blank"
                  )
                }
              >
                Download PDF
              </button>

              {inv.status === "unpaid" && (
                <div style={{ marginTop: 10 }}>
                  <input
                    type="number"
                    placeholder="Payment amount"
                    value={paymentAmount}
                    onChange={e =>
                      setPaymentAmount(Number(e.target.value))
                    }
                  />

                  <select
                    value={paymentMethod}
                    onChange={e =>
                      setPaymentMethod(e.target.value)
                    }
                  >
                    <option>bank transfer</option>
                    <option>cash</option>
                    <option>card</option>
                  </select>

                  <button
                    onClick={() =>
                      recordPayment(inv.id, inv.total)
                    }
                  >
                    Record Payment
                  </button>
                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </main>
  )
}