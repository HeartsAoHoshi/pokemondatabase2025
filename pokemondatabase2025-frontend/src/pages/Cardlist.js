import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cardlist = () => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/cards")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Pokémon Cards</h2>
        <Link to="/cards/new" className="btn btn-success">
          Add New Card
        </Link>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredCards.map((card) => (
          <div key={card.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">HP: {card.hp}</p>
                <p className="card-text">Type: {card.type?.name}</p>
                <p className="card-text">Set: {card.set?.name}</p>
                <Link to={`/cards/${card.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredCards.length === 0 && (
          <div className="col-12">
            <p className="text-muted">No cards match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cardlist;
