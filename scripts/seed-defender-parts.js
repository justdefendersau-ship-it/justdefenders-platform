// ------------------------------------------------------
// File: scripts/seed-defender-parts.js
// Timestamp: 18 March 2026 14:10
// JustDefenders ©
//
// Defender Master Parts Dataset Seeder
// ------------------------------------------------------

import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// ------------------------------------------------------
// MASTER DATASET
// ------------------------------------------------------
const PARTS = [

  // TURBO SYSTEM
  {
    name: "Turbocharger Assembly",
    part_number: "LR029915",
    category: "turbo",
    price: 1800,
    supplier: "OEM",
    supplier_country: "UK",
    reliability_score: 90
  },
  {
    name: "Turbo Actuator",
    part_number: "LR041777",
    category: "turbo",
    price: 320,
    supplier: "OEM",
    supplier_country: "UK",
    reliability_score: 85
  },
  {
    name: "Intercooler Hose Kit",
    part_number: "PCH001",
    category: "turbo",
    price: 210,
    supplier: "Aftermarket",
    supplier_country: "AU",
    reliability_score: 80
  },
  {
    name: "Boost Hose Upgrade Kit",
    part_number: "BHU002",
    category: "turbo",
    price: 180,
    supplier: "Aftermarket",
    supplier_country: "UK",
    reliability_score: 88
  },

  // COOLING SYSTEM
  {
    name: "Radiator",
    part_number: "PCC000850",
    category: "cooling",
    price: 520,
    supplier: "OEM",
    supplier_country: "UK",
    reliability_score: 85
  },
  {
    name: "Thermostat",
    part_number: "PEM100990",
    category: "cooling",
    price: 75,
    supplier: "OEM",
    supplier_country: "UK",
    reliability_score: 90
  },
  {
    name: "Coolant Hose Set",
    part_number: "CHS001",
    category: "cooling",
    price: 140,
    supplier: "Aftermarket",
    supplier_country: "AU",
    reliability_score: 78
  },

  // FUEL SYSTEM
  {
    name: "Fuel Pump",
    part_number: "WFX000280",
    category: "fuel",
    price: 210,
    supplier: "OEM",
    supplier_country: "UK",
    reliability_score: 88
  },
  {
    name: "Fuel Filter",
    part_number: "ESR4686",
    category: "fuel",
    price: 45,
    supplier: "OEM",
    supplier_country: "UK",
    reliability_score: 92
  },

  // BRAKING
  {
    name: "Brake Pads Front",
    part_number: "SFP500130",
    category: "braking",
    price: 120,
    supplier: "OEM",
    supplier_country: "UK",
    reliability_score: 90
  },

  // ELECTRICAL
  {
    name: "Alternator",
    part_number: "AMR5425",
    category: "electrical",
    price: 480,
    supplier: "OEM",
    supplier_country: "UK",
    reliability_score: 85
  }

]

// ------------------------------------------------------
// INSERT WITH DEDUPE
// ------------------------------------------------------
async function seed() {

  console.log("Seeding Defender master dataset...")

  for (const part of PARTS) {

    // check if exists
    const { data: existing } = await supabase
      .from("parts_master")
      .select("id")
      .eq("part_number", part.part_number)
      .limit(1)

    if (existing && existing.length > 0) {
      console.log("Skipping existing:", part.name)
      continue
    }

    console.log("Inserting:", part.name)

    await supabase.from("parts_master").insert(part)

  }

  console.log("Seeding complete")

}

seed()