//
// File: backend/resolver.cjs
// JustDefenders ©
// Phase 4A — Resolver with Parts DB
//

const partsDB = require('./partsDB.json');

function resolvePart(partNumber) {

    const cleaned = partNumber.replace(/[^a-zA-Z0-9]/g, '');

    let variants = [cleaned];

    // 🔥 Check DB
    if (partsDB[cleaned]) {
        const entry = partsDB[cleaned];

        if (entry.aliases) {
            variants = variants.concat(entry.aliases);
        }

        if (entry.category) {
            variants.push(entry.category);
        }
    }

    // fallback partials
    variants.push(cleaned.substring(0, 6));
    variants.push(cleaned.substring(0, 5));

    return {
        original: partNumber,
        searchVariants: [...new Set(variants)]
    };
}

module.exports = { resolvePart };