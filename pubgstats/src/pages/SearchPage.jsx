import React, { useState } from 'react';
import axios from 'axios';

function SearchPage() {
  const [nickname, setNickname] = useState('');
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!nickname.trim()) return;

    setLoading(true);
    setError(null);
    setPlayerStats(null);

    try {
      const response = await axios.get(`http://localhost:8080/api/player/${nickname}/stats`);
      setPlayerStats(response.data.aggregatedStats);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-6">
      <h1 className="text-3xl font-bold mb-4">Search Player Stats</h1>
      <div className="flex mb-6">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter Player Nickname"
          className="px-4 py-2 rounded-l bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-r bg-blue-600 hover:bg-blue-700 text-white"
        >
          Search
        </button>
      </div>
      {loading && <p className="text-blue-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {playerStats && (
        <div className="bg-gray-800 p-6 rounded shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Player Stats</h2>
          <p>Kills: {playerStats.kills}</p>
          <p>Damage Dealt: {playerStats.damageDealt.toFixed(2)}</p>
          <p>Time Survived: {Math.floor(playerStats.timeSurvived / 60)} mins</p>
          <p>Swimming Distance: {playerStats.swimmingDistance.toFixed(2)} m</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
