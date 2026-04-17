/**
 * JustDefenders ©
 * File: supplierIntelligence.cjs
 */

const SUPPLIER_PROFILES = {
  "Repco": { reliability: 0.95, trust: 0.9 },
  "Supercheap Auto": { reliability: 0.9, trust: 0.85 },
  "Burson": { reliability: 0.92, trust: 0.88 },
  "Britcar": { reliability: 0.85, trust: 0.8 },
  "eBay Seller": { reliability: 0.7, trust: 0.6 }
};

function applySupplierIntelligence(suppliers) {
  return suppliers.map(supplier => {
    const profile = SUPPLIER_PROFILES[supplier.name] || {
      reliability: 0.75,
      trust: 0.7
    };

    return {
      ...supplier,
      reliabilityScore: profile.reliability * 100,
      trustScore: profile.trust * 100
    };
  });
}

module.exports = {
  applySupplierIntelligence
};