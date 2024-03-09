import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;




// RJuT85eI3fJU1qPJ
// mongodb+srv://hiteshmaurya:<password>@budgetdatacluster.zjtkagt.mongodb.net/?retryWrites=true&w=majority&appName=BudgetDataCluster