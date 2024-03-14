import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";

const Department = () => {
  return (
    <>
      <Navbar />

      Hello from Deparment page.
    </>
  );
};

export default Department;
