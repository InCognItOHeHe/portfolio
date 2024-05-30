const express = require("express");
const router = express.Router();
const Part = require("../models/part");

// Pobieranie wszystkich podzespołów
router.get("/", async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dodawanie nowego podzespołu lub aktualizacja istniejącego
router.post("/", async (req, res) => {
  const { name, category, price, quantity } = req.body;

  try {
    let part = await Part.findOne({ name, category });

    if (part) {
      part.quantity += quantity;
      part.price = price; // Aktualizacja ceny
      part = await part.save();
      res.status(200).json(part);
    } else {
      part = new Part({
        name,
        category,
        price,
        quantity,
      });

      const newPart = await part.save();
      res.status(201).json(newPart);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Zmniejszanie ilości podzespołów
router.post("/reduce", async (req, res) => {
  const { id, quantity } = req.body;

  try {
    let part = await Part.findById(id);

    if (part && part.quantity >= quantity) {
      part.quantity -= quantity;
      part = await part.save();
      res.status(200).json(part);
    } else {
      res
        .status(400)
        .json({
          message:
            "Nie można zmniejszyć ilości, niewystarczająca ilość w magazynie.",
        });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
