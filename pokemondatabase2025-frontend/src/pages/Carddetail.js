import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Carddetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cards/${id}`);
        if (!res.ok) throw new Error("Card not found");
        const data = await res.json();
        setCard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [id]);

  if (loading) return <p>Loading card details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{card.name}</h2>
      <p>HP: {card.hp}</p>
      <p>Type: {card.type?.name}</p>
      <p>Set: {card.set?.name}</p>
      {card.image_url && (
        <img src={card.image_url} alt={card.name} style={{ maxHeight: 200 }} />
      )}
      <button onClick={() => navigate("/cards")}>Back to Cards</button>
    </div>
  );
};

export default Carddetail;
