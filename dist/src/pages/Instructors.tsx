import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import Section from '../components/Section';
import OptimizedImage from '../components/OptimizedImage';
import { useTranslation } from '../i18n/useTranslation';

const Instructors: React.FC = () => {
  const { t } = useTranslation();
  
  return (
      <>
        {/* ページヘッダー */}
        <div className="relative pt-32 pb-16 text-white">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <OptimizedImage
                src="/src/assets/IMG/IMG_2593.jpeg"
                alt={t('instructors.title')}
                className="w-full h-full object-cover"
                loading="eager"
                quality={90}
                format="webp"
            />
            <div className="absolute inset-0 bg-turquoise-900 bg-opacity-70 z-0" />
          </div>
          <Container className="relative z-10">
            <div className="max-w-3xl">
              <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-serif font-bold mb-4"
              >
                {t('instructors.title')}
              </motion.h1>
              <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-white/90"
              >
                {t('instructors.subtitle')}
              </motion.p>
            </div>
          </Container>
        </div>

        {/* インストラクター紹介セクション */}
        <Section>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* 秋間まゆ - オーナー・インストラクター */}
              <div className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-96 overflow-hidden">
                  <OptimizedImage
                      src="/src/assets/IMG/IMG_1118.jpeg"
                      alt={t('instructors.akimaMayu')}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="eager"
                      quality={90}
                      format="webp"
                      sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-turquoise-700 mb-2">{t('instructors.akimaMayu')}</h3>
                  <p className="text-turquoise-600 mb-4 text-lg">{t('instructors.ownerInstructor')}</p>

                  <div className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-turquoise-700 mb-2 text-lg">{t('instructors.greeting')}</h4>
                      <p className="text-gray-800 leading-relaxed">
                        {t('instructors.greetingContent')}
                      </p>
                    </div>

                    <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-turquoise-700 mb-2 text-lg">{t('instructors.qualifications')}</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>{t('instructors.qualification1')}</li>
                        <li>{t('instructors.qualification2')}</li>
                        <li>{t('instructors.qualification3')}</li>
                        <li>{t('instructors.qualification4')}</li>
                        <li>{t('instructors.qualification5')}</li>
                      </ul>
                    </div>

                    <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-turquoise-700 mb-2 text-lg">{t('instructors.message')}</h4>
                      <p className="text-gray-800 leading-relaxed">
                        {t('instructors.messageContent')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                  <span className="bg-turquoise-100 text-turquoise-700 text-sm px-3 py-1 rounded-full">
                    {t('instructors.specialty1')}
                  </span>
                    <span className="bg-turquoise-100 text-turquoise-700 text-sm px-3 py-1 rounded-full">
                    {t('instructors.specialty2')}
                  </span>
                    <span className="bg-turquoise-100 text-turquoise-700 text-sm px-3 py-1 rounded-full">
                    {t('instructors.specialty3')}
                  </span>
                    <span className="bg-turquoise-100 text-turquoise-700 text-sm px-3 py-1 rounded-full">
                    {t('instructors.specialty4')}
                  </span>
                  </div>
                </div>
              </div>

              {/* 指導理念 */}
              <div className="sticky top-8 bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-serif font-bold text-turquoise-700 mb-6">
                  {t('instructors.teachingPhilosophy')}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mb-6"></div>

                <div className="space-y-6">
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-turquoise-700 mb-3">{t('instructors.threePromises')}</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-turquoise-500 text-2xl mr-2">●</span>
                        <span className="flex-1 text-gray-800">
                        {t('instructors.promise1')}
                        <p className="text-sm text-gray-600 mt-1">{t('instructors.promise1Desc')}</p>
                      </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-turquoise-500 text-2xl mr-2">●</span>
                        <span className="flex-1 text-gray-800">
                        {t('instructors.promise2')}
                        <p className="text-sm text-gray-600 mt-1">{t('instructors.promise2Desc')}</p>
                      </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-turquoise-500 text-2xl mr-2">●</span>
                        <span className="flex-1 text-gray-800">
                        {t('instructors.promise3')}
                        <p className="text-sm text-gray-600 mt-1">{t('instructors.promise3Desc')}</p>
                      </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-turquoise-700 mb-3">{t('instructors.treatableCases')}</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">{t('instructors.case1')}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">{t('instructors.case2')}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">{t('instructors.case3')}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">{t('instructors.case4')}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">{t('instructors.case5')}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">{t('instructors.case6')}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <blockquote className="text-center italic text-gray-700">
                      {t('instructors.quote')}
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </>
  );
};

export default Instructors;