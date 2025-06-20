import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    hp: "",
    type_id: "",
    set_id: "",
    imageUrl: "",  // image URL field in form
  });

  const [types, setTypes] = useState([]);
  const [sets, setSets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypesAndSets = async () => {
      try {
        const [typeRes, setRes] = await Promise.all([
          fetch("http://localhost:5000/api/types"),
          fetch("http://localhost:5000/api/sets"),
        ]);

        const [typeData, setData] = await Promise.all([
          typeRes.json(),
          setRes.json(),
        ]);

        setTypes(typeData);
        setSets(setData);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
      }
    };

    fetchTypesAndSets();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.hp || !formData.type_id || !formData.set_id) {
      setError("Please fill out all required fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          hp: Number(formData.hp), // convert hp to number
          type_id: formData.type_id,
          set_id: formData.set_id,
          image_url: formData.imageUrl,  // fixed field name here
        }),
      });

      if (response.ok) {
        navigate("/cards");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to add card.");
      }
    } catch (err) {
      setError("Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Pokémon Card</h2>
      {error && <div className="text-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Card Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Pokémon name"
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
            placeholder="HP stat"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Card Type</label>
          <select
            name="type_id"
            className="form-select"
            value={formData.type_id}
            onChange={handleChange}
          >
            <option value="">Select a type</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Card Set</label>
          <select
            name="set_id"
            className="form-select"
            value={formData.set_id}
            onChange={handleChange}
          >
            <option value="">Select a set</option>
            {sets.map((set) => (
              <option key={set.id} value={set.id}>
                {set.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL input */}
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className="form-control"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.png"
          />
        </div>

        <div className="d-flex">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Adding..." : "Add Card"}
          </button>
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={() =>
              setFormData({
                name: "",
                hp: "",
                type_id: "",
                set_id: "",
                imageUrl: "",
              })
            }
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
