async function safeFetch(fn, partNumber, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      let result = await fn(partNumber);
      if (result) return result;
    } catch (err) {
      if (i === retries) return null;
    }
  }
  return null;
}

// Simulated APIs (replace later safely)
async function repcoAPI(partNumber) {
  return {
    supplier: "Repco",
    price: 120,
    deliveryDays: 2,
    warrantyMonths: 12
  };
}

async function britpartAPI(partNumber) {
  return {
    supplier: "Britpart",
    price: 95,
    deliveryDays: 5,
    warrantyMonths: 6
  };
}

async function repcoConnector(partNumber) {
  return await safeFetch(repcoAPI, partNumber);
}

async function britpartConnector(partNumber) {
  return await safeFetch(britpartAPI, partNumber);
}

module.exports = [repcoConnector, britpartConnector];
