/**
 * JustDefenders ©
 * File: scrapers.cjs
 * Description: Controlled supplier dataset (Phase 2 compatible)
 */

function getSuppliers(part) {
  return [
    {
      name: "Repco",
      part,
      price: 320,
      shipping: 15,
      rating: 4.5,
      deliveryDays: 3
    },
    {
      name: "Supercheap Auto",
      part,
      price: 310,
      shipping: 20,
      rating: 4.3,
      deliveryDays: 4
    },
    {
      name: "Britcar",
      part,
      price: 280,
      shipping: 60,
      rating: 4.6,
      deliveryDays: 7
    },
    {
      name: "eBay Seller",
      part,
      price: 250,
      shipping: 80,
      rating: 4.1,
      deliveryDays: 10
    }
  ];
}

module.exports = {
  getSuppliers
};
