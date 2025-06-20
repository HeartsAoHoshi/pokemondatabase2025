import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    type_id: "",
    set_id: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Simple validation
    if (!formData.name || !formData.hp || !formData.type_id || !formData.set_id) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/cards");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add card.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Pokémon Card</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Card Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Pikachu"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">HP</label>
          <input
            type="number"
            name="hp"
            className="form-control"
            value={formData.hp}
            onChange={handleChange}
            placeholder="e.g., 60"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Type ID</label>
          <input
            type="number"
            name="type_id"
            className="form-control"
            value={formData.type_id}
            onChange={handleChange}
            placeholder="e.g., 1 (Electric)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Set ID</label>
          <input
            type="number"
            name="set_id"
            className="form-control"
            value={formData.set_id}
            onChange={handleChange}
            placeholder="e.g., 2 (Base Set)"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Add Card
        </button>
      </form>
    </div>
  );
};

export default AddCard;
