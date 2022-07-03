import React from "react";
import ReactDOM from "react-dom";
import Hello from "./Hello";
import Register from "./Register";

ReactDOM.render(
  <React.StrictMode>
    <Hello />
    <Register />
  </React.StrictMode>,
  document.getElementById("app")
);
