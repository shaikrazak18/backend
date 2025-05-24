import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';  // <-- Import your CSS here

import Home from './Home';
import Blog from './Blog';
import Register from './Register';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/blog">Blog</Link> | <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
