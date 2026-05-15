import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiOutlinePhone, HiOutlineClock, HiOutlineMail, HiOutlineLocationMarker, HiPaperAirplane, HiOutlineSupport } from 'react-icons/hi';

const primary = '#061b0e';
const secondary = '#994529';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ backgroundColor: surfaceBright, minHeight: '100dvh' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold mb-6 transition-colors hover:opacity-70" style={{ color: primary, letterSpacing: '0.03em' }}>
          <HiArrowLeft className="w-4 h-4" /><span>Back to Home</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-4" style={{ color: primary, fontWeight: 500 }}>Contact Us</h1>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: secondary }} />
          <p className="text-sm mt-4 max-w-lg mx-auto" style={{ color: onSurfaceVariant }}>We'd love to hear from you. Get in touch with our team.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6" style={{ border: '1px solid #f0ede8' }}>
              <h2 className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>
                <HiOutlineSupport className="w-4 h-4" style={{ color: secondary }} />
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f6f3ee' }}>
                    <HiOutlinePhone className="w-4 h-4" style={{ color: secondary }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: onSurface }}>Phone</p>
                    <p className="text-sm" style={{ color: onSurfaceVariant }}>+91 555 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f6f3ee' }}>
                    <HiOutlineMail className="w-4 h-4" style={{ color: secondary }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: onSurface }}>Email Support</p>
                    <p className="text-sm" style={{ color: onSurfaceVariant }}>support@solace.com</p>
                    <p className="text-xs mt-0.5" style={{ color: onSurfaceVariant }}>Response within 4 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f6f3ee' }}>
                    <HiOutlineClock className="w-4 h-4" style={{ color: secondary }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: onSurface }}>Support Hours</p>
                    <p className="text-sm" style={{ color: onSurfaceVariant }}>Monday – Saturday</p>
                    <p className="text-sm" style={{ color: onSurfaceVariant }}>9:00 AM – 8:00 PM IST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f6f3ee' }}>
                    <HiOutlineLocationMarker className="w-4 h-4" style={{ color: secondary }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: onSurface }}>Office</p>
                    <p className="text-sm" style={{ color: onSurfaceVariant }}>SÖLACE HQ, Indiranagar,</p>
                    <p className="text-sm" style={{ color: onSurfaceVariant }}>Bangalore – 560038, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="card p-6" style={{ border: '1px solid #f0ede8' }}>
              <h2 className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>Follow Us</h2>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Instagram', color: '#E4405F' },
                  { name: 'Facebook', color: '#1877F2' },
                  { name: 'Twitter', color: '#1DA1F2' },
                  { name: 'Pinterest', color: '#BD081C' },
                ].map((s) => (
                  <a key={s.name} href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110 active:scale-95" style={{ backgroundColor: '#f6f3ee', color: s.color }}>
                    {s.name.charAt(0)}
                  </a>
                ))}
              </div>
              <p className="text-[10px] mt-3" style={{ color: onSurfaceVariant }}>Follow us on social media for the latest updates, offers, and inspiration.</p>
            </div>
          </div>

          {/* Email Support / Contact Form */}
          <div className="lg:col-span-3">
            <div className="card p-6" style={{ border: '1px solid #f0ede8' }}>
              <h2 className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: primary, letterSpacing: '0.05em' }}>
                <HiPaperAirplane className="w-4 h-4" style={{ color: secondary }} />
                Send us a Message
              </h2>
              <p className="text-xs mb-6" style={{ color: onSurfaceVariant }}>Fill in the form below and we'll get back to you within 4 hours.</p>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#dcfce7' }}>
                    <HiOutlineMail className="w-8 h-8" style={{ color: '#166534' }} />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl mb-2" style={{ color: primary, fontWeight: 500 }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: onSurfaceVariant }}>Thank you for reaching out. We'll respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: onSurface }}>Your Name</label>
                      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="John Doe" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: onSurface }}>Email</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: onSurface }}>Subject</label>
                    <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field" placeholder="How can we help?" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: onSurface }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="input-field" rows="5" placeholder="Write your message..." required style={{ resize: 'vertical', minHeight: '120px' }} />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                    <HiPaperAirplane className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}