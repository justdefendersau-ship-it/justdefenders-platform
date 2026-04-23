/**
 * JustDefenders © Predictive Engine
 */

export function predictFromHistory(history) {

  if (!history || history.length === 0) return null;

  const faults = history.map(h => h.fault);

  if (faults.includes("boost_issue")) {
    return {
      part: "turbocharger",
      confidence: 0.82,
      message: "Turbo likely to fail based on boost issues"
    };
  }

  if (faults.includes("egr_issue")) {
    return {
      part: "intake_cleaning",
      confidence: 0.75,
      message: "EGR issues often lead to intake restriction"
    };
  }

  return null;
}
