export function getCompatibleParts(partNumber:string) {

  if (partNumber === "LR123") {
    return [
      { supplier: "Ford", partNumber: "F123" },
      { supplier: "Bosch", partNumber: "B456" },
      { supplier: "Gates", partNumber: "G789" }
    ];
  }

  return [];
}

export function getUpgrades(partNumber:string) {

  if (partNumber === "LR123") {
    return [
      {
        supplier: "Bosch Performance",
        partNumber: "HP999",
        note: "High torque upgrade"
      }
    ];
  }

  return [];
}