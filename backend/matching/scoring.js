const express = require("express");

const NexaMatchingEngine = require("../matching/matchingEngine");
const providersCatalog = require("../data/providers");

const router = express.Router();

const engine = new NexaMatchingEngine(providersCatalog);

router.post("/match", (req, res) => {
  try {
    const {
      budget,
      attendees,
      date,
      location,
      eventType,
      preferences = {}
    } = req.body;

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
});

module.exports = router;
