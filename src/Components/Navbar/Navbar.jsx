import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext.jsx';
import winter from "/ImagePool/winter.png";
import lockOpen from "/ImagePool/lock-open.png";
import logoutIcon from "/ImagePool/lock-open.png"; // Add this icon to your ImagePool folder
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { userPhone, userDetails, logout } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle mobile menu toggle
  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Handle scroll and check if navbar should be sticky
  useEffect(() => {
    // For homepage, initially hide navbar
    if (location.pathname === '/') {
      setIsVisible(false);
    } else {
      // For other pages, always show navbar
      setIsVisible(true);
      setIsSticky(true);
    }

    // Function to check scroll position and handle navbar visibility
    const handleScroll = () => {
      // Only do scroll check on homepage
      if (location.pathname === '/') {
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
          const heroBottom = heroSection.getBoundingClientRect().bottom;
          // Show navbar only when hero section is scrolled out of view
          const shouldShow = heroBottom <= 0;
          
          setIsVisible(shouldShow);
          setIsSticky(shouldShow);
        }
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);
  
  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  // Get first name if user is logged in
  const firstName = userDetails?.firstName || '';
  
  return (
    <nav className={`dynamic-navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/">
            <img className="navbar-logo" alt="Winter Logo" src={winter} />
            <div className="navbar-brand">Ice Factory</div>
          </Link>
          
          {/* Welcome message when user is logged in */}
          {userPhone && firstName && (
            <div className="welcome-message">
              Welcome, {firstName}!
            </div>
          )}
        </div>
        
        <div className="navbar-center">
          <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>HOME</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>ABOUT</Link>
            <Link to="/orders" className={location.pathname.includes('/order') ? 'nav-link active' : 'nav-link'}>ORDER</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>CONTACT</Link>
          </div>
        </div>
        
        <div className="navbar-auth">
          {userPhone ? (
            <div className="auth-buttons">
              <Link to="/profile" className="auth-button user-profile">
                MY ACCOUNT
              </Link>
              <button onClick={handleLogout} className="auth-button logout">
                <img src={logoutIcon} alt="Logout" className="logout-icon" />
                LOGOUT
              </button>
            </div>
          ) : (
            <Link to="/login" className="auth-button login">
              <img src={lockOpen} alt="Lock" className="login-icon" />
              LOGIN
            </Link>
          )}
        </div>
        
        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
