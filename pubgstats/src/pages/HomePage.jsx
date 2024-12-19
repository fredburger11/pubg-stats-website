import React from 'react';
import { Link } from 'react-router-dom';

const tournaments = [
  { id: 1, name: 'Tournament Alpha', date: '2024-01-10', image: '/ice_league.png' },
  { id: 2, name: 'Tournament Beta', date: '2024-02-15', image: 'https://via.placeholder.com/400' },
  { id: 3, name: 'Tournament Gamma', date: '2024-03-20', image: 'https://via.placeholder.com/400' },
];

function HomePage() {
  return (
    <main className="homepage-main">
      <div className="container text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to PUBG Tournaments</h1>
        <p className="text-lg text-gray-300 mb-12">
          Explore and track the latest PUBG tournaments and player stats.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <Link to={`/tournament/${tournament.id}`} key={tournament.id}>
              <div className="tournament-card">
                <img
                  src={tournament.image}
                  alt={tournament.name}
                  className="rounded-lg mb-4 w-full h-40 object-cover"
                />
                <h3>{tournament.name}</h3>
                <p>Starts on: {tournament.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
