//
// File: backend/crossReferenceEngine.cjs
// JustDefenders ©
// Phase 9A.2 — Category-Aware Variant Filtering
//

function detectCategory(text) {

    const t = text.toLowerCase();

    if (t.includes("hose")) return "hose";
    if (t.includes("oil filter")) return "filter";

    return "unknown";
}

// ----------------------------------------------------------------------------------------------

function isValidPartNumber(text) {

    if (!text) return false;

    const t = text.toUpperCase();

    if (!(/[A-Z]/.test(t) && /[0-9]/.test(t))) return false;

    if (t.length < 5 || t.length > 15) return false;

    return true;
}

// ----------------------------------------------------------------------------------------------

function matchesCategory(part, category) {

    if (category === "hose") {
        return part.startsWith("CH");
    }

    if (category === "filter") {
        return (
            part.startsWith("Z") ||
            part.startsWith("OC") ||
            part.startsWith("W")
        );
    }

    return true;
}

// ----------------------------------------------------------------------------------------------

function extractPartNumbers(text, category) {

    const matches = text.match(/[A-Z0-9]{5,15}/gi) || [];

    return matches
        .map(x => x.toUpperCase())
        .filter(x => isValidPartNumber(x))
        .filter(x => matchesCategory(x, category));
}

// ----------------------------------------------------------------------------------------------

function buildVariants(originalPart, supplierResults = []) {

    const variants = new Set();
    variants.add(originalPart);

    let category = "unknown";

    for (const result of supplierResults) {
        if (result.productText) {
            category = detectCategory(result.productText);
            break;
        }
    }

    console.log("🧠 Detected Category:", category);

    for (const result of supplierResults) {

        if (!result.productText) continue;

        const found = extractPartNumbers(result.productText, category);

        found.forEach(v => variants.add(v));
    }

    return Array.from(variants);
}

module.exports = { buildVariants };