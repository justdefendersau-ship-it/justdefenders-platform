/**
 * JustDefenders ©
 * File: realSuppliers.cjs
 * Description: Real supplier ingestion with live Repco API
 */

const { normaliseSupplierData } = require("./supplierAdapter.cjs");
const { fetchRepcoLive } = require("./repcoApi.cjs");

async function fetchGenericSupplier(part) {
  return [
    {
      part,
      price: 295,
      shipping: 25,
      rating: 4.2,
      deliveryDays: 6
    }
  ];
}

async function getRealSuppliers(part) {
  const repcoRaw = await fetchRepcoLive(part);
  const genericRaw = await fetchGenericSupplier(part);

  return [
    ...normaliseSupplierData(repcoRaw, "Repco"),
    ...normaliseSupplierData(genericRaw, "Generic Supplier")
  ];
}

module.exports = {
  getRealSuppliers
};