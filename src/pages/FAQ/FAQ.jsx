import { useState } from "react";
import "./FAQ.css";
import { IoReturnUpBack } from "react-icons/io5";

const faqData = [
  {
    question: "Do you offer nationwide delivery?",
    answer: "Yes, we deliver all over Nigeria. Delivery fees may vary based on location.",
  },
  {
    question: "How do I place an order?",
    answer: "Just add products to your cart and hit checkout—we'll redirect you to WhatsApp to complete your order.",
  },
  {
    question: "What payment options do you accept?",
    answer: "We currently accept bank transfers and payment on delivery (selected locations only).",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
        <div>
        <a href="/"><IoReturnUpBack  className="back"/></a>
      <h1>Frequently Asked Questions</h1>
      </div>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div
            className="faq-question"
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
          </div>
          {activeIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
