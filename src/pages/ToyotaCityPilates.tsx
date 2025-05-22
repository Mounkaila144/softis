import React from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { useTranslation } from '../i18n/useTranslation';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';

const ToyotaCityPilates: React.FC = () => {
  const { t } = useTranslation();

  // Schema.orgのデータ構造を作成
  const toyotaPilatesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': 'https://softis.jp/toyota-city-pilates'
    },
    'headline': '豊田市のピラティススタジオ | 駅徒歩1分 | Softis',
    'description': '豊田市駅徒歩1分のSoftisピラティススタジオ。理学療法士が運営する完全パーソナルピラティススタジオで姿勢改善、ボディメイク、健康促進。初心者歓迎！',
    'image': 'https://softis.jp/src/assets/IMG/img.png',
    'author': {
      '@type': 'Organization',
      'name': 'Softis ピラティススタジオ'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Softis',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://softis.jp/images/logo.png'
      }
    },
    'datePublished': '2023-01-01T08:00:00+08:00',
    'dateModified': '2024-10-30T08:00:00+08:00'
  };

  return (
    <>
      <Seo 
        title="豊田市 ピラティス | 駅徒歩1分 | 理学療法士経営 | Softis"
        description="豊田市駅徒歩1分のSoftisピラティススタジオ。理学療法士が運営する完全パーソナルピラティススタジオで姿勢改善、ボディメイク、健康促進。初心者も安心の丁寧な指導と多数のピラティスマシンで効果的なトレーニングを。"
        keywords="豊田市 ピラティス, 豊田市, ピラティス, Softis, softis, パーソナルトレーニング, 理学療法士, 姿勢改善, ボディメイク, 健康促進, 駅近"
        structuredData={toyotaPilatesSchema}
        canonical="https://softis.jp/toyota-city-pilates"
      />
      
      {/* メインヘッダー */}
      <Section className="bg-gradient-to-br from-turquoise-700 to-turquoise-900 text-white py-20">
        <Container>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              豊田市のピラティススタジオ <span className="text-turquoise-200">Softis</span>
            </h1>
            <div className="w-24 h-1 bg-turquoise-300 rounded-full mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              豊田市駅徒歩1分の好立地。理学療法士が運営する完全パーソナルピラティススタジオで、あなたの体と心を整えます。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-serif font-bold text-turquoise-200 mb-4">
                豊田市でピラティスをお探しの方へ
              </h2>
              
              <p className="text-lg">
                Softisは豊田市駅から徒歩1分、便利なアクセスのピラティススタジオです。理学療法士の資格を持つインストラクターによる丁寧な指導で、初心者の方も安心してトレーニングいただけます。
              </p>
              
              <p className="text-lg">
                身体の痛みや姿勢の悩み、健康増進まで、一人ひとりの目的に合わせたパーソナルプログラムをご提供します。
              </p>
              
              <div className="pt-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.open('https://lin.ee/Rvbat7l', '_blank')}
                  className="shadow-lg hover:shadow-xl transform transition hover:-translate-y-1"
                >
                  無料カウンセリング予約
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage 
                src="/src/assets/IMG/img.png"
                alt="豊田市のSoftisピラティススタジオ"
                className="w-full h-full object-cover"
                quality={90}
                format="webp"
              />
            </motion.div>
          </div>
        </Container>
      </Section>
      
      {/* 特徴セクション */}
      <Section className="bg-white py-16">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
              豊田市で選ばれる理由
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-turquoise-50 to-white border border-turquoise-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquoise-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-turquoise-700">理学療法士が指導</h3>
              <p className="text-gray-700 text-center">
                医学的知識を持った理学療法士が指導するため、安全で効果的なトレーニングが可能です。
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-turquoise-50 to-white border border-turquoise-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquoise-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-turquoise-700">駅徒歩1分の好立地</h3>
              <p className="text-gray-700 text-center">
                豊田市駅から徒歩たったの1分。通いやすさも大切なポイントです。
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-turquoise-50 to-white border border-turquoise-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquoise-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-turquoise-700">完全パーソナル対応</h3>
              <p className="text-gray-700 text-center">
                一人ひとりの目標や体の状態に合わせたカスタマイズプログラムをご提供します。
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">

          </div>
        </Container>
      </Section>
    </>
  );
};

export default ToyotaCityPilates; 