import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import Container from '../components/Container';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-turquoise-700 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/src/assets/logo.png"
                alt="softis" 
                className="h-8 w-auto mr-2 filter brightness-0 invert"
              />
              <span className="font-serif font-bold text-xl">
                softis
              </span>
            </Link>
            <p className="text-neutral-300 mb-6">
              自分を超える、毎日を変える。東京で最も洗練されたフィットネス体験をあなたに。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">クイックリンク</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-white transition-colors">ホーム</Link></li>
              <li><Link to="/services" className="text-neutral-300 hover:text-white transition-colors">サービス</Link></li>
              <li><Link to="/instructors" className="text-neutral-300 hover:text-white transition-colors">インストラクター</Link></li>
              <li><Link to="/booking" className="text-neutral-300 hover:text-white transition-colors">予約</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">アクセス</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">サービス</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">パーソナルトレーニング</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">グループセッション</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">ボディメイク</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">ヨガ & マインドフルネス</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">栄養カウンセリング</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">お問い合わせ</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="mr-2 flex-shrink-0 text-turquoise-400" size={20} />
                <span className="text-neutral-300">〒106-0032 東京都港区六本木6-10-1 六本木ヒルズ森タワー</span>
              </li>
              <li className="flex">
                <Phone className="mr-2 flex-shrink-0 text-turquoise-400" size={20} />
                <span className="text-neutral-300">03-1234-5678</span>
              </li>
              <li className="flex">
                <Mail className="mr-2 flex-shrink-0 text-turquoise-400" size={20} />
                <span className="text-neutral-300">info@zenftitnesstokyo.jp</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-primary-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} softis. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-white transition-colors">利用規約</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;