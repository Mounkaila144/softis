import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { useTranslation } from '../i18n/useTranslation';

import Hero from '../components/Hero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const heroImages = [
    "/src/assets/IMG/img.png",
    "/src/assets/IMG/IMG_1601.jpeg",
  ];
  
  const heroTitles = [
    t('home.welcome')
  ];
  
  const heroSubtitles = [
    t('home.subtitle')
  ];

  // Schema.orgのデータ構造を作成
  const studioSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Softis | 豊田市 ピラティススタジオ',
    'description': '豊田市駅徒歩1分の好立地にある、理学療法士が運営するパーソナルピラティススタジオ。姿勢改善、ボディメイク、健康促進をサポートします。',
    'image': '/src/assets/IMG/img.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '豊田市',
      'addressLocality': '愛知県',
      'postalCode': '',
      'addressCountry': 'JP'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '35.0868',
      'longitude': '137.1569'
    },
    'url': 'https://softis.jp',
    'telephone': '',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '10:00',
      'closes': '20:00'
    },
    'priceRange': '¥¥',
    'servesCuisine': 'ピラティス, フィットネス, リハビリテーション',
    'keywords': 'Softis, softis, 豊田市 ピラティス, 豊田市, ピラティス, パーソナルトレーニング, 姿勢改善'
  };

  return (
    <>
      <Seo 
        title="Softis | 豊田市 ピラティス | 理学療法士による専門指導"
        description="豊田市駅徒歩1分のSoftisピラティススタジオ。理学療法士資格を持つインストラクターによる完全パーソナルピラティスレッスンで、姿勢改善・ボディメイク・健康促進をサポート。初心者も安心の丁寧な指導と多数のピラティスマシンで効果的なトレーニングを。"
        keywords="Softis, softis, 豊田市 ピラティス, 豊田市, ピラティス, パーソナルトレーニング, 理学療法士, 姿勢改善, ボディメイク, 健康促進, ピラティスマシン, リフォーマー, 駅近, 豊田市駅"
        structuredData={studioSchema}
        canonical="https://softis.jp/"
      />
      <Hero
        titles={heroTitles}
        subtitles={heroSubtitles}
        ctaText="ご予約はこちら"
        images={heroImages}
        onCtaClick={() => window.open('https://lin.ee/Rvbat7l', '_blank')}
      />
      


      {/* ピラティスに通うとどうなるの？ */}
      <Section className="bg-turquoise-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
              {t('home.aboutSoftis')}
            </h2>
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-turquoise-600 mb-4">{t('home.pilatesLedByTherapist')}</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="inline-block w-12 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full"></span>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                {t('home.studioDescription')}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-turquoise-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{t('home.expertInstruction')}</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-turquoise-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{t('home.oneMinWalk')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* プロフィール情報 */}
          <div className="mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-8 bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-turquoise-600 mb-4">{t('home.studioFeatures')}</h3>
                <div className="flex items-center justify-center mb-6">
                  <span className="inline-block w-12 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full"></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start p-3 bg-white/80 rounded-lg shadow-sm">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-turquoise-100 text-turquoise-600 rounded-full mr-3 font-bold">1</span>
                    <p className="text-gray-800 text-left">{t('home.feature1')}</p>
                  </div>
                  
                  <div className="flex items-start p-3 bg-white/80 rounded-lg shadow-sm">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-turquoise-100 text-turquoise-600 rounded-full mr-3 font-bold">2</span>
                    <p className="text-gray-800 text-left">{t('home.feature2')}</p>
                  </div>
                  
                  <div className="flex items-start p-3 bg-white/80 rounded-lg shadow-sm">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-turquoise-100 text-turquoise-600 rounded-full mr-3 font-bold">3</span>
                    <p className="text-gray-800 text-left">{t('home.feature3')}</p>
                  </div>
                  
                  <div className="flex items-start p-3 bg-white/80 rounded-lg shadow-sm">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-turquoise-100 text-turquoise-600 rounded-full mr-3 font-bold">4</span>
                    <p className="text-gray-800 text-left">{t('home.feature4')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* イメージカード */}
          <h2 className="text-3xl md:text-4xl text-center font-serif font-bold text-black mb-4">
            {t('home.whatHappensPilates')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-turquoise-100 rounded-xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/5] overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/home2/1.png"
                  alt="白 ブルー シンプル 水彩 ミニマル information Instagramの投稿のコピー - "
                  className="w-full h-full object-cover object-center"
                  quality={55}
                  loading="lazy"
                  format="webp"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={600}
                  height={750}
                />
              </div>
            </div>
            
            <div className="bg-turquoise-100 rounded-xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/5] overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/home2/2.png"
                  alt="白 ブルー シンプル 水彩 ミニマル information Instagramの投稿のコピー - 2(2)"
                  className="w-full h-full object-cover object-center"
                  quality={55}
                  loading="lazy"
                  format="webp"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={600}
                  height={750}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* スタジオについて */}
      <Section className="bg-white relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <OptimizedImage
            src="/src/assets/IMG/IMG_2364.jpeg"
            alt="Studio background"
            className="w-full h-full object-cover"
            loading="lazy"
            quality={90}
            format="webp"
          />
          <div className="absolute inset-0 bg-turquoise-900 bg-opacity-70 z-0" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl">
        
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="mt-8 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  {t('home.recommendedFor')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">1</span>
                    <p className="text-white/90">
                      {t('home.recommendation1')}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">2</span>
                    <p className="text-white/90">
                      {t('home.recommendation2')}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">3</span>
                    <p className="text-white/90">
                      {t('home.recommendation3')}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">4</span>
                    <p className="text-white/90">
                      {t('home.recommendation4')}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">5</span>
                    <p className="text-white/90">
                      {t('home.recommendation5')}
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  {t('home.pilatesEffects')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">1</span>
                    <p className="text-white/90">
                      {t('home.effect1')}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">2</span>
                    <p className="text-white/90">
                      {t('home.effect2')}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">3</span>
                    <p className="text-white/90">
                      {t('home.effect3')}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">4</span>
                    <p className="text-white/90">
                      {t('home.effect4')}
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">5</span>
                    <p className="text-white/90">
                      {t('home.effect5')}
                    </p>
                  </li>
                </ul>
              </div>
              
              <p className="text-white text-lg font-bold mt-4">
                {t('home.comingSoon')}
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>
      <div className="text-right mt-8">
        <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/pricing')}
        >
          {t('home.getStarted')} test
        </Button>
      </div>
      {/* ご利用方法 */}
      <Section id="flow">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
              {t('home.howToUse')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-8"></div>
          </div>

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-8">
            <div className="flex flex-col space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mr-6 shadow-md">
                  <span className="text-white text-xl font-bold">①</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-turquoise-600">{t('home.step1Title')}</h3>
                  <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                    {t('home.step1Description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mr-6 shadow-md">
                  <span className="text-white text-xl font-bold">②</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-turquoise-600">{t('home.step2Title')}</h3>
                  <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                    {t('home.step2Description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-800 mb-6 bg-white/80 p-3 rounded-lg shadow-sm">
                {t('home.firstLesson')}
              </p>
              <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.open('https://lin.ee/Rvbat7l', '_blank')}
                  className="shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
              >
                {t('home.bookWithLine')}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ピラティスマシン */}
      <Section className="bg-turquoise-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-turquoise-700 mb-4">
              {t('home.machines')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-800 text-lg bg-white/80 p-3 rounded-lg shadow-sm max-w-2xl mx-auto">
              {t('home.machinesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* マシン 1: リフォーマー */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/machine/IMG_6780.jpeg" 
                  alt="ピラティスリフォーマー" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  quality={85}
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">{t('home.reformer')}</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  {t('home.reformerDescription')}
                </p>
              </div>
            </motion.div>

            {/* マシン 2: バレル */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/machine/IMG_1541.jpeg" 
                  alt="ピラティスバレル" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  quality={85}
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">{t('home.barrel')}</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  {t('home.barrelDescription')}
                </p>
              </div>
            </motion.div>

            {/* マシン 3: チェア */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/machine/IMG_1542.jpeg" 
                  alt="ピラティスチェア" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  quality={85}
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">{t('home.chair')}</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  {t('home.chairDescription')}
                </p>
              </div>
            </motion.div>

            {/* マシン 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/machine/img.png" 
                  alt="ピラティス専用マシン" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  quality={85}
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">{t('home.specialMachine1')}</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  {t('home.specialMachine1Description')}
                </p>
              </div>
            </motion.div>

            {/* マシン 5 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/machine/img_1.png" 
                  alt="ピラティス専用マシン" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  quality={85}
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">{t('home.tower')}</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  {t('home.towerDescription')}
                </p>
              </div>
            </motion.div>

            {/* マシン 6 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/machine/img_2.png" 
                  alt="ピラティス専用マシン" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  quality={85}
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">{t('home.spineCorrector')}</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  {t('home.spineCorrectorDescription')}
                </p>
              </div>
            </motion.div>

            {/* マシン 7 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-start-2 lg:col-start-auto"
            >
              <div className="h-64 overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/machine/img_3.png" 
                  alt="ピラティス専用マシン" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  quality={85}
                  format="webp"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">{t('home.specialMachine4')}</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  {t('home.specialMachine4Description')}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/gallery')}
                className="shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
            >
              {t('home.viewMore')}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;