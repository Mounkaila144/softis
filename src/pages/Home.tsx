import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';

import Hero from '../components/Hero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const heroImages = [
    "/src/assets/IMG/img.png",
    "/src/assets/IMG/IMG_1601.jpeg",
  ];
  
  const heroTitles = [
    "豊田市パーソナルピラティススタジオ\n",
  ];
  
  const heroSubtitles = [
    "完全パーソナルレッスンをご提供。",
  ];

  // Schema.orgのデータ構造を作成
  const studioSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Softis ピラティススタジオ',
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
      '@type': 'GeoCoordinates'
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
    'servesCuisine': 'ピラティス, フィットネス, リハビリテーション'
  };

  return (
    <>
      <Seo 
        title="豊田市のパーソナルピラティススタジオ | 理学療法士が指導 | Softis"
        description="豊田市駅徒歩1分の好立地！理学療法士資格を持つインストラクターによる完全パーソナルピラティスレッスンで、姿勢改善・ボディメイク・健康促進をサポートします。初心者も安心の丁寧な指導と多数のピラティスマシンで効果的なトレーニングを。"
        keywords="豊田市, ピラティス, パーソナルトレーニング, 理学療法士, 姿勢改善, ボディメイク, 健康促進, ピラティスマシン, リフォーマー, 駅近, 豊田市駅"
        structuredData={studioSchema}
      />
      <Hero
        titles={heroTitles}
        subtitles={heroSubtitles}
        ctaText="！オープニングキャンペーン！
入会金 5500→0円
初回体験　5000→3000円"
        images={heroImages}
        onCtaClick={() => window.open('https://lin.ee/Rvbat7l', '_blank')}
      />

      {/* ピラティスに通うとどうなるの？ */}
      <Section className="bg-turquoise-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
              Softisとは？
            </h2>
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-turquoise-600 mb-4">理学療法士が導くパーソナルピラティス</h3>
              <div className="flex items-center justify-center mb-4">
                <span className="inline-block w-12 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full"></span>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                豊田市駅徒歩1分の好立地にオープンするスタジオです。理学療法士資格を所有したピラティスインストラクターによるパーソナルレッスンが受けられます。
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-turquoise-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">専門的な指導</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-turquoise-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">駅から徒歩1分</span>
                </div>
              </div>
            </div>
          </div>

          {/* プロフィール情報 */}
          <div className="mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-8 bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-turquoise-600 mb-4">当スタジオの特徴</h3>
                <div className="flex items-center justify-center mb-6">
                  <span className="inline-block w-12 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full"></span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start p-3 bg-white/80 rounded-lg shadow-sm">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-turquoise-100 text-turquoise-600 rounded-full mr-3 font-bold">1</span>
                    <p className="text-gray-800 text-left">理学療法士資格所有インストラクターによる専門的なレッスン</p>
                  </div>
                  
                  <div className="flex items-start p-3 bg-white/80 rounded-lg shadow-sm">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-turquoise-100 text-turquoise-600 rounded-full mr-3 font-bold">2</span>
                    <p className="text-gray-800 text-left">パーソナルレッスンで初心者や運動が苦手な方でも安心</p>
                  </div>
                  
                  <div className="flex items-start p-3 bg-white/80 rounded-lg shadow-sm">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-turquoise-100 text-turquoise-600 rounded-full mr-3 font-bold">3</span>
                    <p className="text-gray-800 text-left">ピラティスマシン多数設置</p>
                  </div>
                  
                  <div className="flex items-start p-3 bg-white/80 rounded-lg shadow-sm">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-turquoise-100 text-turquoise-600 rounded-full mr-3 font-bold">4</span>
                    <p className="text-gray-800 text-left">続けやすさは通いやすさ！抜群の駅近の好立地かつ無料駐車場完備</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* イメージカード */}
          <h2 className="text-3xl md:text-4xl text-center font-serif font-bold text-black mb-4">
            ピラティスをするとどうなるの？
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
                  Softisはこんな人におすすめ
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">1</span>
                    <p className="text-white/90">
                      身体が硬くてなんとなく調子が悪い
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">2</span>
                    <p className="text-white/90">
                      肩首こりや腰、膝痛がある
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">3</span>
                    <p className="text-white/90">
                      自分の姿勢が気に入らない
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">4</span>
                    <p className="text-white/90">
                      グループピラティスレッスンでは満足できない、他の人の目が気になる
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">5</span>
                    <p className="text-white/90">
                      自分の身体の特徴が知りたい
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  ピラティスの効果（個人差はあります）
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">1</span>
                    <p className="text-white/90">
                      身体が適度に柔らかくなってスッキリ
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">2</span>
                    <p className="text-white/90">
                      痛みや疲れなど不調が和らぐ
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">3</span>
                    <p className="text-white/90">
                      姿勢が良くなりオーラが変わる
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">4</span>
                    <p className="text-white/90">
                      自律神経が整い思考が前向きになる
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="h-6 w-6 bg-turquoise-200 rounded-full flex items-center justify-center text-turquoise-700 font-bold mr-3 flex-shrink-0 mt-0.5">5</span>
                    <p className="text-white/90">
                      自分の身体の特徴を知れるため日常生活で意識すべきことがわかる
                    </p>
                  </li>
                </ul>
              </div>
              
              <p className="text-white text-lg font-bold mt-4">
                Coming Soon…
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ご利用方法 */}
      <Section id="flow">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
              ご利用方法
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
                  <h3 className="text-xl font-bold mb-2 text-turquoise-600">LINE登録</h3>
                  <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                    店舗公式LINEをご登録し初回体験申し込み
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 mr-6 shadow-md">
                  <span className="text-white text-xl font-bold">②</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-turquoise-600">初回体験レッスン</h3>
                  <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                    来店し初回体験レッスンを受ける
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-800 mb-6 bg-white/80 p-3 rounded-lg shadow-sm">
                初回体験レッスンを受ける
              </p>
              <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.open('https://lin.ee/Rvbat7l', '_blank')}
                  className="shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
              >
                LINEで予約する
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
              充実したマシン設備
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-800 text-lg bg-white/80 p-3 rounded-lg shadow-sm max-w-2xl mx-auto">
              Softisでは最新のピラティスマシンを取り揃え、あなたの体に合わせたエクササイズをご提供します
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
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">リフォーマー</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  ピラティスの代表的なマシン。スプリングの抵抗を利用して、全身の筋肉をバランスよく鍛えることができます。
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
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">バレル</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  背骨の柔軟性を高め、姿勢改善に特に効果的なマシン。自然な脊柱のカーブをサポートします。
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
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">チェア</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  体幹の安定性と上半身・下半身の筋力強化に効果的。バランス能力も向上させます。
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
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">専用マシン 1</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  ピラティスの動きを特化させた専用マシン。身体の様々な部位に効率よくアプローチします。
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
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">タワ</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                固定された台の上で動くバネを自由に扱いながら動きます

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
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">スパインコレクタ</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                背骨の動きや形を修正するマシンです
                身体がちがちさんはこちらの湾曲を使いながら背骨を動かしていくと動きやすくなる場合があります
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
                <h3 className="text-xl font-bold text-turquoise-700 mb-2">専用マシン 4</h3>
                <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                  あらゆる体型、レベルに対応できる調整可能な設計。あなたに合わせたトレーニングが可能です。
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
              もっと見る
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;