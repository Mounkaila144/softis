import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Hero from '../components/Hero';
import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import TestimonialCard from '../components/TestimonialCard';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const heroImages = [
    "/src/assets/IMG/IMG_2593.jpeg",
    "https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg",
    "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg",
    //"https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg",
    //"https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg",
    
    "/src/assets/IMG/IMG_2602.jpeg",
  ];

  return (
    <>
      <Hero
        title="自分を超える、毎日を変える"
        subtitle="東京で最も洗練されたフィットネス体験"
        ctaText="今すぐ無料体験レッスンを予約する"
        images={heroImages}
        onCtaClick={() => navigate('/booking')}
      />

      {/* About Section */}
      <Section id="about">
        <Container>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              Zen Fitness Tokyo について
            </h2>
            <p className="text-neutral-600 text-lg">
              2025年に設立された私たちのプレミアムフィットネススタジオは、
              トレーニングと精神的な調和を融合させた新しいアプローチで、
              東京のフィットネスシーンに革命を起こしています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-500 text-3xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">専門家によるコーチング</h3>
              <p className="text-neutral-600">
                国際的に認定された経験豊富なインストラクターが、あなたの目標達成をサポートします。
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-turquoise-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-turquoise-500 text-3xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">最新の設備</h3>
              <p className="text-neutral-600">
                最先端のトレーニング機器を取り揃えた、広々としたスタイリッシュな空間で理想のボディを実現。
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gold-500 text-3xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-3">パーソナライズされたプログラム</h3>
              <p className="text-neutral-600">
                あなたの目標、体型、ライフスタイルに合わせて最適化されたトレーニングと栄養プランを提案。
              </p>
            </motion.div>
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/services')}
              className="inline-flex items-center"
            >
              サービスの詳細を見る
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* Transformation Section */}
      <Section className="bg-primary-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              実際の変化を見る
            </h2>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Zen Fitness Tokyoのメンバーたちは、私たちのプログラムを通じて素晴らしい成果を達成しています。
              あなたも彼らと同じように、理想のボディと健康な生活を手に入れることができます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <TestimonialCard
              quote="3ヶ月間のパーソナルトレーニングで体脂肪率が20%から12%に減少しました。今まで試したどのジムよりも効果的でした。"
              name="山田 美咲"
              title="会社員・28歳"
              imageBefore="https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg"
              imageAfter="https://images.pexels.com/photos/4498577/pexels-photo-4498577.jpeg"
            />

            {/* Testimonial 2 */}
            <TestimonialCard
              quote="産後の体型回復に悩んでいましたが、Zen Fitness Tokyoのプログラムのおかげで出産前よりも健康的な体を手に入れることができました。"
              name="佐藤 美咲"
              title="デザイナー・34歳"
              imageBefore="https://images.pexels.com/photos/6454069/pexels-photo-6454069.jpeg"
              imageAfter="https://images.pexels.com/photos/6454071/pexels-photo-6454071.jpeg"
            />

            {/* Testimonial 3 */}
            <TestimonialCard
              quote="毎日のデスクワークによる肩こりと腰痛が改善され、健康的な生活習慣が身につきました。心も体も変わりました。"
              name="鈴木 さくら"
              title="ITエンジニア・31歳"
              imageBefore="https://images.pexels.com/photos/6740056/pexels-photo-6740056.jpeg"
              imageAfter="https://images.pexels.com/photos/6740113/pexels-photo-6740113.jpeg"
            />
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary-700 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              あなたの変化は今日始まります
            </h2>
            <p className="text-xl text-white/90 mb-8">
              最高の自分になるための第一歩を踏み出しましょう。
              今すぐ無料体験セッションを予約して、Zen Fitness Tokyoの違いを体感してください。
            </p>
            <Button 
              variant="gold" 
              size="lg"
              onClick={() => navigate('/booking')}
            >
              無料体験を予約する
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;