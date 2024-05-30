import React, { useState } from "react";
import axios from "axios";

const AddPartForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Lista kategorii
  const categories = [
    "Procesor",
    "Karta graficzna",
    "Pamięć RAM",
    "Płyta główna",
    "Dysk SSD",
    "Obudowa",
    "Zasilacz",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPart = {
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    try {
      await axios.post("http://localhost:5000/api/parts", newPart);
      alert("Podzespół dodany pomyślnie!");
    } catch (err) {
      alert("Błąd podczas dodawania podzespołu");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nazwa:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Kategoria:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Wybierz kategorię</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Cena:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ilość sztuk:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <button type="submit">Dodaj podzespół</button>
    </form>
  );
};

export default AddPartForm;
