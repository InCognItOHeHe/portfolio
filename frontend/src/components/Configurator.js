import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import "./Configurator.css"; // Importowanie pliku CSS

const Configurator = () => {
  const [partsByCategory, setPartsByCategory] = useState({});
  const [selectedParts, setSelectedParts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // Nowy stan dla całkowitej ceny

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

  const flattenParts = () => {
    return Object.values(partsByCategory).flatMap((parts) => parts);
  };

  // Funkcja do obliczania całkowitej ceny
  const calculateTotalPrice = () => {
    let total = 0;
    flattenParts().forEach((part) => {
      const selectedQuantity = selectedParts[part._id] || 0;
      total += part.price * parseInt(selectedQuantity);
    });
    return total.toFixed(2); // Zaokrąglamy do dwóch miejsc po przecinku
  };

  // Aktualizujemy całkowitą cenę po zmianie wybranych podzespołów
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedParts, partsByCategory]);

  return (
    <div className="container">
      <h1 className="title">Konfigurator Podzespołów</h1>
      <form onSubmit={handleSubmit}>
        <Accordion allowMultiple>
          {Object.entries(partsByCategory).map(([category, parts]) => (
            <AccordionItem key={category}>
              <h2>
                <AccordionButton className="accordion-button">
                  {category}
                </AccordionButton>
              </h2>
              <AccordionPanel className="accordion-panel">
                {parts.map((part) => (
                  <Flex key={part._id} className="item" alignItems="center">
                    <Text>
                      {part.name} - {part.quantity} szt.:
                    </Text>
                    <input
                      type="number"
                      name={part._id}
                      value={selectedParts[part._id] || ""}
                      onChange={handleSelectChange}
                      min="0"
                      max={part.quantity}
                    />
                  </Flex>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="total-price">Całkowita cena: {totalPrice} zł</div>
        <Button
          type="submit"
          colorScheme="blue"
          variant="solid"
          size="lg"
          mt={4}
        >
          Zatwierdź
        </Button>
      </form>
    </div>
  );
};

export default Configurator;
