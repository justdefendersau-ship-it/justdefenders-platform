//
// File: app/api/search/route.js
// JustDefenders ©
// Phase 9B.1 — API Bridge (UI → Engine)
//

import { NextResponse } from "next/server";

const { runPartsEngine } = require("../../../backend/partsEngine.cjs");
const { makeDecision } = require("../../../backend/decisionEngine.cjs");

export async function POST(req) {

    try {

        const body = await req.json();

        const part = body.part;

        console.log("🔍 API Search:", part);

        // --------------------------------------------------------------------------------------
        // RUN ENGINE
        // --------------------------------------------------------------------------------------

        const suppliers = await runPartsEngine(part);

        // --------------------------------------------------------------------------------------
        // DECISION
        // --------------------------------------------------------------------------------------

        const decision = makeDecision(suppliers, part);

        return NextResponse.json({
            success: true,
            suppliers,
            decision
        });

    } catch (err) {

        console.log("❌ API error:", err.message);

        return NextResponse.json({
            success: false,
            error: err.message
        });
    }
}