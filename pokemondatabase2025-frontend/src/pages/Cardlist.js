import React, { useEffect, useState } from "react";

function CardList() {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchCards = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cards");
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const deleteCard = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cards/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCards(cards.filter((card) => card.id !== id));
      } else {
        alert("Failed to delete card");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const viewDetails = (card) => {
    alert(
      `Viewing details for ${card.name}\nHP: ${card.hp}\nType: ${card.type?.name}\nSet: ${card.set?.name}`
    );
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Pokemon Cards</h2>
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
        <ul>
          {filteredCards.map((card) => (
            <li key={card.id} style={{ marginBottom: "1rem" }}>
              <strong>{card.name}</strong> - HP: {card.hp} - Type: {card.type?.name} - Set:{" "}
              {card.set?.name}
              <br />
              <button
                onClick={() => viewDetails(card)}
                style={{ marginRight: "10px", marginTop: "0.5rem" }}
              >
                View Details
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${card.name}"?`)) {
                    deleteCard(card.id);
                  }
                }}
                style={{ marginTop: "0.5rem" }}
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

export default CardList;
