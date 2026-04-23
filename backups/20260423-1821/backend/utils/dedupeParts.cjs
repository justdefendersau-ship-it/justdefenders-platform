function dedupeParts(data) {
    const seen = new Set();
    return data.filter(item => {
        const key = `${item.partNumber}_${item.supplier}_${item.timestamp}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}
module.exports = dedupeParts;
