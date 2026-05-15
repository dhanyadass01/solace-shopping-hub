import { Link } from 'react-router-dom';
import { HiOutlineClock, HiArrowRight } from 'react-icons/hi';

const articles = [
  {
    id: 1,
    title: 'The Art of Daily Rituals',
    excerpt: 'Simple practices to bring intention and calm to your everyday routine, from morning mindfulness to evening wind-downs.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    category: 'Cosmetics',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Bringing the Outdoors In',
    excerpt: 'How botanical elements can transform your living space into a sanctuary of peace and natural beauty.',
    image: 'https://images.unsplash.com/photo-1616046229478-8a5a5e5b5b5b?w=600&q=80',
    category: 'Home & Living',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Sustainable Wellness',
    excerpt: 'Exploring earth-conscious choices that nurture both personal well-being and the planet we call home.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80',
    category: 'Home Essentials',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'The Modern Apothecary',
    excerpt: 'Rediscovering natural ingredients and time-honoured formulations for radiant skin and balanced living.',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80',
    category: 'Cosmetics',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'Mindful Movement',
    excerpt: 'Finding harmony through gentle exercise that honours the body and quiets the mind.',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80',
    category: 'Fitness Products',
    readTime: '3 min read',
  },
  {
    id: 6,
    title: 'Ceremony & Connection',
    excerpt: 'The power of shared rituals — from tea ceremonies to seasonal gatherings — in building deeper bonds.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    category: 'Home & Living',
    readTime: '5 min read',
  },
];

const primary = '#061b0e';
const secondary = '#994529';
const onSurfaceVariant = '#434843';

export default function Journal() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fcf9f4', color: '#1c1c19', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="max-w-4xl mx-auto px-5 pt-12 pb-8">
        <Link to="/" className="font-['Playfair_Display'] text-xl tracking-widest inline-block" style={{ color: primary, fontWeight: 600 }}>
          SÖLACE
        </Link>
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl mt-8" style={{ fontWeight: 500, lineHeight: 1.2 }}>
          The Journal
        </h1>
        <p className="mt-3 max-w-lg" style={{ color: onSurfaceVariant, fontSize: '16px', lineHeight: 1.6 }}>
          Stories, guides, and musings on living with intention.
        </p>
      </div>

      {/* Featured Article */}
      <div className="max-w-4xl mx-auto px-5 mb-12">
        <Link to={`/products?category=${articles[0].category}`} className="group block rounded-2xl overflow-hidden" style={{ backgroundColor: '#f6f3ee' }}>
          <div className="md:flex">
            <div className="md:w-1/2 overflow-hidden">
              <img src={articles[0].image} alt={articles[0].title} className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: secondary, letterSpacing: '0.05em' }}>Featured</span>
              <h2 className="font-['Playfair_Display'] text-2xl mt-2 group-hover:opacity-70 transition-opacity" style={{ fontWeight: 500 }}>
                {articles[0].title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: onSurfaceVariant }}>
                {articles[0].excerpt}
              </p>
              <div className="flex items-center gap-3 mt-4 text-xs" style={{ color: onSurfaceVariant }}>
                <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" />{articles[0].readTime}</span>
                <span className="flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: secondary }}>
                  Explore collection <HiArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Article Grid */}
      <div className="max-w-4xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(1).map((article) => (
            <Link
              key={article.id}
              to={`/products?category=${article.category}`}
              className="group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ backgroundColor: '#f6f3ee' }}
            >
              <div className="overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: secondary, letterSpacing: '0.05em' }}>{article.category}</span>
                <h3 className="font-['Playfair_Display'] text-xl mt-1 group-hover:opacity-70 transition-opacity" style={{ fontWeight: 500 }}>
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: onSurfaceVariant }}>
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-4 text-xs" style={{ color: onSurfaceVariant }}>
                  <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" />{article.readTime}</span>
                  <span className="flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: secondary }}>
                    Read more <HiArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
