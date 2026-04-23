function mapAvailability(stock) {
    if (!stock) return "unknown";
    if (stock.status === "inStock") return "in_stock";
    if (stock.status === "outOfStock") return "out_of_stock";
    return "unknown";
}

function normaliseRepco(raw) {
    return {
        partNumber: raw.productCode || "UNKNOWN",
        supplier: "Repco",
        price: raw.price || null,
        currency: "AUD",
        timestamp: new Date().toISOString(),
        availability: mapAvailability(raw.stock)
    };
}

module.exports = { normaliseRepco };
