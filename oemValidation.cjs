function validatePart(vin, partName) {

  // MOCK RULES (expand later with real data)
  const rules = [
    {
      keyword: "turbo",
      compatible: true,
      oem: "LR029914",
      confidence: 0.92
    },
    {
      keyword: "egr",
      compatible: true,
      oem: "LR018323",
      confidence: 0.88
    }
  ];

  const match = rules.find(r => partName.toLowerCase().includes(r.keyword));

  if (!match) {
    return {
      compatible: false,
      confidence: 0.5,
      note: "Unknown compatibility"
    };
  }

  return {
    compatible: match.compatible,
    oemPart: match.oem,
    confidence: match.confidence
  };
}

module.exports = { validatePart };
