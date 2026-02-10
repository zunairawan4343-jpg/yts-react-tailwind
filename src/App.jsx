import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
const Home = React.lazy(() => import ( "./Pages/Home"));
const Browse = React.lazy(() => import ( "./Pages/Browse"));
const Login = React.lazy(() => import ( "./Pages/Login"));
const SignUp = React.lazy(() => import ( "./Pages/SignUp"));
const Top = React.lazy(() => import ( "./Pages/Top"));
const LastYear = React.lazy(() => import ( "./Pages/LastYear"));
const Detail = React.lazy(() => import ( "./Pages/Detail"));

const Liked = React.lazy(() => import ( "./Pages/Liked"));


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
