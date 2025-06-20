import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cardlist from "./pages/Cardlist";
import Carddetail from "./pages/Carddetail";
import AddCard from "./pages/AddCard";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cards" element={<Cardlist />} />
          <Route path="/cards/new" element={<AddCard />} />
          <Route path="/cards/:id" element={<Carddetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
