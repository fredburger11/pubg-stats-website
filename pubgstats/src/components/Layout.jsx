// src/components/Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header>
        <div
          className="relative w-full h-64 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1920x400')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white tracking-wide">
              PUBG Tournaments
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-4">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} PUBG Tournaments. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
