import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <h1>WELCOME TO RTU</h1>
      <Link to="/login" className="btn">Login</Link>
      <Link to="/register" className="btn">Register</Link>
    </div>
  );
}

export default Home;
