import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Carddetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cards/${id}`)
      .then((res) => res.json())
      .then((data) => setCard(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!card) return <p>Loading...</p>;

  return (
    <div>
      <h2>{card.name}</h2>
      <p>HP: {card.hp}</p>
      <p>Type: {card.type?.name}</p>
      <p>Set: {card.set?.name}</p>
    </div>
  );
};

export default Carddetail;
