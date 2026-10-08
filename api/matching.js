const NexaMatchingEngine = require("../backend/matching/matchingEngine");
const providersCatalog = require("../backend/data/providers");

const engine = new NexaMatchingEngine(providersCatalog);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {
    const {
      budget,
      attendees,
      date,
      location,
      eventType,
      preferences = {}
    } = req.body || {};

    const result = engine.matchEvent({
      budget: Number(budget),
      attendees: Number(attendees),
      date,
      location,
      eventType,
      preferences
    });

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
