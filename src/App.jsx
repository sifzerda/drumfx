//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {

  return (
    <Router>
      <div>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
            <li style={{ margin: '0 10px' }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <Link to="/about">About</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
