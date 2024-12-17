require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = 8080;

// PUBG API Key from environment variables
const API_KEY = process.env.PUBG_API_KEY;

app.use(cors()); // Allow all origins

// Step 1: Fetch player ID by nickname
const getPlayerId = async (nickname) => {
  try {
    const response = await axios.get(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${nickname}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'application/vnd.api+json',
      },
    });

    if (response.data.data.length === 0) {
      throw new Error('Player not found');
    }

    return response.data.data[0].id;
  } catch (error) {
    console.error('Error fetching player ID:', error);
    throw error;
  }
};

// Step 2: Get recent matches
const getRecentMatches = async (playerId) => {
  try {
    // Fetch the player's data (again) to get match relationships
    const response = await axios.get(`https://api.pubg.com/shards/steam/players/${playerId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'application/vnd.api+json',
      },
    });

    // Extract match IDs from the relationships
    const matchData = response.data.data.relationships.matches.data;

    if (!matchData || matchData.length === 0) {
      throw new Error('No recent matches found');
    }

    // Extract only the IDs
    const matchIds = matchData.map(match => match.id);
    return matchIds;
  } catch (error) {
    console.error('Error fetching recent matches:', error.message);
    throw error;
  }
};

// Step 3: Get match details (for a specific match and player)
const getMatchDetails = async (playerId, matchId) => {
  try {
    const response = await axios.get(`https://api.pubg.com/shards/steam/matches/${matchId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'application/vnd.api+json',
      },
    });

    // Find the stats for the specific player
    const playerStats = response.data.included.find(
      (item) => item.type === 'participant' && item.attributes.stats.playerId === playerId
    );

    if (!playerStats) {
      throw new Error('Player stats not found in the match');
    }

    return playerStats.attributes.stats;
  } catch (error) {
    console.error('Error fetching match details:', error.message);
    throw error;
  }
};

// Step 4: Aggregate stats across matches
const aggregateStats = async (playerId, matchIds) => {
  try {
    // Fetch stats for all matches
    const matchStatsPromises = matchIds.map(matchId => getMatchDetails(playerId, matchId));
    const matchStats = await Promise.all(matchStatsPromises);

    // Aggregate stats
    const aggregated = matchStats.reduce((acc, stats) => {
      return {
        kills: acc.kills + (stats.kills || 0),
        damageDealt: acc.damageDealt + (stats.damageDealt || 0),
        timeSurvived: acc.timeSurvived + (stats.timeSurvived || 0),
        swimmingDistance: acc.swimmingDistance + (stats.swimmingDistance || 0),
      };
    }, { kills: 0, damageDealt: 0, timeSurvived: 0, swimmingDistance: 0 });

    return aggregated;
  } catch (error) {
    console.error('Error aggregating stats:', error.message);
    throw error;
  }
};

// API route to get player aggregated stats
app.get('/api/player/:nickname/stats', async (req, res) => {
  const { nickname } = req.params;

  try {
    // Step 1: Get player ID
    const playerId = await getPlayerId(nickname);

    // Step 2: Get recent matches
    const matchIds = await getRecentMatches(playerId);

    // Step 3: Aggregate stats across matches
    const aggregatedStats = await aggregateStats(playerId, matchIds);

    // Return aggregated stats
    res.json({
      nickname,
      aggregatedStats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});






