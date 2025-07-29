import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoburgVis from './Joburg_vis';
import Info from './Info';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoburgVis />}>
          <Route index element={<JoburgVis />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// ✅ Only create the root once
const container = document.getElementById('root');

if (!container._reactRoot) {
  container._reactRoot = ReactDOM.createRoot(container);
}

container._reactRoot.render(<App />);
