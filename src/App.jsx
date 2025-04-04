import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// const HomePage = lazy(() => import('./Pages/Pubic/Home/HomePage.jsx'));
// const AdminLogin = lazy(() => import('./Pages/Public/Login/AdminLogin.js'));
// const AdminDashboard = lazy(() => import('./Pages/Public/Dashboard/AdminDashboard.js'));
// const ContactPage = lazy(() => import('./Pages/Pubic/Contact/ContactPage.jsx'));
// const Login = lazy(() => import('./Pages/Public/Login/Login.js'));
// const Register = lazy(() => import('./Pages/Public/Register/Register.js'));
const OrderDetails = lazy(() => import('./Pages/Public/Orders/OrderDetails.jsx'));

// Add missing components
const LoadingBar = () => (
  <div className="loading-bar">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const PageTransition = ({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingBar />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <OrderDetails />
            </PageTransition>
          } />
          {/* <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } /> */}
          {/* <Route path="/register" element={
            <PageTransition>
              <Register />
            </PageTransition>
          } /> */}
          {/* <Route path="/contact" element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          } /> */}
          {/* <Route path="/order-details" element={
            <PageTransition>
              <OrderDetails />
            </PageTransition>
          } /> */}
          {/* <Route path="/admin/login" element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          } /> */}
         
          {/* <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <PageTransition>
                <AdminDashboard />
              </PageTransition>
            </ProtectedRoute>
          } /> */}
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App
