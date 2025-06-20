import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(0, 0, 0, 0.7)",
      padding: "16px 32px",
      borderBottom: "2px solid #ffcb05"
    },
    title: {
      color: "#ffcb05",
      fontSize: "24px",
      margin: 0
    },
    links: {
      display: "flex",
      gap: "20px"
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: "bold"
    }
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Pokémon TCG DB</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cards" style={styles.link}>Card List</Link>
        <Link to="/cards/new" style={styles.link}>Add Card</Link>
      </div>
    </nav>
  );
}

export default Navbar;
