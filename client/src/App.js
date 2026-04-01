import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BorrowerForm from './components/BorrowerForm';
import BorrowerList from './components/BorrowerList';
import About from './pages/About';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBorrowerAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">📚 Library Registration</Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={
            <main className="main-content">
              <h1 className="title">📖 Book Borrowing Registration System</h1>
              <div className="container">
                <div className="form-section">
                  <h2>Đăng ký mượn sách</h2>
                  <BorrowerForm onBorrowerAdded={handleBorrowerAdded} />
                </div>
                <div className="list-section">
                  <h2>Danh sách người đã đăng ký</h2>
                  <BorrowerList refreshTrigger={refreshTrigger} />
                </div>
              </div>
            </main>
          } />
        </Routes>

        <footer className="footer">
          <p>&copy; 2024 Library Web Application. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
