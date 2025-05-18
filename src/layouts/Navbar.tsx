import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Container from '../components/Container';
import OptimizedImage from '../components/OptimizedImage';
import { LanguageSelector, useTranslation } from '../i18n/useTranslation';
import '../i18n/languageSelector.css';

type NavbarProps = {
  scrolled: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { title: t('common.home'), path: '/' },
    { title: t('common.pricing'), path: '/pricing' },
    { title: t('common.instructors'), path: '/instructors' },
    { title: t('common.contact'), path: '/contact' },
    { title: t('common.faq'), path: '/faq' },
    { title: t('common.blog'), path: '/blog' },
  ];

  const headerScrolledStyle = scrolled || mobileMenuOpen;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        headerScrolledStyle 
          ? 'bg-turquoise-100 shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          <div className="relative z-10" style={{ width: '130px', height: '20px' }}>
            <Link to="/" className="block">
              <div 
                className="absolute top-1/2 transform -translate-y-1/2" 
                style={{ 
                  height: headerScrolledStyle ? '60px' : '80px',
                  marginTop: headerScrolledStyle ? '0px' : '5px'
                }}
              >
                  <OptimizedImage
                    src="/src/assets/logo.png"
                    alt="Softis Logo"
                    className="h-full w-auto transition-all duration-500 opacity-90"
                    width={250}
                    height={250}
                    loading="eager"
                    quality={100}
                  />
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8 ml-auto">
            <LanguageSelector />
            
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `font-medium transition-colors relative ${
                    headerScrolledStyle 
                      ? isActive 
                        ? 'text-turquoise-500'
                        : 'text-neutral-700 hover:text-turquoise-500' 
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
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${headerScrolledStyle ? 'bg-turquoise-500' : 'bg-turquoise-100'}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          
          </nav>

          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className={headerScrolledStyle ? 'text-primary-500' : 'text-white'} size={24} />
            ) : (
              <Menu className={headerScrolledStyle ? 'text-primary-500' : 'text-white'} size={24} />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-turquoise-300"
          >
            <Container>
              <div className="py-4 space-y-4">
                <div className="flex justify-start py-2">
                  <LanguageSelector />
                </div>
                
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
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;