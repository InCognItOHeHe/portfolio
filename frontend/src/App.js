import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddPartForm from "./components/AddPartForm";
import SelectPart from "./components/SelectPart";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/add">Dodaj Podzespół</Link>
            </li>
            <li>
              <Link to="/select">Wybierz Podzespół</Link>
            </li>
          </ul>
        </nav>
        <h1>Sklep z Podzespołami Komputerowymi</h1>
        <Routes>
          <Route path="/add" element={<AddPartForm />} />
          <Route path="/select" element={<SelectPart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
