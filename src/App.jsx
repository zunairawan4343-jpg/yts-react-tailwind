import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Browse from "./Pages/Browse";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Top from "./Pages/Top";
import LastYear from "./Pages/LastYear";

import Detail from "./Pages/Detail";
import Liked from "./Pages/Liked";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/top100" element={<Top />} />
        <Route path="/lastyear" element={<LastYear />} />
        
        <Route path="/Heart" element={<Liked />} />
        <Route path="/detail/:id" element={<Detail />} />

        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
