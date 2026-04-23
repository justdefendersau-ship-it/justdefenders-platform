function crawl(partNumber) {

  return [
    {
      partNumber,
      supplier: "Repco",
      price: 120 + Math.random() * 10,
      timestamp: new Date().toISOString()
    },
    {
      partNumber,
      supplier: "Britpart",
      price: 125 + Math.random() * 10,
      timestamp: new Date().toISOString()
    }
  ];
}

module.exports = { crawl };
