import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import AddPartForm from "./components/AddPartForm";
import Configurator from "./components/Configurator";

const App = () => {
  return (
    <Router>
      <Flex direction="column" alignItems="center" p={4}>
        <Heading size="lg" mb={4}>
          Sklep z Podzespołami Komputerowymi
        </Heading>
        <Flex alignItems="center" mb={4}>
          <Link to="/add">
            <Button colorScheme="blue" variant="outline" mx={2}>
              Dodaj Podzespół
            </Button>
          </Link>
          <Link to="/configurator">
            <Button colorScheme="blue" variant="outline" mx={2}>
              Konfigurator Podzespołów
            </Button>
          </Link>
        </Flex>
        <Routes>
          <Route path="/add" element={<AddPartForm />} />
          <Route path="/configurator" element={<Configurator />} />
        </Routes>
      </Flex>
    </Router>
  );
};

export default App;
