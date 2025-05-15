import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the contact form data to a server
    alert('お問い合わせを受け付けました。近日中にご連絡いたします。');
  };

  return (
    <>
      {/* Page Header */}
      <div className="relative pt-32 pb-16 text-white">
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: `url('/src/assets/IMG/IMG_2364.jpeg')`,
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
              アクセス
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90"
            >
              【豊田市駅徒歩１分 ビルの前に無料駐車場６台完備】
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Location Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-700 mb-6">
                アクセス情報
              </h2>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mr-6">
                    <MapPin className="text-primary-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-700 mb-2">住所</h3>
                    <p className="text-neutral-600">
                      愛知県豊田市若宮町1-26<br />
                      セントラルビル2階<br />
                      セントラルビルを目印にお越しください
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-14 h-14 bg-turquoise-100 rounded-lg flex items-center justify-center mr-6">
                    <Phone className="text-turquoise-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-700 mb-2">電話番号</h3>
                    <p className="text-neutral-600">
                      03-1234-5678
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-14 h-14 bg-gold-100 rounded-lg flex items-center justify-center mr-6">
                    <Mail className="text-gold-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-700 mb-2">メールアドレス</h3>
                    <p className="text-neutral-600">
                      info@zenfitnesstokyo.jp
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mr-6">
                    <Clock className="text-primary-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-700 mb-2">アクセス詳細</h3>
                    <p className="text-neutral-600 mb-2">
                      T-face前のサイゼリア向かい側の通りすぐ
                    </p>
                    <p className="text-neutral-600 font-medium text-sm">
                      （豊田市駅フリーパーキングは提携していないためご注意ください）
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold text-primary-700 mb-4">交通アクセス</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-turquoise-500 mr-2 font-bold">•</span>
                    <div>
                      <p className="font-medium text-primary-600">名鉄豊田線</p>
                      <p className="text-neutral-600">豊田市駅より徒歩1分</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-turquoise-500 mr-2 font-bold">•</span>
                    <div>
                      <p className="font-medium text-primary-600">愛知環状鉄道</p>
                      <p className="text-neutral-600">新豊田駅より徒歩10分</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="h-96 bg-neutral-200 rounded-lg overflow-hidden mb-8">
                {/* In a real implementation, this would be a Google Maps embed */}
                <div className="w-full h-full bg-neutral-300 flex items-center justify-center">
                  <p className="text-neutral-600 font-medium">Google Map would be embedded here</p>
                </div>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-4">駐車場情報</h3>
                <p className="text-neutral-600 mb-4">
                  ビルの前に無料駐車場が6台完備されています。
                  駐車場が満車の場合は、お近くの有料駐車場をご利用ください。
                </p>
                <p className="text-neutral-600 font-bold">
                  豊田市駅フリーパーキングは提携していないためご注意ください
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section className="bg-primary-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary-700 mb-4">
                お問い合わせ
              </h2>
              <p className="text-neutral-600 text-lg">
                ご質問、ご意見、お問い合わせなどがございましたら、下記のフォームよりお気軽にご連絡ください。
                24時間以内に担当者より返信いたします。
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-neutral-700 text-sm font-medium mb-1">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
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
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
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
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-neutral-700 text-sm font-medium mb-1">
                    件名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
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
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
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
                  <label htmlFor="privacy" className="text-sm text-neutral-600">
                    <a href="#" className="text-primary-500 hover:underline">プライバシーポリシー</a>に同意します。
                  </label>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center"
                >
                  <Send size={18} className="mr-2" />
                  送信する
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary-700 mb-4">
                よくある質問
              </h2>
              <p className="text-neutral-600 text-lg">
                お客様からよくいただくご質問と回答をまとめました。
                ご不明な点がございましたら、お気軽にお問い合わせください。
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-primary-700 mb-2">
                  初めての方でも利用できますか？
                </h3>
                <p className="text-neutral-600">
                  はい、フィットネス初心者の方も大歓迎です。経験豊富なトレーナーが、あなたのフィットネスレベルや目標に合わせてサポートします。
                  まずは無料体験セッションでスタジオの雰囲気を体験してみてください。
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-primary-700 mb-2">
                  予約はどのように行えばよいですか？
                </h3>
                <p className="text-neutral-600">
                  ウェブサイトの予約ページ、お電話、または直接スタジオにてご予約いただけます。
                  初回の方は、カウンセリングの時間を含めますので、余裕をもってご予約ください。
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-primary-700 mb-2">
                  どのような設備がありますか？
                </h3>
                <p className="text-neutral-600">
                  最新のトレーニングマシン、フリーウェイトエリア、ストレッチスペース、シャワールーム、ロッカールーム、
                  リラクゼーションエリアなどを完備しています。すべての設備は清潔に保たれ、快適にご利用いただけます。
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-primary-700 mb-2">
                  キャンセルポリシーを教えてください。
                </h3>
                <p className="text-neutral-600">
                  予約の24時間前までにキャンセルのご連絡をいただいた場合は、キャンセル料は発生しません。
                  24時間を切ったキャンセルについては、セッション料金の50%をキャンセル料として申し受けます。
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-primary-700 mb-2">
                  持ち物は何が必要ですか？
                </h3>
                <p className="text-neutral-600">
                  動きやすいスポーツウェアとスポーツシューズをご用意ください。タオルやドリンクは無料でご用意しておりますが、
                  お好みのものをお持ちいただいても構いません。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Contact;