require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 8080;

// PUBG API Key from environment variables
const API_KEY = process.env.PUBG_API_KEY;

app.use(cors()); // Allow all origins

app.get("/api", async (req, res) => {
  try {
    const playerName = "namano_10"; // Example player name
    const response = await axios.get("https://api.pubg.com/shards/steam/players", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
      },
      params: {
        "filter[playerNames]": playerName,
      },
    });

    // Extract relevant player data
    const playerData = response.data.data[0];
    res.json({
      id: playerData.id,
      name: playerData.attributes.name,
      matches: playerData.relationships.matches.data.length,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch player data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("PUBG API Key:", process.env.PUBG_API_KEY);
});





