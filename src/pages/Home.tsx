import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Hero from '../components/Hero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const heroImages = [
    "/src/assets/IMG/IMG_2593.jpeg",
    "https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg",
    "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg",
    "/src/assets/IMG/IMG_2602.jpeg",
  ];

  return (
    <>
      <Hero
        title="普段仕事や育児に頑張りすぎてなんとなく調子が悪いあなたが変われる場所"
        subtitle="2025年7月12日に愛知県豊田市に新規オープンするピラティススタジオです。"
        ctaText="無料体験レッスンを予約する"
        images={heroImages}
        onCtaClick={() => navigate('/booking')}
      />

      {/* プレゼンテーション Section */}
      <Section id="presentation">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              プレゼンテーション
            </h2>
            <p className="text-neutral-600 text-lg">
              普段仕事や育児に頑張りすぎてなんとなく調子が悪いあなたが変われる場所
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-lg">
            <p className="mb-4">
              2025年7月12日に愛知県豊田市に新規オープンするピラティススタジオです。
            </p>
            <p className="mb-4">
              理学療法士資格を所有したピラティスインストラクターが、身体を変えることにフォーカスしてレッスンします。
            </p>
            <p className="mb-8">
              あなただけのパーソナルレッスンを受けられます。
            </p>
          </div>
        </Container>
      </Section>

      {/* ピラティスに通うとどうなるの？ */}
      <Section className="bg-primary-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              ピラティスに通うとどうなるの？
            </h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              身体ガチガチさん運動初心者さんのための身体を労るスタジオ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <p className="text-xl font-medium mb-8 text-center md:text-left">
                自分の身体を大切にできるのは自分だけ 自分の身体を自分が1番愛してあげよう
              </p>
              
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Softis代表</h3>
                <p className="text-lg mb-1">秋間まゆ</p>
                <p className="text-neutral-600 mb-1">理学療法士免許保有</p>
                <p className="text-neutral-600">BESJピラティス認定インストラクター</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-neutral-700 mb-4">
                ↑ピラティスレッスンの変化のご紹介。下がり気味だった目線がまっすぐになり、姿勢がよくなったり、足首がまがりやすくなったりします。個人差はありますが身体の調子を整えることができます。
              </p>
              <div className="mt-4 text-center">
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/booking')}
                >
                  無料体験レッスンを予約する
                </Button>
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
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">LINE登録</h3>
                  <p className="text-neutral-600">公式LINEアカウントに登録します</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                  <span className="text-white text-xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">予約サイトから体験予約</h3>
                  <p className="text-neutral-600">（6/1予約受付開始予定）</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mr-6">
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