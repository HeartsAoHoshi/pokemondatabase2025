import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to Pokémon TCG Database</h1>
      <Link to="/cards">Browse Cards</Link>
    </div>
  );
};

export default Homepage;
