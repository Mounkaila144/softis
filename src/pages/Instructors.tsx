import React from 'react';
import { motion } from 'framer-motion';

import Container from '../components/Container';
import Section from '../components/Section';
import InstructorCard from '../components/InstructorCard';

const Instructors: React.FC = () => {
  return (
    <>
      {/* Page Header */}
      <div className="relative pt-32 pb-16 text-white">
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `url('/src/assets/IMG/IMG_2593.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-primary-900 bg-opacity-70 z-0" />
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
              Zen Fitness Tokyoのチームは、国際的に認定された経験豊富なプロフェッショナルで構成されています。
              あなたの目標達成をサポートする最高のトレーナーたちをご紹介します。
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Instructors Section */}
      <Section>
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              エキスパートチーム
            </h2>
            <p className="text-neutral-600 text-lg">
              各トレーナーは、それぞれの専門分野で豊富な経験と実績を持ち、
              お客様一人ひとりに合わせたアプローチでトレーニングをサポートします。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Instructor 1 */}
            <InstructorCard
              name="山本 さくら"
              title="ヘッドトレーナー・創設者"
              bio="15年以上の経験を持つフィットネス業界のエキスパート。アスリートからビジネスパーソンまで、様々なクライアントの体を変えてきた実績があります。"
              specialties={["筋力トレーニング", "アスリートコンディショニング", "姿勢改善"]}
              imageUrl="https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg"
            />

            {/* Instructor 2 */}
            <InstructorCard
              name="鈴木 美香"
              title="栄養スペシャリスト"
              bio="管理栄養士の資格を持ち、フィットネスと栄養学の両面からボディメイクをサポート。食事と運動の最適なバランスを提案します。"
              specialties={["栄養カウンセリング", "食事計画", "体重管理"]}
              imageUrl="https://images.pexels.com/photos/3768722/pexels-photo-3768722.jpeg"
            />

            {/* Instructor 3 */}
            <InstructorCard
              name="佐藤 美咲"
              title="パーソナルトレーナー"
              bio="元プロアスリートとしての経験を活かし、効率的なトレーニング方法を提供。特に短期間での体の変化を得意としています。"
              specialties={["高強度インターバルトレーニング", "ウェイトトレーニング", "スポーツパフォーマンス"]}
              imageUrl="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg"
            />

            {/* Instructor 4 */}
            <InstructorCard
              name="田中 絵里"
              title="ヨガ・マインドフルネスコーチ"
              bio="10年以上のヨガ指導経験を持ち、心と体のバランスを整えるプログラムを提供。ストレス管理と精神的な健康をサポートします。"
              specialties={["ヨガ", "瞑想", "呼吸法", "ストレス管理"]}
              imageUrl="https://images.pexels.com/photos/3822166/pexels-photo-3822166.jpeg"
            />

            {/* Instructor 5 */}
            <InstructorCard
              name="中村 優子"
              title="リハビリテーションスペシャリスト"
              bio="理学療法士の資格を持ち、怪我からの回復や慢性的な痛みの改善を専門としています。安全で効果的なトレーニング方法を提案します。"
              specialties={["リハビリトレーニング", "痛み管理", "機能改善"]}
              imageUrl="https://images.pexels.com/photos/3757951/pexels-photo-3757951.jpeg"
            />

            {/* Instructor 6 */}
            <InstructorCard
              name="高橋 真理子"
              title="グループフィットネスインストラクター"
              bio="エネルギッシュでモチベーション高いグループセッションを担当。楽しみながら効果的に鍛えるクラスが人気です。"
              specialties={["グループフィットネス", "ダンスエクササイズ", "サーキットトレーニング"]}
              imageUrl="https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg"
            />
          </div>
        </Container>
      </Section>

      {/* Certifications Section */}
      <Section className="bg-primary-50">
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              資格と専門知識
            </h2>
            <p className="text-neutral-600 text-lg">
              Zen Fitness Tokyoのトレーナーたちは、国際的に認められた様々な資格を保有しています。
              あなたの体と健康を安全かつ効果的にサポートするための専門知識を備えています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Certification 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-2">国際資格保有</h3>
              <p className="text-neutral-600">
                NSCA、ACE、ACSMなどの国際的に認められた資格を保有。世界基準の知識とスキルに基づいたトレーニングを提供します。
              </p>
            </div>

            {/* Certification 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquoise-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-2">継続的な教育</h3>
              <p className="text-neutral-600">
                全てのスタッフは定期的に最新のトレーニング方法、栄養学、リハビリテーションに関する研修を受けています。常に最新の知識を更新しています。
              </p>
            </div>

            {/* Certification 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-700 mb-2">専門分野での豊富な経験</h3>
              <p className="text-neutral-600">
                各トレーナーは、スポーツパフォーマンス、リハビリテーション、栄養学、マインドフルネスなど、それぞれの専門分野で実績を積んでいます。
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Philosophy Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-6">
                私たちのトレーニング哲学
              </h2>
              <p className="text-neutral-600 text-lg mb-6">
                Zen Fitness Tokyoでは、「持続可能な変化」を信念としています。
                短期的な結果だけでなく、長期的に健康的なライフスタイルを維持できるよう、
                お客様一人ひとりに合わせたアプローチを大切にしています。
              </p>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="text-turquoise-500 mr-3 flex-shrink-0">●</span>
                  <span className="text-neutral-700">一人ひとりの個性と目標を尊重する個別アプローチ</span>
                </li>
                <li className="flex">
                  <span className="text-turquoise-500 mr-3 flex-shrink-0">●</span>
                  <span className="text-neutral-700">科学的根拠に基づいた効果的なトレーニング方法</span>
                </li>
                <li className="flex">
                  <span className="text-turquoise-500 mr-3 flex-shrink-0">●</span>
                  <span className="text-neutral-700">心と体のバランスを重視した総合的なアプローチ</span>
                </li>
                <li className="flex">
                  <span className="text-turquoise-500 mr-3 flex-shrink-0">●</span>
                  <span className="text-neutral-700">日常生活に取り入れやすい持続可能な習慣づくり</span>
                </li>
                <li className="flex">
                  <span className="text-turquoise-500 mr-3 flex-shrink-0">●</span>
                  <span className="text-neutral-700">常に進化し、最新の知識とテクニックを取り入れる姿勢</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/6551088/pexels-photo-6551088.jpeg" 
                alt="Training Philosophy" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Instructors;