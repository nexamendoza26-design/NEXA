const { scoreProvider } = require("./scoring");

class NexaMatchingEngine {
  constructor(providers = []) {
    this.providers = Array.isArray(providers) ? providers : [];
  }

  matchEvent({
    budget,
    attendees,
    date,
    location,
    eventType,
    preferences = {}
  }) {
    // Validaciones
    if (!Number.isFinite(budget) || budget <= 0) {
      throw new Error("Budget inválido");
    }

    if (!Number.isInteger(attendees) || attendees <= 0) {
      throw new Error("Cantidad de asistentes inválida");
    }

    if (!date || !location || !eventType) {
      throw new Error(
        "Faltan datos obligatorios: date, location o eventType"
      );
    }

    const eventDate = new Date(`${date}T12:00:00`);

    if (Number.isNaN(eventDate.getTime())) {
      throw new Error("Fecha inválida");
    }

    // Filtrar proveedores compatibles
    const validProviders = this.providers.filter((provider) => {
      const compatibleCapacity =
        Number(provider.capacity || 0) >= attendees;

      const compatibleLocation =
        !Array.isArray(provider.locations) ||
        provider.locations.length === 0 ||
        provider.locations.includes(location);

      const compatibleEventType =
        !Array.isArray(provider.eventTypes) ||
        provider.eventTypes.length === 0 ||
        provider.eventTypes.includes(eventType);

      const unavailable =
        Array.isArray(provider.unavailableDates) &&
        provider.unavailableDates.includes(date);

      return (
        compatibleCapacity &&
        compatibleLocation &&
        compatibleEventType &&
        !unavailable
      );
    });

    // Separar proveedores por categoría
    const venues = validProviders.filter(
      (provider) => provider.category === "venue"
    );

    const catering = validProviders.filter(
      (provider) => provider.category === "catering"
    );

    const music = validProviders.filter(
      (provider) => provider.category === "music"
    );

    const packages = [];

    // Construcción de combinaciones
    for (const venue of venues) {
      for (const food of catering) {
        for (const dj of music) {
          const venuePrice = this.calculatePrice(
            venue,
            attendees,
            eventDate
          );

          const cateringPrice = this.calculatePrice(
            food,
            attendees,
            eventDate
          );

          const musicPrice = this.calculatePrice(
            dj,
            attendees,
            eventDate
          );

          const total =
            venuePrice +
            cateringPrice +
            musicPrice;

          const score = scoreProvider({
            total,
            budget,
            attendees,
            venue,
            catering: food,
            music: dj,
            preferences
          });

          packages.push({
            total,
            score,
            providers: {
              venue,
              catering: food,
              music: dj
            }
          });
        }
      }
    }

    // Solo opciones dentro del presupuesto
    const affordable = packages
      .filter((pkg) => pkg.total <= budget)
      .sort((a, b) => b.score - a.score);

    // Selección de alternativas
    const economic = affordable.length
      ? [...affordable].sort((a, b) => a.total - b.total)[0]
      : null;

    const balanced = affordable.length
      ? affordable[Math.floor(affordable.length / 2)]
      : null;

    const premium = affordable.length
      ? [...affordable].sort((a, b) => b.total - a.total)[0]
      : null;

    return {
      source: "MOCK_MVP",
      currency: "ARS",

      budget,
      attendees,
      date,
      location,
      eventType,

      totalOptions: affordable.length,

      alternatives: {
        economic,
        balanced,
        premium
      },

      allMatches: affordable
    };
  }

  calculatePrice(provider, attendees, date) {
    const basePrice = Number(provider.basePrice || 0);
    const pricePerPerson =
      Number(provider.pricePerPerson || 0);

    let price =
      basePrice +
      pricePerPerson * attendees;

    const day = date.getDay();

    // Lunes a jueves = días de menor demanda
    const isOffPeak =
      day >= 1 &&
      day <= 4;

    const offPeakDiscount =
      Number(provider.offPeakDiscount || 0);

    if (
      isOffPeak &&
      offPeakDiscount > 0 &&
      offPeakDiscount < 1
    ) {
      price *= 1 - offPeakDiscount;
    }

    return Math.round(price);
  }
}

module.exports = NexaMatchingEngine;
