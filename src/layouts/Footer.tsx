import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Instagram } from 'lucide-react';
import Container from '../components/Container';
import { useTranslation } from '../i18n/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-turquoise-700 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/src/assets/logo.png"
                alt="softis" 
                className="h-8 w-auto mr-2 filter brightness-0 invert"
              />
              <span className="font-serif font-bold text-xl">
                Softis
              </span>
            </Link>
            <p className="text-neutral-300 mb-6">
              {t('footer.studioDescription')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/softis__pilates/?igsh=bTZ5d2Z2NzgwZGQw" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-white hover:text-gold-400 transition-colors flex items-center">
                <Instagram size={20} className="mr-2" />
                <span>@softis__pilates</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">{t('common.home')}</Link></li>
              <li><Link to="/instructors" className="text-neutral-300 hover:text-white transition-colors">{t('common.instructors')}</Link></li>
              <li><Link to="/pricing" className="text-neutral-300 hover:text-white transition-colors">{t('common.pricing')}</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">{t('common.contact')}</Link></li>
              <li><Link to="/gallery" className="text-neutral-300 hover:text-white transition-colors">{t('common.gallery')}</Link></li>
              <li><Link to="/faq" className="text-neutral-300 hover:text-white transition-colors">{t('common.faq')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.access')}</h3>
            <div className="flex">
              <MapPin className="mr-2 flex-shrink-0 text-turquoise-400" size={20} />
              <span className="text-neutral-300">{t('footer.address')}</span>
            </div>
            <p className="text-neutral-300 mt-4">
              {t('footer.stationAccess')}
            </p>
            <p className="text-neutral-300 mt-4">
              営業時間<br/>
              月〜土　日曜定休　10:00-21:00
            </p>

          </div>
        </div>

        <hr className="border-primary-700 mb-8" />

        <div className="text-center">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} Softis. {t('footer.allRightsReserved')}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;