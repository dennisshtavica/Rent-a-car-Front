import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../scss/sections/_error404.scss";

function Error404() {
  return (
    <div className="container">
      <Header />
      <div className="errorCtn">
        <h1>Page not found</h1>
        <p>404</p>
        <Link to="/">Go back home -</Link>
      </div>
    </div>
  );
}

export default Error404;
