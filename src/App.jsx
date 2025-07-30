import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import JoburgVis from './Joburg_vis';
import Info from './Info';

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

    const toggleInfo = () => {
    if (location.pathname === '/info') {

      console.log('map', location.pathname)
      navigate('/');
    } else {
      console.log('info', location.pathname)
      navigate('/info');
    }
  };

  return (
    <>
      <button
        onClick={() => toggleInfo()}
        style={{
          position: 'fixed',
          top: 100,
          right: 20,
          zIndex: 100,
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
     {location.pathname === '/info' ? 'Back to Map' : 'Go to Info'}
      </button>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<JoburgVis />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');

// Create a global variable to store the root outside of the window or container if needed
let root = window._reactRoot;

if (!root) {
  root = ReactDOM.createRoot(container);
  window._reactRoot = root;
}

root.render(<App />);
