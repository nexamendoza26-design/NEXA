const providers = [
  {
    id: "prov_01",
    name: "Bodega Catena Zapata (Espacio Viñedos)",
    category: "venue",
    capacity: 120,
    basePrice: 850000,
    pricePerPerson: 15000,
    locations: ["Mendoza"],
    eventTypes: ["wedding", "corporate", "luxury"],
    unavailableDates: [],
    idleCapacity: true,
    offPeakDiscount: 0.15
  },
  {
    id: "prov_02",
    name: "Bodega Salentein (Espacio Killka)",
    category: "venue",
    capacity: 200,
    basePrice: 1100000,
    pricePerPerson: 18000,
    locations: ["Mendoza"],
    eventTypes: ["wedding", "corporate", "gala"],
    unavailableDates: [],
    idleCapacity: true,
    offPeakDiscount: 0.20
  },
  {
    id: "prov_03",
    name: "Finca Decero",
    category: "venue",
    capacity: 90,
    basePrice: 600000,
    pricePerPerson: 12000,
    locations: ["Mendoza"],
    eventTypes: ["wedding", "birthday", "corporate"],
    unavailableDates: [],
    idleCapacity: false,
    offPeakDiscount: 0
  },
  {
    id: "prov_04",
    name: "Catering Brindillas & Co.",
    category: "catering",
    capacity: 250,
    basePrice: 200000,
    pricePerPerson: 25000,
    locations: ["Mendoza"],
    eventTypes: ["wedding", "corporate", "gala", "birthday"],
    unavailableDates: [],
    idleCapacity: true,
    offPeakDiscount: 0.10
  },
  {
    id: "prov_05",
    name: "Catering Sabor Andino",
    category: "catering",
    capacity: 150,
    basePrice: 150000,
    pricePerPerson: 18000,
    locations: ["Mendoza"],
    eventTypes: ["wedding", "corporate", "birthday"],
    unavailableDates: [],
    idleCapacity: false,
    offPeakDiscount: 0
  },
  {
    id: "prov_06",
    name: "Mendoza Sound & DJ Crew",
    category: "music",
    capacity: 500,
    basePrice: 180000,
    pricePerPerson: 0,
    locations: ["Mendoza"],
    eventTypes: ["wedding", "corporate", "gala", "birthday", "luxury"],
    unavailableDates: [],
    idleCapacity: true,
    offPeakDiscount: 0.10
  }
];

module.exports = providers;
