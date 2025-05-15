import React from 'react';
import Container from '../components/Container';
import Section from '../components/Section';

const Faq: React.FC = () => {
  const faqItems = [
    {
      question: 'ピラティスとは何ですか？',
      answer: '...'
    },
    {
      question: '持ち物は何が必要でしょうか？',
      answer: '...'
    },
    {
      question: 'どんな服装がいいですか？',
      answer: '...'
    },
    {
      question: '何分前に行けばいいですか？',
      answer: '...'
    },
    {
      question: '医師から運動を止められているのですが、ピラティスしてもよいですか？',
      answer: '...'
    },
    {
      question: '身体ガチガチの運動初心者ですが平気ですか？',
      answer: '...'
    },
    {
      question: '男性でも通えますか？',
      answer: '...'
    },
    {
      question: '予約後のキャンセルはできますか？',
      answer: '...'
    }
  ];

  return (
    <>
      <Section className="bg-primary-50 pt-32">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
              よくある質問
            </h1>
            <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
              Softisについてのよくある質問をまとめました
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 text-primary-700">{item.question}</h3>
                  <p className="text-neutral-600">{item.answer}</p>
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