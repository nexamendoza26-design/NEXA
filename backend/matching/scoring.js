function scoreProvider({
  total,
  budget,
  attendees,
  venue = {},
  catering = {},
  music = {},
  preferences = {}
}) {
  const safeTotal = Number(total);
  const safeBudget = Number(budget);
  const safeAttendees = Number(attendees);
  const venueCapacity = Number(venue.capacity || 0);

  if (!Number.isFinite(safeTotal) || safeTotal < 0) {
    return 0;
  }

  if (!Number.isFinite(safeBudget) || safeBudget <= 0) {
    return 0;
  }

  if (!Number.isFinite(safeAttendees) || safeAttendees <= 0) {
    return 0;
  }

  let score = 0;

  // 1. Uso eficiente del presupuesto
  const budgetUsage = safeTotal / safeBudget;

  if (budgetUsage <= 0.70) {
    score += 25;
  } else if (budgetUsage <= 0.85) {
    score += 22;
  } else if (budgetUsage <= 1) {
    score += 18;
  }

  // 2. Utilización adecuada de la capacidad del salón
  if (venueCapacity > 0) {
    const capacityRatio = safeAttendees / venueCapacity;

    if (capacityRatio <= 0.75) {
      score += 15;
    } else if (capacityRatio <= 0.90) {
      score += 12;
    } else {
      score += 8;
    }
  }

  // 3. Capacidad ociosa disponible
  if (venue.idleCapacity) {
    score += 10;
  }

  if (catering.idleCapacity) {
    score += 3;
  }

  if (music.idleCapacity) {
    score += 2;
  }

  // 4. Preferencia estratégica de NEXA
  if (
    preferences.preferIdleCapacity === true &&
    venue.idleCapacity
  ) {
    score += 10;
  }

  // Garantizar máximo 100
  return Math.min(Math.round(score), 100);
}

module.exports = {
  scoreProvider
};
