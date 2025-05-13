import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';

type NavbarProps = {
  scrolled: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { title: 'ホーム', path: '/' },
    { title: 'サービス', path: '/services' },
    { title: 'インストラクター', path: '/instructors' },
    { title: '予約', path: '/booking' },
    { title: 'アクセス', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/src/assets/logo.png"
              alt="softis" 
              className="h-8 w-auto mr-2"
            />
            <span className={`font-serif font-bold text-xl ${scrolled ? 'text-primary-500' : 'text-white'}`}>
              softis
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `font-medium transition-colors relative ${
                    scrolled 
                      ? isActive 
                        ? 'text-primary-500'
                        : 'text-neutral-700 hover:text-primary-500' 
                      : isActive 
                        ? 'text-white'
                        : 'text-white/90 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.title}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${scrolled ? 'bg-primary-500' : 'bg-white'}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <Button 
              variant={scrolled ? "gold" : "outline"} 
              size="sm"
              className={scrolled ? '' : 'border-white text-white hover:bg-white/10'}
            >
              無料体験
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className={scrolled ? 'text-primary-500' : 'text-white'} size={24} />
            ) : (
              <Menu className={scrolled ? 'text-primary-500' : 'text-white'} size={24} />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <Container>
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 font-medium ${isActive ? 'text-primary-500' : 'text-neutral-700'}`
                    }
                  >
                    {item.title}
                  </NavLink>
                ))}
                <Button variant="gold" size="sm" className="w-full">
                  無料体験
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;