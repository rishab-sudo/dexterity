import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
  {
    question: 'What services does DexterityWorld provide?',
    answer:
      'DexterityWorld offers SEO, Google Ads, Meta Ads, social media marketing, website development, branding, content marketing, and performance-driven digital growth solutions tailored for startups, local businesses, and growing brands.',
  },
  {
    question: 'How can SEO help my business grow online?',
    answer:
      'SEO improves your website visibility on Google, increases organic traffic, attracts qualified leads, and helps your business build long-term online authority without relying entirely on paid advertising.',
  },
  {
    question: 'Do you manage Google Ads and Meta Ads campaigns?',
    answer:
      'Yes. We create, optimise, and manage Google Search Ads, Display Ads, YouTube Ads, Facebook Ads, and Instagram Ads with a strong focus on lead generation, conversions, and return on ad spend.',
  },
  {
    question: 'Can DexterityWorld build a website for my company?',
    answer:
      'Absolutely. We design responsive, fast-loading, SEO-friendly websites using modern technologies and conversion-focused layouts that work seamlessly across mobile, tablet, and desktop devices.',
  },
  {
    question: 'Which industries do you work with?',
    answer:
      'We work with businesses in healthcare, education, real estate, hospitality, e-commerce, manufacturing, local services, IT companies, and personal brands looking to scale their digital presence.',
  },
  {
    question: 'How long does it take to see SEO results?',
    answer:
      'Most businesses begin noticing measurable improvements within 3-6 months, depending on competition, website condition, industry, and the consistency of the SEO strategy being implemented.',
  },
  {
    question: 'Do you provide monthly digital marketing reports?',
    answer:
      'Yes. Every client receives detailed monthly reports covering traffic growth, keyword rankings, ad performance, leads generated, conversions, and actionable recommendations for continuous improvement.',
  },
  {
    question: 'Why choose DexterityWorld over other digital marketing companies?',
    answer:
      'DexterityWorld combines creative strategy, technical expertise, transparent communication, and performance-focused execution. We focus on measurable business growth rather than vanity metrics.',
  },
];

const HomeFaq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className='dw-faq-section'>
      <div className='dw-faq-overlay'>
        <div className='container'>
          <div className='dw-faq-header text-center'>
            <span className='dw-faq-tag'>FREQUENTLY ASKED QUESTIONS</span>
            <h2 className='pageheading text-white'>
              DexterityWorld Digital Marketing FAQs
            </h2>
            <p className='pagedescription text-white-50'>
              Everything you need to know about our SEO, advertising, website
              development, and digital marketing services.
            </p>
          </div>

          <div className='dw-faq-container'>
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`dw-faq-item ${
                  activeIndex === index ? 'active' : ''
                }`}
              >
                <button
                  className='dw-faq-question'
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className='dw-faq-icon'>
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                <div className='dw-faq-answer'>
                  <div className='dw-faq-answer-content'>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;