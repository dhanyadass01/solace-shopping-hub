import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiChevronDown, HiOutlineTruck, HiOutlineRefresh, HiOutlineSupport, HiOutlineQuestionMarkCircle, HiOutlineCheckCircle } from 'react-icons/hi';

const primary = '#061b0e';
const secondary = '#994529';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

const faqs = [
  { q: 'How do I place an order?', a: 'Simply browse our catalogue, add items to your cart, and proceed to checkout. You can place an order as a guest or create an account for faster checkout.' },
  { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. Contact our support team with your order number for assistance.' },
  { q: 'How do I track my order?', a: 'Once shipped, you\'ll receive a tracking link via email. You can also view order status in your account under "My Orders".' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets. All transactions are securely processed.' },
  { q: 'Is my payment information secure?', a: 'Absolutely. We use industry-standard SSL encryption to protect your data. We never store your full payment details.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship across India. International shipping will be available soon. Sign up for updates to be notified.' },
];

const policies = [
  {
    icon: HiOutlineRefresh,
    title: 'Return Policy',
    items: [
      'Items can be returned within 15 days of delivery.',
      'Products must be unused, unworn, and in original packaging.',
      'Return shipping is free for defective or incorrect items.',
      'Refunds are processed within 5–7 business days after inspection.',
      'To initiate a return, visit "My Orders" and select the item.',
    ],
  },
  {
    icon: HiOutlineTruck,
    title: 'Shipping Details',
    items: [
      'Free shipping on orders above ₹999.',
      'Standard delivery: 3–7 business days.',
      'Express delivery available at checkout (1–2 business days).',
      'Orders are dispatched within 24 hours of confirmation.',
      'Tracking information shared via email and SMS.',
    ],
  },
  {
    icon: HiOutlineSupport,
    title: 'Support Information',
    items: [
      'Email: support@solace.com — response within 4 hours.',
      'Phone: +91 555 123 4567 (Mon–Sat, 9 AM – 8 PM IST).',
      'Live chat available on our website during business hours.',
      'We speak English, Hindi, and Tamil.',
      'For urgent queries, reach us via phone or live chat.',
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl transition-all" style={{ backgroundColor: open ? '#ffffff' : '#f6f3ee', border: '1px solid #f0ede8' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
        <span className="text-sm font-semibold pr-4" style={{ color: onSurface }}>{question}</span>
        <HiChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: onSurfaceVariant }} />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-xs leading-relaxed" style={{ color: onSurfaceVariant }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function CustomerCare() {
  return (
    <div style={{ backgroundColor: surfaceBright, minHeight: '100dvh' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold mb-6 transition-colors hover:opacity-70" style={{ color: primary, letterSpacing: '0.03em' }}>
          <HiArrowLeft className="w-4 h-4" /><span>Back to Home</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-4" style={{ color: primary, fontWeight: 500 }}>Customer Care</h1>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: secondary }} />
          <p className="text-sm mt-4 max-w-lg mx-auto" style={{ color: onSurfaceVariant }}>We're here to help. Find answers, policies, and ways to reach us.</p>
        </div>

        {/* FAQ */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <HiOutlineQuestionMarkCircle className="w-5 h-5" style={{ color: secondary }} />
            <h2 className="font-['Playfair_Display'] text-xl" style={{ color: primary, fontWeight: 500 }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </section>

        {/* Policies */}
        <div className="space-y-6 mb-12">
          {policies.map((section, i) => (
            <section key={i} className="card p-6" style={{ border: '1px solid #f0ede8' }}>
              <div className="flex items-center gap-2 mb-4">
                <section.icon className="w-5 h-5" style={{ color: secondary }} />
                <h2 className="font-['Playfair_Display'] text-xl" style={{ color: primary, fontWeight: 500 }}>{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm" style={{ color: onSurfaceVariant }}>
                    <HiOutlineCheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: secondary }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}