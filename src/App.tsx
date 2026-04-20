import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Instructors from './pages/Instructors';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Gallery from './pages/Gallery';
import Questions from './pages/Questions';
import ToyotaCityPilates from './pages/ToyotaCityPilates';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NewBlogPost from './pages/NewBlogPost';
import EditBlogPost from './pages/EditBlogPost';
import BlogAdmin from './pages/BlogAdmin';
import FirebaseAdmin from './pages/FirebaseAdmin';
import TranslationsAdmin from './pages/TranslationsAdmin';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<Faq />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="questions" element={<Questions />} />
            <Route path="toyota-city-pilates" element={<ToyotaCityPilates />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="blog/new" element={<NewBlogPost />} />
            <Route path="blog/:id/edit" element={<EditBlogPost />} />
          </Route>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/blog" element={<BlogAdmin />} />
          <Route path="/admin/firebase" element={<FirebaseAdmin />} />
          <Route path="/admin/translations" element={<TranslationsAdmin />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;