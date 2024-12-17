import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [playerStats, setPlayerStats] = useState(null); // State for player stats
  const [loading, setLoading] = useState(true);         // Loading state
  const [error, setError] = useState(null);             // Error state

  // Fetch player stats from backend
  const fetchPlayerStats = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api");
      setPlayerStats(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching player stats:", err);
      setError("Failed to load player stats.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>PUBG Player Stats</h1>

      {loading && <p>Loading player stats...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {playerStats && (
        <div className="card">
          <h2>Player: {playerStats.name}</h2>
          <p>Player ID: {playerStats.id}</p>
          <p>Matches Played: {playerStats.matches}</p>
        </div>
      )}

      <p className="read-the-docs">
        Edit <code>src/App.jsx</code> and save to test HMR.
      </p>
    </>
  );
}

export default App;
