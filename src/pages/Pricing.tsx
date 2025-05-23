import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import Container from '../components/Container';
import OptimizedBackgroundImage from '../components/OptimizedBackgroundImage';
import Button from '../components/Button';
import { Gem, Calendar, Award, Tag, Gift, Clock, Coins, CreditCard, Check, Users, CircleDollarSign, ClipboardCheck, Zap, Medal, LucideIcon } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

// Nouveau composant pour remplacer ProgramCard avec des icônes
interface PriceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: LucideIcon;
  color?: "turquoise" | "gold" | "pink";
  ctaText: string;
  popular?: boolean;
}

const PriceCard: React.FC<PriceCardProps> = ({ 
  title, 
  description, 
  price, 
  features, 
  icon: Icon,
  color = "turquoise",
  ctaText, 
  popular = false 
}) => {
  const { t } = useTranslation();
  const colorStyles = {
    turquoise: "bg-gradient-to-br from-turquoise-50 via-turquoise-100/30 to-white",
    gold: "bg-gradient-to-br from-gold-50 via-gold-100/30 to-white",
    pink: "bg-gradient-to-br from-pink-50 via-pink-100/30 to-white"
  };
  
  return (
    <motion.div 
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${
        popular ? 'border-2 border-gold-500 relative' : 'border border-neutral-200'
      }`}
      whileHover={{ y: -5 }}
    >
      {popular && (
        <div className="absolute top-4 right-4 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {t('pricing.recommended')}
        </div>
      )}
      
      <div className={`${colorStyles[color]} p-8 flex flex-col items-center`}>
        <div className={`w-20 h-20 ${popular ? 'bg-gold-100' : 'bg-turquoise-100'} rounded-full flex items-center justify-center shadow-inner mb-4`}>
          <Icon className={`h-10 w-10 ${popular ? 'text-gold-500' : 'text-turquoise-500'}`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{title}</h3>
        <p className="text-gray-600 mb-4 text-center">{description}</p>
        <div className={`text-center mb-4 ${popular ? 'text-gold-500' : 'text-turquoise-500'}`}>
          <span className="text-3xl font-bold">{price}</span>
        </div>
      </div>
      
      <div className="bg-white p-6 flex flex-col flex-grow">
        <ul className="mb-6 flex-grow space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <Check className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${popular ? 'text-gold-500' : 'text-turquoise-500'}`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {popular ? <Button
          variant={popular ? "gold" : "primary"}
          onClick={() => window.open('https://lin.ee/Rvbat7l', '_blank')}

          className="w-full"
        >
          {ctaText}
        </Button>
            :<></>}

      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      {/* En-tête de page avec fond coloré au lieu d'une image */}
      <div className="relative pt-32 pb-16 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-r from-turquoise-700 to-turquoise-500">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform rotate-45 -translate-x-1/4 -translate-y-1/4 -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute transform -rotate-12 translate-x-1/4 translate-y-1/4 right-1/4 bottom-1/4 w-1/2 h-1/2 bg-white/20 rounded-full blur-3xl"></div>
          </div>
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-serif font-bold mb-4"
            >
              {t('pricing.title')}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/90"
            >
              {t('pricing.subtitle')}
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Programs Section */}
      <Section>
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-turquoise-700 mb-4">
              {t('pricing.priceList')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-800 text-lg p-3 bg-white/80 rounded-lg shadow-sm max-w-2xl mx-auto">
              {t('pricing.openingCampaign')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Program 1 */}
            <PriceCard
              title={t('pricing.firstTrial')}
              description={t('pricing.firstTrialDesc')}
              price={t('pricing.firstTrialPrice')}
              features={[
                t('pricing.normalPrice'),
                t('pricing.professionalEvaluation'),
                t('pricing.individualProgram'),
                t('pricing.nutritionAdvice'),
                t('pricing.limitedOffer')
              ]}
              icon={Gift}
              color="turquoise"
              ctaText={t('pricing.bookNow')}
              popular
            />

            {/* Program 2 */}
            <PriceCard
              title={t('pricing.fiveTickets')}
              description={t('pricing.fiveTicketsDesc')}
              price={t('pricing.fiveTicketsPrice')}
              features={[
                t('pricing.perSession'),
                t('pricing.validityMonths'),
                t('pricing.paymentOptions'),
                t('pricing.personalFollow')
              ]}
              icon={Calendar}
              color="pink"
              ctaText={t('pricing.choose')}
            />

            {/* Program 3 */}
            <PriceCard
              title={t('pricing.tenTickets')}
              description={t('pricing.tenTicketsDesc')}
              price={t('pricing.tenTicketsPrice')}
              features={[
                t('pricing.perSession2'),
                t('pricing.validityMonths2'),
                t('pricing.cashOrBankTransfer'),
                t('pricing.customProgram'),
                t('pricing.detailedProgress')
              ]}
              icon={Award}
              color="turquoise"
              ctaText={t('pricing.choose')}
            />
          </div>
        </Container>
      </Section>

      {/* Pricing Details */}
      <Section className="bg-turquoise-50">
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-turquoise-700 mb-4">
              {t('pricing.priceDetails')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-800 text-lg p-3 bg-white/80 rounded-lg shadow-sm max-w-2xl mx-auto">
              {t('pricing.openingCampaignDetails')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pricing Details 1 */}
            <div className="flex flex-col md:flex-row bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-6">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto md:mx-0 md:mr-6 mb-4 md:mb-0 shadow-inner">
                <Tag className="h-8 w-8 text-turquoise-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-turquoise-700 mb-3 text-center md:text-left">{t('pricing.membershipFee')}</h3>
                <p className="text-gray-800 mb-4 p-3 bg-white/80 rounded-lg">
                  <span className="line-through text-gray-500">5500円</span>
                  <span className="text-turquoise-700 font-bold text-xl ml-3">0円</span>
                  <br />
                  {t('pricing.membershipFeeDesc')}
                </p>
              </div>
            </div>

            {/* Pricing Details 2 */}
            <div className="flex flex-col md:flex-row bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-6">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto md:mx-0 md:mr-6 mb-4 md:mb-0 shadow-inner">
                <Coins className="h-8 w-8 text-gold-500" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-turquoise-700 mb-3 text-center md:text-left">{t('pricing.singleSession')}</h3>
                <p className="text-gray-800 mb-4 p-3 bg-white/80 rounded-lg">
                  <span className="text-turquoise-700 font-bold text-xl">{t('pricing.singleSessionPrice')}</span>
                  <br />
                  {t('pricing.singleSessionDesc')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Payment Terms */}
      <Section>
        <Container>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-turquoise-700 mb-4">
              {t('pricing.paymentAndCancellation')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <CreditCard className="h-6 w-6 text-turquoise-500 mr-3" />
              <h3 className="text-xl font-bold text-turquoise-700">{t('pricing.paymentMethods')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start p-3 bg-white/80 rounded-lg">
                <Clock className="h-5 w-5 text-turquoise-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{t('pricing.ticketValidity')}</span>
              </li>
              <li className="flex items-start p-3 bg-white/80 rounded-lg">
                <CreditCard className="h-5 w-5 text-turquoise-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{t('pricing.paymentOptionsDetails')}</span>
              </li>
              <li className="flex items-start p-3 bg-white/80 rounded-lg">
                <CircleDollarSign className="h-5 w-5 text-turquoise-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{t('pricing.tenTicketPayment')}</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <ClipboardCheck className="h-6 w-6 text-turquoise-500 mr-3" />
              <h3 className="text-xl font-bold text-turquoise-700">{t('pricing.cancellationPolicy')}</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start p-3 bg-white/80 rounded-lg">
                <Check className="h-5 w-5 text-turquoise-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{t('pricing.cancelPolicyRule1')}</span>
              </li>
              <li className="flex items-start p-3 bg-white/80 rounded-lg">
                <Check className="h-5 w-5 text-turquoise-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{t('pricing.cancelPolicyRule2')}</span>
              </li>
              <li className="flex items-start p-3 bg-white/80 rounded-lg">
                <Check className="h-5 w-5 text-turquoise-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{t('pricing.cancelPolicyRule3')}</span>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Pricing;
