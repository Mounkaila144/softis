import React from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Container';
import Section from '../components/Section';
import OptimizedImage from '../components/OptimizedImage';

const Instructors: React.FC = () => {
  return (
      <>
        {/* ページヘッダー */}
        <div className="relative pt-32 pb-16 text-white">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <OptimizedImage
                src="/src/assets/IMG/IMG_2593.jpeg"
                alt="インストラクター背景"
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
                インストラクター
              </motion.h1>
              <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-white/90"
              >
                Softisのインストラクターは、専門的な知識と豊富な経験であなたの健康をサポートします。
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
                      alt="秋間まゆ"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="eager"
                      quality={90}
                      format="webp"
                      sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-turquoise-700 mb-2">秋間 まゆ</h3>
                  <p className="text-turquoise-600 mb-4 text-lg">オーナー・ピラティスインストラクター</p>

                  <div className="space-y-4">
                    <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-turquoise-700 mb-2 text-lg">ご挨拶</h4>
                      <p className="text-gray-800 leading-relaxed">
                        初めまして、Softisオーナーの秋間まゆです。<br/>
                        元理学療法士として病院勤務経験があり、健康な身体づくりの重要性を実感しました。ピラティスを通じて、日常の身体のケアと自分自身の身体を愛する大切さをお伝えします。
                      </p>
                    </div>

                    <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-turquoise-700 mb-2 text-lg">資格</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>理学療法士（日本病院認定機構病院勤務経験）</li>
                        <li>BESJピラティス認定インストラクター</li>
                        <li>PACピラティス認定インストラクター</li>
                        <li>ピラティス機能解剖®️資格</li>
                        <li>フードマイスター資格</li>
                      </ul>
                    </div>

                    <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-turquoise-700 mb-2 text-lg">メッセージ</h4>
                      <p className="text-gray-800 leading-relaxed">
                        ピラティスは単なるエクササイズではなく、自分自身と向き合う時間です。<br/>
                        身体が硬い方、痛みがある方、姿勢が気になる方も大丈夫。一人ひとりの身体に合わせたプログラムで、無理なく変化を実感していただけます。あなたの「できた！」を一緒に喜びましょう！
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                  <span className="bg-turquoise-100 text-turquoise-700 text-sm px-3 py-1 rounded-full">
                    ピラティス
                  </span>
                    <span className="bg-turquoise-100 text-turquoise-700 text-sm px-3 py-1 rounded-full">
                    姿勢改善
                  </span>
                    <span className="bg-turquoise-100 text-turquoise-700 text-sm px-3 py-1 rounded-full">
                    痛み予防
                  </span>
                    <span className="bg-turquoise-100 text-turquoise-700 text-sm px-3 py-1 rounded-full">
                    身体の機能改善
                  </span>
                  </div>
                </div>
              </div>

              {/* 指導理念 */}
              <div className="sticky top-8 bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-serif font-bold text-turquoise-700 mb-6">
                  指導理念
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mb-6"></div>

                <div className="space-y-6">
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-turquoise-700 mb-3">3つの約束</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-turquoise-500 text-2xl mr-2">●</span>
                        <span className="flex-1 text-gray-800">
                        安全第一の個別指導
                        <p className="text-sm text-gray-600 mt-1">理学療法士の知識を活かした安全なプログラム</p>
                      </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-turquoise-500 text-2xl mr-2">●</span>
                        <span className="flex-1 text-gray-800">
                        身体と心のバランス
                        <p className="text-sm text-gray-600 mt-1">マインドフルネスを重視した総合アプローチ</p>
                      </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-turquoise-500 text-2xl mr-2">●</span>
                        <span className="flex-1 text-gray-800">
                        継続可能な習慣形成
                        <p className="text-sm text-gray-600 mt-1">日常生活に取り入れやすいエクササイズ</p>
                      </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-turquoise-700 mb-3">対応可能なケース</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">慢性的な肩こり・腰痛</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">産前産後の身体ケア</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">猫背・反り腰改善</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">スポーツパフォーマンス向上</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">ストレス緩和</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-turquoise-500 mr-2">✓</span>
                        <span className="text-gray-800">身体の可動域改善</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <blockquote className="text-center italic text-gray-700">
                      「身体の声に耳を傾けることから、本当の健康は始まります。<br/>
                      あなたの『理想の身体』へ一緒に歩んでいきましょう」
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