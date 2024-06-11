import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/HeroSection';
import Features from './components/FeaturesSection';
import Pricing from './components/PricingSection';
import Contact from './components/ContactSection';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Reports from './pages/Reports/Reports';
import Help from './pages/Help/Help';
import Account from './pages/Account/Account';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => (
  <Router>
    <main>
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Features />
            <Pricing />
            <Contact />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/account" element={<ProtectedRoute component={Account} />} />
        <Route path="/reports" element={<ProtectedRoute component={Reports} />} />
        <Route path="/help" element={<ProtectedRoute component={Help} />} />
        <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;