import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectPart = () => {
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/parts");
        setParts(response.data);
      } catch (err) {
        console.error("Błąd podczas pobierania podzespołów", err);
      }
    };

    fetchParts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/parts/reduce", {
        id: selectedPart,
        quantity: parseInt(quantity),
      });
      alert("Podzespół zaktualizowany pomyślnie!");
      setQuantity("");
    } catch (err) {
      alert("Błąd podczas aktualizowania podzespołu");
    }
  };

  return (
    <div>
      <h1>Wybierz Podzespół do Zmniejszenia Ilości</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Podzespół:</label>
          <select
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
            required
          >
            <option value="">Wybierz podzespół</option>
            {parts.map((part) => (
              <option key={part._id} value={part._id}>
                {part.name} ({part.category}) - {part.quantity} szt.
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ilość sztuk do usunięcia:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Zatwierdź</button>
      </form>
    </div>
  );
};

export default SelectPart;
