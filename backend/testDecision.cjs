//
// File: backend/testDecision.cjs
// JustDefenders ©
// Updated to use makeDecision
//

const { runPartsEngine } = require("./partsEngine.cjs");
const { makeDecision } = require("./decisionEngine.cjs");

async function runTest() {

    console.log("=== TEST START ===");

    const partNumber = "A9774435";

    const suppliers = await runPartsEngine(partNumber);

    console.log("");
    console.log("=== SUPPLIERS ===");
    console.log(JSON.stringify(suppliers, null, 2));

    console.log("");

    const decision = makeDecision(suppliers, partNumber);

    console.log("=== DECISION ===");
    console.log(JSON.stringify(decision, null, 2));
}

runTest();