import React from 'react';
import { useNavigate } from 'react-router-dom';

import Hero from '../components/Hero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const heroImages = [
    "/src/assets/IMG/img.png",
    "/src/assets/IMG/IMG_2593.jpeg",
    "/src/assets/IMG/IMG_1601.jpeg",
    "/src/assets/IMG/IMG_2616.jpeg",
  ];
  
  const heroTitles = [
    "忙しい毎日に癒しを。自分を変える場所。",
    "自分の身体を一番大切にしよう。",
    "理学療法士資格を持つインストラクターによる本格ピラティス"
  ];
  
  const heroSubtitles = [
    "2025年7月12日、豊田市に新規オープン。",
    "完全パーソナルレッスンをご提供。",
    "初心者歓迎。優しく身体を整えるスタジオ。"
  ];

  return (
    <>
   <Hero
  titles={heroTitles}
  subtitles={heroSubtitles}
  ctaText="無料体験を予約する"
  promoText="【オープニング特典】入会金0円＋体験料金3000円！（通常5500円＋5000円）ご予約はこちら"
  images={heroImages}
  onCtaClick={() => navigate('/booking')}
/>

      {/* ピラティスに通うとどうなるの？ */}
      <Section className="bg-turquoise-200">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              ピラティスに通うとどうなるの？
            </h2>
            <p className="text-white text-lg max-w-3xl mx-auto">
              身体ガチガチさん運動初心者さんのための身体を労るスタジオ
            </p>
          </div>

          {/* プロフィール情報 */}
          <div className="mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xl font-medium mb-6">
                自分の身体を大切にできるのは自分だけ 自分の身体を自分が1番愛してあげよう
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Softis代表</h3>
                <p className="text-lg mb-1">秋間まゆ</p>
                <p className="text-white mb-1">理学療法士免許保有</p>
                <p className="text-white">BESJピラティス認定インストラクター</p>
              </div>
            </div>
          </div>
          
          {/* イメージカード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-turquoise-200 rounded-xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/5] overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/home2/1.png" 
                  alt="ピラティス情報" 
                  className="w-full h-full object-cover object-center"
                  quality={55}
                  loading="lazy"
                  format="webp"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={600}
                  height={750}
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">ピラティス情報</h3>
                <p className="text-neutral-700">
                  ピラティスレッスンの変化のご紹介。姿勢がよくなったり、身体の調子を整えることができます。
                </p>
                <div className="mt-4">
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/booking')}
                  >
                    無料体験レッスンを予約する
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-turquoise-200 rounded-xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/5] overflow-hidden">
                <OptimizedImage 
                  src="/src/assets/home2/2.png" 
                  alt="ピラティス施術の様子" 
                  className="w-full h-full object-cover object-center"
                  quality={55}
                  loading="lazy"
                  format="webp"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={600}
                  height={750}
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">実際のレッスン風景</h3>
                <p className="text-neutral-700">
                  下がり気味だった目線がまっすぐになり、姿勢がよくなったり、足首がまがりやすくなったりします。個人差はありますが身体の調子を整えることができます。
                </p>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/about')}
                  >
                    詳細を見る
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ご利用の流れ */}
      <Section id="flow">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              ご利用の流れ
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-turquoise-2000 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">LINE登録</h3>
                  <p className="text-white">公式LINEアカウントに登録します</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-turquoise-2000 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">予約サイトから体験予約</h3>
                  <p className="text-white">（6/1予約受付開始予定）</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-turquoise-2000 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">来店し体験レッスンを受ける</h3>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                variant="gold" 
                size="lg"
                onClick={() => navigate('/booking')}
              >
                無料体験レッスンを予約する
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;