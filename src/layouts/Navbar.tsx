import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Container from '../components/Container';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';

type NavbarProps = {
  scrolled: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { title: 'プレゼンテーション', path: '/' },
    { title: 'スタジオについて', path: '/services' },
    { title: 'アクセス', path: '/contact' },
    { title: 'ご利用の流れ', path: '/booking' },
    { title: 'よくある質問', path: '/faq' },
    { title: 'ギャラリー', path: '/gallery' },
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
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Logo - positioned absolutely to avoid shifting layout */}
          <div className="relative z-10" style={{ width: '130px', height: '20px' }}>
            <Link to="/" className="block">
              <div 
                className="absolute top-1/2 transform -translate-y-1/2" 
                style={{ 
                  height: scrolled ? '80px' : '100px',
                  marginTop: scrolled ? '0px' : '5px'
                }}
              >
                {scrolled ? (
                  <OptimizedImage
                    src="/src/assets/logoblack.png"
                    alt="Softis Logo"
                    className="h-full w-auto transition-all duration-500 opacity-90"
                    width={250}
                    height={250}
                    loading="eager"
                    quality={100}
                  />
                ) : (
                  <OptimizedImage
                    src="/src/assets/logo.png"
                    alt="Softis Logo"
                    className="h-full w-auto transition-all duration-500 opacity-90"
                    width={250}
                    height={250}
                    loading="eager"
                    quality={100}
                  />
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-auto">
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