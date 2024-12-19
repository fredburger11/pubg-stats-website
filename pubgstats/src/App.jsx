import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Correct import for HomePage
import TournamentPage from './pages/TournamentPage'; // Correct import for TournamentPage
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-gray-800 text-white py-12 px-6 flex items-center justify-between">
          {/* Home button */}
          <Link to="/">
            <img src="/icetracker.png" alt="Home" className="h-20 w-auto cursor-pointer" />
          </Link>
          <nav>
          <Link to="/search" className="text-lg font-semibold text-white hover:text-blue-400">
            Search Players
          </Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tournament/:id" element={<TournamentPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
          <p>© 2024 PUBG Tournaments. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
