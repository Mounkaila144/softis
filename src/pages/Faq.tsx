import React from 'react';
import Container from '../components/Container';
import Section from '../components/Section';
import OptimizedImage from "../components/OptimizedImage.tsx";

const Faq: React.FC = () => {
  const faqItems = [
    {
      question: 'ピラティスとは何ですか？',
      answer: 'ピラティスは、身体の深層筋（インナーマッスル）を鍛え、正しい姿勢、柔軟性、バランス、そして体幹の強化を目指すエクササイズ方法です。特に腹部、背中、骨盤の安定性を高め、全身のアライメントを整えることで、日常生活やスポーツのパフォーマンス向上にも役立ちます。'
    },
    {
      question: '持ち物は何が必要でしょうか？',
      answer: '動きやすいスポーツウェアとスポーツシューズをご用意ください。タオルやドリンクは無料でご用意しておりますが、お好みのものをお持ちいただいても構いません。'
    },
    {
      question: 'どんな服装がいいですか？',
      answer: '動きやすい服装であれば問題ありません。身体のラインが見えるタイプの服装だと、インストラクターが姿勢の確認がしやすくなりますので、トレーニングウェアやヨガウェアなどがおすすめです。靴下は滑り止めがあるものが安全です。'
    },
    {
      question: '何分前に行けばいいですか？',
      answer: 'レッスン開始の15分前にお越しいただくことをおすすめします。初めての方は、フォームの記入や施設の説明などがありますので、20分前のご来店がより安心です。'
    },
    {
      question: '医師から運動を止められているのですが、ピラティスしてもよいですか？',
      answer: '医師から運動を制限されている場合は、ピラティスを始める前に必ず担当医にご相談ください。当スタジオでは理学療法士の資格を持つインストラクターが在籍していますが、医師の判断が最優先されます。お客様の健康状態に合わせたプログラムをご提案することも可能です。'
    },
    {
      question: '身体ガチガチの運動初心者ですが平気ですか？',
      answer: 'はい、フィットネス初心者の方も大歓迎です。経験豊富なトレーナーが、あなたのフィットネスレベルや目標に合わせてサポートします。身体が硬い方向けの初心者クラスもご用意していますので、安心してお越しください。まずは無料体験セッションでスタジオの雰囲気を体験してみてください。'
    },
    {
      question: '男性でも通えますか？',
      answer: 'もちろん男性も歓迎しています。男性の方も多く通われており、筋力トレーニングの補完や姿勢改善、柔軟性向上などを目的にピラティスを取り入れている方が増えています。'
    },
    {
      question: '予約後のキャンセルはできますか？',
      answer: '予約の24時間前までにキャンセルのご連絡をいただいた場合は、キャンセル料は発生しません。24時間を切ったキャンセルについては、セッション料金の50%をキャンセル料として申し受けます。'
    },
    {
      question: '初めての方でも利用できますか？',
      answer: 'はい、フィットネス初心者の方も大歓迎です。経験豊富なトレーナーが、あなたのフィットネスレベルや目標に合わせてサポートします。まずは無料体験セッションでスタジオの雰囲気を体験してみてください。'
    },
    {
      question: '予約はどのように行えばよいですか？',
      answer: 'ウェブサイトの予約ページ、お電話、または直接スタジオにてご予約いただけます。初回の方は、カウンセリングの時間を含めますので、余裕をもってご予約ください。'
    },
    {
      question: 'どのような設備がありますか？',
      answer: 'ピラティスリフォーマー、バレル、チェア、タワー、スパインコレクターなど多種に渡るマシンを取り揃えております。そのためお一人お一人に合わせたいろいろなエクササイズが可能となります。すべての設備は清潔に保たれ、快適にご利用いただけます。'
    }
  ];

  return (
    <>
      <div className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <OptimizedImage
              src="/src/assets/IMG/1.jpeg"
              alt="Pilates studio"
              className="w-full h-full object-cover"
              loading="eager"
              quality={90}
              format="webp"
          />
          <div
              className="absolute inset-0 bg-primary-900/50"
          />
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
              よくある質問
            </h1>
            <p className="text-white text-lg max-w-3xl mx-auto">
              Softisについてのよくある質問をまとめました
            </p>
          </div>
        </div>
      </div>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-turquoise-200 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-primary-700">{item.question}</h3>
                  <p className="text-white">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Faq; 