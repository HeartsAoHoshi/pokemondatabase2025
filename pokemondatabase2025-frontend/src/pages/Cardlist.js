import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cardlist() {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/cards")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Failed to fetch cards:", err));
  }, []);

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cards/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Remove deleted card from state to update UI
        setCards(cards.filter((card) => card.id !== id));
      } else {
        alert("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div>
      <h2>Card List</h2>
      <input
        type="text"
        placeholder="Filter cards by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />

      {filteredCards.length === 0 ? (
        <p>No cards found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredCards.map((card) => (
            <li key={card.id} style={{ marginBottom: "1rem" }}>
              <strong>{card.name}</strong> - HP: {card.hp} - Type: {card.type?.name} - Set: {card.set?.name}
              <br />
              <img
                src={card.image_url}
                alt={card.name}
                style={{ height: 80, marginTop: "0.5rem" }}
              />
              <br />
              <button
                onClick={() => navigate(`/cards/${card.id}`)}
                style={{ marginTop: "0.5rem", marginRight: "10px" }}
              >
                View Details
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                style={{ marginTop: "0.5rem", backgroundColor: "red", color: "white" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cardlist;
