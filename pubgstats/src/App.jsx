import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [nickname, setNickname] = useState(""); // User input
  const [stats, setStats] = useState(null); // Player stats
  const [error, setError] = useState(""); // Error handling

  const fetchPlayerStats = async () => {
    setError(""); // Clear previous errors
    setStats(null); // Clear previous stats

    try {
      const response = await axios.get(`http://localhost:8080/api/player/${nickname}/stats`);
      setStats(response.data.aggregatedStats); // Set the fetched stats
    } catch (err) {
      console.error("Error fetching player stats:", err.message);
      setError("Failed to fetch player stats. Please check the nickname and try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PUBG Player Stats</h1>
        <p>Enter your PUBG nickname to view aggregated stats.</p>

        {/* Input field for nickname */}
        <div>
          <input
            type="text"
            placeholder="Enter PUBG Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button onClick={fetchPlayerStats}>Get Stats</button>
        </div>

        {/* Error message */}
        {error && <p className="error">{error}</p>}

        {/* Display stats if available */}
        {stats && (
          <div className="stats">
            <h2>Stats for {nickname}</h2>
            <ul>
              <li><strong>Kills:</strong> {stats.kills}</li>
              <li><strong>Damage Dealt:</strong> {stats.damageDealt}</li>
              <li><strong>Time Survived:</strong> {stats.timeSurvived} seconds</li>
              <li><strong>Swimming Distance:</strong> {stats.swimmingDistance} meters</li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
