import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-emerald-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_25%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="uppercase tracking-wide text-primary-100 mb-3 font-semibold">DigiFarm Assist</p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Grow smarter with AI, trusted vendors, and expert knowledge
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-50 leading-relaxed">
                Diagnose crop issues instantly, source verified agri-inputs, and learn best practices tailored for East African farmers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/diagnosis" className="btn-primary bg-white text-primary-700 hover:bg-primary-50 text-lg px-8 py-3 shadow-lg">
                  Start a Diagnosis
                </Link>
                <Link to="/marketplace" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700 text-lg px-8 py-3">
                  Explore Marketplace
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Why farmers love us</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                  <p className="text-3xl font-bold">15K+</p>
                  <p className="text-sm text-primary-50">Diagnoses processed</p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                  <p className="text-3xl font-bold">4.8★</p>
                  <p className="text-sm text-primary-50">Farmer satisfaction</p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                  <p className="text-3xl font-bold">200+</p>
                  <p className="text-sm text-primary-50">Verified products</p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-sm text-primary-50">Support & alerts</p>
                </div>
              </div>
              {!isAuthenticated && (
                <div className="mt-6">
                  <Link to="/register" className="btn-primary w-full text-center">
                    Create free account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍',
                title: 'AI Crop Doctor',
                desc: 'Upload leaf images and get instant diagnosis, confidence scores, and tailored remedies.'
              },
              {
                icon: '🛒',
                title: 'Verified Marketplace',
                desc: 'Curated seeds, fertilizers, and tools from vetted vendors with transparent pricing.'
              },
              {
                icon: '📡',
                title: 'Realtime Alerts',
                desc: 'Weather nudges, pest outbreak alerts, and payment notifications to keep you proactive.'
              }
            ].map((item) => (
              <div key={item.title} className="card h-full">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Avg diagnosis-to-action', value: '6 hrs', desc: 'From upload to recommended treatment.' },
            { label: 'Crop recovery rate', value: '92%', desc: 'Crops showing improvement after guided steps.' },
            { label: 'On-time deliveries', value: '97%', desc: 'Orders fulfilled by verified vendors.' }
          ].map((item) => (
            <div key={item.label} className="card text-left">
              <p className="text-sm uppercase text-primary-600 font-semibold mb-2">{item.label}</p>
              <p className="text-3xl font-bold mb-2">{item.value}</p>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
            <div>
              <p className="text-primary-600 font-semibold uppercase tracking-wide">Marketplace spotlights</p>
              <h2 className="text-3xl font-bold">Trusted inputs to act fast</h2>
              <p className="text-gray-600 mt-2">Browse curated product types farmers use most after diagnosis.</p>
            </div>
            <Link to="/marketplace" className="btn-primary">Shop now</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Seeds & Seedlings', desc: 'High-germination varieties, drought-tolerant hybrids.' },
              { title: 'Fertilizers', desc: 'Soil-friendly blends for leafy greens, maize, and horticulture.' },
              { title: 'Pesticides & IPM', desc: 'Safe pest control with clear application guides.' },
              { title: 'Tools & Irrigation', desc: 'Drip kits, sprayers, and essentials for smallholders.' }
            ].map((item) => (
              <div key={item.title} className="card">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 flex-col md:flex-row gap-4">
            <div>
              <p className="text-primary-600 font-semibold uppercase tracking-wide">3-minute setup</p>
              <h2 className="text-3xl font-bold">Your path to healthier crops</h2>
            </div>
            <Link to="/diagnosis" className="btn-primary">
              Start a diagnosis
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Sign up', text: 'Create your free farmer or vendor profile.' },
              { step: '2', title: 'Upload photo', text: 'Snap your crop issue and submit.' },
              { step: '3', title: 'Get insights', text: 'AI suggests likely issues with confidence.' },
              { step: '4', title: 'Act & source', text: 'Follow remedies and buy trusted inputs.' }
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-700 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Trusted by farmers & vendors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Jane · Tomato farmer, Nakuru',
                quote: 'Diagnosed blight in minutes and bought treatment immediately. Saved a full harvest.',
              },
              {
                name: 'Ahmed · Vendor, Mombasa',
                quote: 'Verified buyers, M-Pesa checkout, and clear order tracking keep my customers happy.',
              },
              {
                name: 'Grace · Agronomist',
                quote: 'The knowledge hub and localized advice help me guide farmers faster and with confidence.',
              },
            ].map((t) => (
              <div key={t.name} className="card h-full">
                <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                <p className="font-semibold text-primary-700">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value + CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-primary-600 font-semibold uppercase tracking-wide mb-2">Built for East African farms</p>
            <h3 className="text-3xl font-bold mb-4">Insights, inputs, and guidance in one place</h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Region-aware recommendations and language-ready (English/Swahili friendly copy)</li>
              <li>• Pay securely via M-Pesa with instant status updates</li>
              <li>• Verified vendors and quality inputs to protect your yields</li>
              <li>• Knowledge hub with practical, field-tested guides</li>
              <li>• Notifications for weather, pests, and order updates</li>
            </ul>
          </div>
          <div className="card bg-gradient-to-br from-primary-50 to-white border-primary-100">
            <h4 className="text-xl font-semibold mb-3">Take the next step</h4>
            <div className="space-y-3 text-gray-700">
              <p>👨‍🌾 Farmers: run a free diagnosis or browse curated inputs.</p>
              <p>🏪 Vendors: list products, manage orders, and reach ready buyers.</p>
              <p>🌱 Agronomists: share knowledge through the hub.</p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/marketplace" className="btn-primary w-full text-center">
                Browse inputs
              </Link>
              <Link to="/knowledge" className="btn-secondary w-full text-center">
                Read guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-primary-700 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to reduce losses and boost yields?</h3>
            <p className="text-primary-50">Run a diagnosis, buy trusted inputs, and follow clear playbooks—all in one place.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
              {isAuthenticated ? 'Open Dashboard' : 'Create free account'}
            </Link>
            <Link to="/knowledge" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700">
              Explore Knowledge Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

