import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';

import JoburgVis from './Joburg_vis';
import Info from './Info';

// NavbarLink doesn't support <Link> internally, so we conditionally style it
function Nav() {
  const location = useLocation();

  return (
    <Navbar fluid rounded className="fixed top-0 left-0 right-0 z-50" >
      {/* <NavbarBrand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Johannesburg Project
        </span>
      </NavbarBrand> */}
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink
          as="div"
          active={location.pathname === '/'}
        >
          <Link to="/">Visualisation</Link>
        </NavbarLink>
        <NavbarLink
          as="div"
          active={location.pathname === '/info'}
        >
          <Link to="/info">Info</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
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

// Mount app
const container = document.getElementById('root');
if (!container._reactRoot) {
  container._reactRoot = ReactDOM.createRoot(container);
}
container._reactRoot.render(<App />);
