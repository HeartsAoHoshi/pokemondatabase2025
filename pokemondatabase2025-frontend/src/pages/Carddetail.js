import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cards/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Card not found");
        }
        return res.json();
      })
      .then((data) => setCard(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!card) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{card.name}</h2>
      <p><strong>HP:</strong> {card.hp}</p>
      <p><strong>Type:</strong> {card.type?.name}</p>
      <p><strong>Set:</strong> {card.set?.name}</p>

      <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
        Back
      </button>
    </div>
  );
};

export default CardDetail;
