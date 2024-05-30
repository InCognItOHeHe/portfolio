import React, { useState, useEffect } from "react";
import axios from "axios";

const Configurator = () => {
  const [partsByCategory, setPartsByCategory] = useState({});
  const [selectedParts, setSelectedParts] = useState({});

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/parts");
        // Grupowanie podzespołów według kategorii
        const partsGroupedByCategory = response.data.reduce((acc, part) => {
          if (!acc[part.category]) {
            acc[part.category] = [];
          }
          acc[part.category].push(part);
          return acc;
        }, {});
        setPartsByCategory(partsGroupedByCategory);
      } catch (err) {
        console.error("Błąd podczas pobierania podzespołów", err);
      }
    };

    fetchParts();
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedParts({
      ...selectedParts,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const partsToReduce = Object.keys(selectedParts).map((partId) => ({
      id: partId,
      quantity: parseInt(selectedParts[partId]),
    }));

    try {
      await axios.post("http://localhost:5000/api/parts/reduce", {
        parts: partsToReduce,
      });
      alert("Podzespoły zaktualizowane pomyślnie!");
    } catch (err) {
      alert("Błąd podczas aktualizowania podzespołów");
    }
  };

  return (
    <div>
      <h1>Konfigurator Podzespołów</h1>
      <form onSubmit={handleSubmit}>
        {/* Generowanie listy rozwijanej dla każdej kategorii */}
        {Object.entries(partsByCategory).map(([category, parts]) => (
          <div key={category}>
            <h2>{category}</h2>
            {parts.map((part) => (
              <div key={part._id}>
                <label>
                  {part.name} - {part.quantity} szt.:
                </label>
                <input
                  type="number"
                  name={part._id}
                  value={selectedParts[part._id] || ""}
                  onChange={handleSelectChange}
                  min="0"
                  max={part.quantity}
                />
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Zatwierdź</button>
      </form>
    </div>
  );
};

export default Configurator;
