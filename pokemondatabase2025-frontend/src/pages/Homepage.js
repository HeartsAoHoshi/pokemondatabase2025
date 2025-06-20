import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to Pokémon TCG Database</h1>
      <Link to="/cards" style={{ fontSize: "1.2rem", color: "#007bff", textDecoration: "none" }}>
        Browse Cards
      </Link>
    </div>
  );
};

export default Homepage;
