import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Seo from '../components/Seo';

import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the contact form data to a server
    alert('お問い合わせを受け付けました。近日中にご連絡いたします。');
  };

  // Schema.orgのデータ構造を作成
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Softis ピラティススタジオ',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '愛知県豊田市若宮町1-26 セントラルビル2階',
      'addressLocality': '豊田市',
      'addressRegion': '愛知県',
      'postalCode': '',
      'addressCountry': 'JP'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '',
      'longitude': ''
    },
    'url': 'https://softis.jp/contact',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': '予約・お問い合わせ',
      'availableLanguage': ['Japanese']
    }
  };

  return (
      <>
        <Seo 
          title="アクセス・お問い合わせ | 豊田市駅徒歩1分のピラティススタジオ"
          description="豊田市駅徒歩1分のSoftisピラティススタジオへのアクセス方法・お問い合わせ。愛知県豊田市若宮町1-26 セントラルビル2階。無料駐車場完備、名鉄豊田線豊田市駅から徒歩1分の好立地です。"
          keywords="アクセス, 豊田市駅, 徒歩1分, ピラティススタジオ, お問い合わせ, 愛知県豊田市, 無料駐車場, 名鉄豊田線"
          structuredData={contactSchema}
        />
        {/* Page Header */}
        <div className="relative pt-32 pb-16 text-white">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <OptimizedImage
                src="/src/assets/IMG/IMG_2364.jpeg"
                alt="Contact background"
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
                アクセス
              </motion.h1>
              <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-white/90"
              >
                名鉄豊田線 豊田市駅から徒歩1分
              </motion.p>
            </div>
          </Container>
        </div>

        {/* Location Section */}
        <Section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-turquoise-700 mb-6">
                  アクセス情報
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mb-8"></div>

                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 w-14 h-14 bg-turquoise-100 rounded-lg flex items-center justify-center mr-6 shadow-sm">
                      <MapPin className="text-turquoise-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-turquoise-700 mb-2">住所</h3>
                      <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                        愛知県豊田市若宮町1-26<br />
                        セントラルビル2階<br />
                        一階がminiminiさんの黄色いビルです
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-14 h-14 bg-turquoise-100 rounded-lg flex items-center justify-center mr-6 shadow-sm">
                      <Clock className="text-turquoise-500" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-turquoise-700 mb-2">アクセス詳細</h3>
                      <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm mb-2">
                        セントラルビルを目印にお越しください<br />
                        ビルの左の階段から2階にお上がりください
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-bold text-turquoise-700 mb-4">交通アクセス</h3>
                  <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-turquoise-500 mr-2 font-bold">•</span>
                        <div>
                          <p className="font-medium text-turquoise-600">名鉄豊田線</p>
                          <p className="text-gray-700">豊田市駅より徒歩1分</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-turquoise-500 mr-2 font-bold">•</span>
                        <div>
                          <p className="font-medium text-turquoise-600">愛知環状鉄道</p>
                          <p className="text-gray-700">新豊田駅より徒歩4分</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="h-96 bg-neutral-200 rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                  {/* Google Maps embed */}
                  <iframe
                      loading="lazy"
                      src="https://maps.google.com/maps?q=%E6%84%9B%E7%9F%A5%E7%9C%8C%E8%B1%8A%E7%94%B0%E5%B8%82%E8%8B%A5%E5%AE%AE%E7%94%BA1-26%20%E3%82%BB%E3%83%B3%E3%83%88%E3%83%A9%E3%83%AB%E3%83%93%E3%83%AB2%E9%9A%8E&#038;t=m&#038;z=20&#038;output=embed&#038;iwloc=near"
                      title="愛知県豊田市若宮町1-26 セントラルビル2階"
                      aria-label="愛知県豊田市若宮町1-26 セントラルビル2階"
                      className="w-full h-full border-0"
                      allowFullScreen
                  ></iframe>
                </div>
                
                {/* Image du studio */}
                <div className="rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                  <OptimizedImage
                    src="/src/assets/studio/Softis.png"
                    alt="Studio Softis"
                    className="w-full h-auto"
                    quality={85}
                    format="webp"
                  />
                </div>

                <div className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-turquoise-700 mb-4">駐車場情報</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mb-6"></div>
                  <p className="text-gray-800 bg-white/80 p-3 rounded-lg shadow-sm">
                    駐車場は1番左の4Fと書かれている場所以外にお止めください
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Contact Form Section */}
        <Section className="bg-turquoise-100">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-turquoise-700 mb-4">
                  お問い合わせ
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-turquoise-300 to-pink-200 rounded-full mx-auto mb-6"></div>
                <p className="text-gray-800 text-lg bg-white/80 p-3 rounded-lg shadow-sm max-w-2xl mx-auto">
                  ご質問、ご意見、お問い合わせなどがございましたら、下記のフォームよりお気軽にご連絡ください。
                  24時間以内に担当者より返信いたします。
                </p>
              </div>

              <div className="bg-gradient-to-br from-turquoise-50 via-pink-50 to-white/90 border border-turquoise-100 rounded-xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-neutral-700 text-sm font-medium mb-1">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 shadow-sm"
                          required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-neutral-700 text-sm font-medium mb-1">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 shadow-sm"
                          required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-neutral-700 text-sm font-medium mb-1">
                      電話番号
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-neutral-700 text-sm font-medium mb-1">
                      件名 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 shadow-sm"
                        required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-neutral-700 text-sm font-medium mb-1">
                      メッセージ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        rows={6}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 shadow-sm"
                        required
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="privacy"
                        className="mr-2"
                        required
                    />
                    <label htmlFor="privacy" className="text-sm text-neutral-700">
                      <span className="text-red-500">*</span> プライバシーポリシーに同意します
                    </label>
                  </div>

                  <div className="text-center">
                    <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="shadow-md hover:shadow-lg transform transition hover:-translate-y-1"
                    >
                      送信する <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      </>
  );
};

export default Contact;