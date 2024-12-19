import React from 'react';

const leaderboardData = Array.from({ length: 15 }, (_, i) => ({
  rank: i + 1, // Initial rank (we'll override this dynamically)
  team: `Team ${String.fromCharCode(65 + i)}`,
  matches: 10,
  placePoints: Math.floor(Math.random() * 100),
  kills: Math.floor(Math.random() * 50),
}));

function TournamentPage() {
  // Calculate total points and sort by total points in descending order
  const sortedLeaderboardData = leaderboardData
    .map(team => ({
      ...team,
      totalPoints: team.placePoints + team.kills,
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((team, index) => ({ ...team, rank: index + 1 })); // Reassign ranks after sorting

  // Split data into two tables if more than 14 teams
  const splitIndex = Math.ceil(sortedLeaderboardData.length / 2);
  const firstHalf = sortedLeaderboardData.slice(0, splitIndex);
  const secondHalf = sortedLeaderboardData.slice(splitIndex);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-6">
      {/* Tournament Title */}
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">PUBG Global Championship 2024</h1>
        <p className="text-gray-400 text-md mt-2">Day 1 - Round 1</p>
      </header>

      {/* Leaderboards */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Table */}
        <LeaderboardTable data={firstHalf} />

        {/* Second Table */}
        {secondHalf.length > 0 && <LeaderboardTable data={secondHalf} />}
      </div>
    </div>
  );
}

// LeaderboardTable component
function LeaderboardTable({ data }) {
  return (
    <div className="space-y-1">
      {/* Header Row */}
      <div className="grid grid-cols-7 bg-gray-700 text-white text-sm font-semibold py-2 px-3">
        <div>Rank</div>
        <div className="col-span-2">Team</div>
        <div>Matches</div>
        <div>Place Pts</div>
        <div>Kills</div>
        <div>Total Pts</div>
      </div>

      {/* Rows */}
      {data.map((team, index) => (
        <div
          key={index}
          className="grid grid-cols-7 items-center bg-gray-800 text-gray-200 py-2 px-3 shadow-sm hover:bg-gray-700 transition-all"
        >
          <div>{team.rank}</div>
          <div className="col-span-2 font-medium">{team.team}</div>
          <div>{team.matches}</div>
          <div>{team.placePoints}</div>
          <div>{team.kills}</div>
          <div className="font-bold text-yellow-400">{team.totalPoints}</div>
        </div>
      ))}
    </div>
  );
}

export default TournamentPage;
