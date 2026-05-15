import { Link } from 'react-router-dom';
import { HiArrowLeft, HiShieldCheck, HiSparkles, HiHeart, HiStar } from 'react-icons/hi';

const primary = '#061b0e';
const secondary = '#994529';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

const values = [
  { icon: HiSparkles, title: 'Premium Quality', desc: 'Every product is handpicked from the finest sources to ensure lasting satisfaction.' },
  { icon: HiShieldCheck, title: 'Trusted Shopping', desc: 'Secure payments, easy returns, and dedicated support at every step.' },
  { icon: HiHeart, title: 'Conscious Choices', desc: 'We prioritise sustainable sourcing and eco-friendly packaging.' },
  { icon: HiStar, title: 'Curated for You', desc: 'Personalised recommendations that match your unique taste and lifestyle.' },
];

export default function About() {
  return (
    <div style={{ backgroundColor: surfaceBright, minHeight: '100dvh' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold mb-6 transition-colors hover:opacity-70" style={{ color: primary, letterSpacing: '0.03em' }}>
          <HiArrowLeft className="w-4 h-4" /><span>Back to Home</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-4" style={{ color: primary, fontWeight: 500 }}>About SÖLACE</h1>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: secondary }} />
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="card p-8" style={{ border: '1px solid #f0ede8' }}>
            <h2 className="font-['Playfair_Display'] text-2xl mb-4" style={{ color: primary, fontWeight: 500 }}>Our Story</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: onSurfaceVariant }}>
              <p>
                SÖLACE was born from a simple belief — that the things you surround yourself with should bring you peace, joy, and a sense of purpose. We're not just an online store; we're a destination for mindful living.
              </p>
              <p>
                From premium fashion and modern home essentials to clean beauty and thoughtful accessories, every product in our collection is selected with care. We work with trusted brands and artisans who share our commitment to quality, sustainability, and timeless design.
              </p>
              <p>
                Whether you're refreshing your wardrobe, upgrading your space, or finding the perfect gift, SÖLACE is here to help you shop with intention.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-12">
          <div className="relative rounded-2xl overflow-hidden px-8 py-12 text-center" style={{ background: 'linear-gradient(135deg, #061b0e 0%, #0d2e1a 100%)' }}>
            <h2 className="font-['Playfair_Display'] text-3xl mb-4" style={{ color: surfaceBright, fontWeight: 500 }}>Our Mission</h2>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: `${surfaceBright}cc` }}>
              To make thoughtful shopping accessible to everyone — by offering carefully curated products, transparent pricing, and an experience that feels personal, not transactional.
            </p>
          </div>
        </section>

        {/* Shopping Experience */}
        <section className="mb-12">
          <h2 className="font-['Playfair_Display'] text-2xl mb-6 text-center" style={{ color: primary, fontWeight: 500 }}>The SÖLACE Shopping Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { step: '01', title: 'Browse & Discover', desc: 'Explore our curated categories — from Fashion to Home & Living — with smart filters and personalised picks.' },
              { step: '02', title: 'Easy Checkout', desc: 'A seamless, secure checkout process with multiple payment options and instant order confirmation.' },
              { step: '03', title: 'Fast Delivery', desc: 'Reliable shipping with real-time tracking. Most orders arrive within 3–7 business days.' },
              { step: '04', title: 'Hassle-Free Returns', desc: 'Not satisfied? Initiate a return within 15 days. We make it simple and stress-free.' },
            ].map((item, i) => (
              <div key={i} className="card p-6 flex items-start gap-4" style={{ border: '1px solid #f0ede8' }}>
                <span className="font-['Playfair_Display'] text-3xl font-bold" style={{ color: secondary }}>{item.step}</span>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: onSurface }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: onSurfaceVariant }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose */}
        <section>
          <h2 className="font-['Playfair_Display'] text-2xl mb-6 text-center" style={{ color: primary, fontWeight: 500 }}>Why Choose SÖLACE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div key={i} className="card p-6 text-center" style={{ border: '1px solid #f0ede8' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: '#f6f3ee' }}>
                  <v.icon className="w-6 h-6" style={{ color: secondary }} />
                </div>
                <h3 className="font-['Playfair_Display'] text-lg mb-2" style={{ color: primary, fontWeight: 500 }}>{v.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: onSurfaceVariant }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}