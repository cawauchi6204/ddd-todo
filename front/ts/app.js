import React from "react";
import { createRoot } from 'react-dom/client';
import Hello from "./Hello";
import Register from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="users" element={<Users />}> */}
        {/* <Route path="me" element={<OwnUserProfile />} />
        <Route path=":id" element={<UserProfile />} />
      </Route> */}
      </Routes>
    </BrowserRouter>;
  </React.StrictMode>
);
