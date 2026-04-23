function normalisePartData(raw) {
    if (!raw) return null;
    const partNumber = String(raw.partNumber || "").trim().toUpperCase();
    const supplier = String(raw.supplier || "").trim();
    const price = parseFloat(raw.price);
    const timestamp = raw.timestamp || new Date().toISOString();
    if (!partNumber || !supplier || isNaN(price)) return null;
    return { partNumber, supplier, price, timestamp };
}
module.exports = normalisePartData;
