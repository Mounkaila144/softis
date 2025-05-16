import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

import Container from '../components/Container';
import Section from '../components/Section';
import Button from '../components/Button';
import OptimizedImage from '../components/OptimizedImage';

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');

  // Mock available time slots
  const availableTimeSlots = [
    '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  // Mock services
  const services = [
    { id: 'personal', name: 'パーソナルトレーニング' },
    { id: 'group', name: 'グループセッション' },
    { id: 'nutrition', name: '栄養カウンセリング' },
    { id: 'assessment', name: 'フィットネスアセスメント' },
    { id: 'recovery', name: 'リカバリー & リラクゼーション' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the booking data to a server
    alert('予約リクエストを受け付けました。確認のメールをお送りします。');
  };

  return (
    <>
      {/* Hero section */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <OptimizedImage
            src="/src/assets/IMG/IMG_2602.jpeg"
            alt="Pilates studio"
            className="w-full h-full object-cover"
            loading="eager"
            quality={90}
            format="webp"
          />
          <div 
            className="absolute inset-0 bg-primary-900/50"
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-4"
            >
              予約
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90"
            >
              softisで理想のボディを手に入れるための第一歩として、
              無料体験セッションまたは各種サービスの予約を行ってください。
            </motion.p>
          </div>
        </Container>
      </div>

      {/* Booking Section */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-700 mb-6">
                セッションを予約する
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label className="block text-primary-700 font-medium mb-2">
                    サービスを選択
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <div 
                        key={service.id}
                        onClick={() => setSelectedService(service.id)}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedService === service.id 
                            ? 'border-primary-500 bg-turquoise-200' 
                            : 'border-neutral-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                            selectedService === service.id 
                              ? 'bg-turquoise-2000' 
                              : 'bg-neutral-200'
                          }`}></div>
                          <span>{service.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Date Selection */}
                <div>
                  <label htmlFor="date" className="block text-primary-700 font-medium mb-2">
                    日付を選択
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
                    <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>
                </div>
                
                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="block text-primary-700 font-medium mb-2">
                      時間を選択
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableTimeSlots.map((time) => (
                        <div
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`flex items-center justify-center p-2 border rounded cursor-pointer transition-colors ${
                            selectedTime === time 
                              ? 'bg-turquoise-2000 text-white border-primary-500' 
                              : 'border-neutral-200 hover:border-primary-300'
                          }`}
                        >
                          <Clock size={16} className="mr-1" />
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-primary-700">個人情報</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-neutral-700 text-sm font-medium mb-1">
                        姓
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                        <input
                          type="text"
                          id="lastName"
                          className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-neutral-700 text-sm font-medium mb-1">
                        名
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                        <input
                          type="text"
                          id="firstName"
                          className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-neutral-700 text-sm font-medium mb-1">
                      メールアドレス
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                      <input
                        type="email"
                        id="email"
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-neutral-700 text-sm font-medium mb-1">
                      電話番号
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
                      <input
                        type="tel"
                        id="phone"
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-neutral-700 text-sm font-medium mb-1">
                      メッセージ（任意）
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-neutral-500" size={18} />
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                        placeholder="目標や健康状態などについて、何か伝えておきたいことがあればご記入ください。"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                >
                  予約を確定する
                </Button>
              </form>
            </div>
            
            {/* Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-700 mb-6">
                予約に関する情報
              </h2>
              
              <div className="bg-turquoise-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-primary-700 mb-4">
                  無料体験セッションについて
                </h3>
                <p className="text-white mb-4">
                  softisでは、新規のお客様に60分間の無料体験セッションを提供しています。
                  このセッションには以下が含まれます：
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span className="text-neutral-700">フィットネスレベルと目標の評価</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span className="text-neutral-700">施設の案内</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span className="text-neutral-700">パーソナルトレーニングの体験</span>
                  </li>
                  <li className="flex">
                    <span className="text-turquoise-500 mr-2">✓</span>
                    <span className="text-neutral-700">あなたに最適なプログラムの提案</span>
                  </li>
                </ul>
                <p className="text-neutral-700 italic">
                  ※ 体験セッションは予約制です。お早めにご予約ください。
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary-700 mb-3">営業時間</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-white">月曜日 - 金曜日:</span>
                      <span className="text-neutral-800 font-medium">7:00 - 22:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-white">土曜日:</span>
                      <span className="text-neutral-800 font-medium">8:00 - 20:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-white">日曜日:</span>
                      <span className="text-neutral-800 font-medium">9:00 - 18:00</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-primary-700 mb-3">キャンセルポリシー</h3>
                  <p className="text-white">
                    予約の24時間前までにキャンセルのご連絡をいただいた場合は、キャンセル料は発生しません。
                    24時間を切ったキャンセルについては、セッション料金の50%をキャンセル料として申し受けます。
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-primary-700 mb-3">よくある質問</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-primary-600">どのような服装で行けばいいですか？</h4>
                      <p className="text-white">動きやすいスポーツウェアとスポーツシューズをご用意ください。更衣室とロッカーを完備しています。</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-600">タオルは持参する必要がありますか？</h4>
                      <p className="text-white">フェイスタオルとバスタオルは無料でご用意しております。</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-primary-600">初心者でも大丈夫ですか？</h4>
                      <p className="text-white">はい、どのレベルの方でも対応可能です。初心者の方には特に丁寧に基本から指導いたします。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Booking;