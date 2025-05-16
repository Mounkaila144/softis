import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Instructors from './pages/Instructors';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Gallery from './pages/Gallery';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="booking" element={<Booking />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<Faq />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;