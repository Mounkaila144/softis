import React from 'react';
import { motion } from 'framer-motion';

import Container from '../components/Container';
import Section from '../components/Section';
import ProgramCard from '../components/ProgramCard';

const Services: React.FC = () => {
  return (
    <>
      {/* Page Header */}
      <div className="relative pt-32 pb-16 text-white">
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `url('/src/assets/IMG/IMG_1186-scaled.jpeg')`,
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
              スタジオについて
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90"
            >
              Softisでは、質の高いピラティス指導と最新のマシンで、あなたのカラダをサポートします
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Studio Section */}
      <Section>
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              Studioについて
            </h2>
            <p className="text-neutral-600 text-lg">
              Coming Soon…
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-neutral-700 mb-8">
              ピラティスリフォーマー、バレル、チェア、タワー、スパインコレクターなど多種に渡るマシンを取り揃えております。そのためお一人お一人に合わせたいろいろなエクササイズが可能となります。マシンの使い方はインストラクターから都度説明がありますのでご安心ください。
            </p>
          </div>
        </Container>
      </Section>

      {/* Equipment Section */}
      <Section className="bg-primary-50">
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              ピラティスマシン
            </h2>
            <p className="text-neutral-600 text-lg">
              Softisで使用する最新ピラティスマシンの紹介
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-56 bg-neutral-200 relative">
                {/* Remplacer par l'image réelle lorsqu'elle sera disponible */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-500">リフォーマー画像</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-2">ピラティスリフォーマー</h3>
                <p className="text-neutral-600">
                  リフォーマーは最も多目的なピラティスマシンです。スプリングの抵抗を利用して、筋力と柔軟性を同時に向上させることができます。
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-56 bg-neutral-200 relative">
                {/* Remplacer par l'image réelle lorsqu'elle sera disponible */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-500">バレル画像</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-2">バレル</h3>
                <p className="text-neutral-600">
                  バレルは背骨のアーチを伸ばし、脊柱の柔軟性を高める効果があります。姿勢改善に特に効果的なマシンです。
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-56 bg-neutral-200 relative">
                {/* Remplacer par l'image réelle lorsqu'elle sera disponible */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-500">チェア画像</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-2">チェア</h3>
                <p className="text-neutral-600">
                  チェアは主に下半身と体幹の筋力を鍛えるためのマシンです。バランスと安定性の向上に役立ちます。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Philosophy Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-6">
                Softisの理念
              </h2>
              <p className="text-lg text-neutral-700 mb-4">
                Softisでは、お一人お一人の身体の状態を丁寧に評価し、それぞれに最適なプログラムを提供することを大切にしています。
              </p>
              <p className="text-lg text-neutral-700 mb-4">
                健康な身体は日々の小さな積み重ねから生まれるものと考え、無理なく継続できるピラティスの習慣づくりをサポートします。
              </p>
              <p className="text-lg text-neutral-700">
                理学療法士の知識と経験を活かし、科学的根拠に基づいたアプローチで、お客様の健康と美しさを引き出します。
              </p>
            </div>
            <div className="bg-neutral-100 p-6 rounded-lg">
              <div className="h-80 bg-neutral-200 rounded-lg mb-6 flex items-center justify-center">
                {/* Remplacer par une image du studio lorsqu'elle sera disponible */}
                <span className="text-neutral-500">スタジオイメージ</span>
              </div>
              <p className="text-neutral-600 italic">
                "自分の身体を大切にできるのは自分だけ。自分の身体を自分が1番愛してあげよう"
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Programs Section */}
      <Section>
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              トレーニングプログラム
            </h2>
            <p className="text-neutral-600 text-lg">
              あなたの目標、スケジュール、フィットネスレベルに合わせた様々なプログラムをご用意しています。
              全てのプログラムは、経験豊富なインストラクターによるサポートが含まれています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Program 1 */}
            <ProgramCard
              title="パーソナルトレーニング"
              description="一人ひとりに合わせたカスタマイズプログラムで最大限の結果を実現します。"
              price="¥15,000 / セッション"
              features={[
                "完全マンツーマン指導",
                "詳細なフィットネス評価",
                "個別栄養アドバイス",
                "柔軟なスケジューリング",
                "進捗モニタリング"
              ]}
              imageUrl="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg"
              ctaText="詳細を見る"
              popular
            />

            {/* Program 2 */}
            <ProgramCard
              title="グループセッション"
              description="少人数制のグループトレーニングで、モチベーションを高く維持しながら効果的に鍛えます。"
              price="¥8,000 / セッション"
              features={[
                "最大4名までの少人数制",
                "様々なトレーニングスタイル",
                "チームの活力を活かした指導",
                "週替わりプログラム",
                "初心者から上級者まで対応"
              ]}
              imageUrl="https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg"
              ctaText="詳細を見る"
            />

            {/* Program 3 */}
            <ProgramCard
              title="ボディメイク集中コース"
              description="短期間で体を変える、結果にコミットするための高強度プログラム。"
              price="¥120,000 / 8週間"
              features={[
                "週3回のセッション",
                "完全栄養プラン",
                "定期的な体組成測定",
                "専属コーチによる24時間サポート",
                "結果保証"
              ]}
              imageUrl="https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg"
              ctaText="詳細を見る"
            />
          </div>
        </Container>
      </Section>

      {/* Specialized Services */}
      <Section className="bg-primary-50">
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              専門サービス
            </h2>
            <p className="text-neutral-600 text-lg">
              フィットネスだけでなく、総合的な健康とウェルネスをサポートする専門サービスもご用意しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Service 1 */}
            <div className="flex">
              <div className="flex-shrink-0 w-20 h-20 bg-turquoise-100 rounded-lg flex items-center justify-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-turquoise-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">栄養カウンセリング</h3>
                <p className="text-neutral-600 mb-4">
                  資格を持った栄養士があなたの目標、食の好み、ライフスタイルに合わせた食事プランを作成します。
                  体の変化を実現するために最も重要な食事のアドバイスを提供します。
                </p>
                <p className="text-primary-500 font-medium">¥12,000 / セッション</p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex">
              <div className="flex-shrink-0 w-20 h-20 bg-gold-100 rounded-lg flex items-center justify-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">リカバリー & リラクゼーション</h3>
                <p className="text-neutral-600 mb-4">
                  トレーニングの効果を最大化するための回復プログラム。ストレッチ、マッサージ、温熱療法などを
                  組み合わせて、筋肉の回復を促進し、パフォーマンスを向上させます。
                </p>
                <p className="text-primary-500 font-medium">¥10,000 / セッション</p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex">
              <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">フィットネスアセスメント</h3>
                <p className="text-neutral-600 mb-4">
                  詳細な体組成分析、筋力テスト、柔軟性評価、有酸素能力測定などを通じて、
                  あなたの現在のフィットネスレベルを正確に把握し、効果的なトレーニングプランを設計します。
                </p>
                <p className="text-primary-500 font-medium">¥18,000 / 初回評価</p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex">
              <div className="flex-shrink-0 w-20 h-20 bg-turquoise-100 rounded-lg flex items-center justify-center mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-turquoise-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">マインドフルネス & メディテーション</h3>
                <p className="text-neutral-600 mb-4">
                  心と体のバランスを整えるマインドフルネスプログラム。ストレス軽減、
                  睡眠の質向上、集中力強化を通じて、総合的な健康をサポートします。
                </p>
                <p className="text-primary-500 font-medium">¥8,000 / セッション</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Membership Section */}
      <Section>
        <Container>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-700 mb-4">
              メンバーシッププラン
            </h2>
            <p className="text-neutral-600 text-lg">
              定期的にトレーニングをご希望の方には、お得なメンバーシッププランをご用意しています。
              あなたのライフスタイルに合わせて柔軟に選べるプランです。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Membership 1 */}
            <div className="border border-neutral-200 rounded-lg overflow-hidden">
              <div className="bg-primary-100 p-6 text-center">
                <h3 className="text-xl font-bold text-primary-700">ベーシック</h3>
                <p className="text-4xl font-bold text-primary-500 mt-4">¥45,000<span className="text-sm font-normal text-neutral-600">/月</span></p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>月4回のパーソナルセッション</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>基本的な栄養アドバイス</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>毎月の体組成測定</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>アプリによる進捗管理</span>
                  </li>
                  <li className="flex">
                    <span className="text-neutral-400 mr-2">×</span>
                    <span className="text-neutral-400">専用ロッカー</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
                  選択する
                </button>
              </div>
            </div>

            {/* Membership 2 */}
            <div className="border-2 border-gold-500 rounded-lg overflow-hidden shadow-lg relative">
              <div className="absolute top-0 right-0 bg-gold-500 text-primary-900 text-xs font-bold px-3 py-1 rounded-bl">
                おすすめ
              </div>
              <div className="bg-primary-600 p-6 text-center text-white">
                <h3 className="text-xl font-bold">プレミアム</h3>
                <p className="text-4xl font-bold text-gold-400 mt-4">¥75,000<span className="text-sm font-normal text-white/70">/月</span></p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>月8回のパーソナルセッション</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>詳細な栄養プラン</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>毎週の体組成測定</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>アプリによる進捗管理</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>専用ロッカー</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 bg-gold-500 text-primary-900 rounded hover:bg-gold-400 transition-colors">
                  選択する
                </button>
              </div>
            </div>

            {/* Membership 3 */}
            <div className="border border-neutral-200 rounded-lg overflow-hidden">
              <div className="bg-primary-100 p-6 text-center">
                <h3 className="text-xl font-bold text-primary-700">エグゼクティブ</h3>
                <p className="text-4xl font-bold text-primary-500 mt-4">¥120,000<span className="text-sm font-normal text-neutral-600">/月</span></p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>無制限のパーソナルセッション</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>カスタム栄養プラン & 食事指導</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>全ての専門サービス利用可能</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>24時間サポート</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span>専用ロッカー & タオルサービス</span>
                  </li>
                </ul>
                <button className="w-full py-2 px-4 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors">
                  選択する
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Services;