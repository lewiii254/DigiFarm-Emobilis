const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">DigiFarm Assist</h3>
            <p className="text-gray-400">
              Empowering farmers with AI-powered crop diagnosis and agricultural marketplace.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/marketplace" className="hover:text-white">Marketplace</a></li>
              <li><a href="/knowledge" className="hover:text-white">Knowledge Hub</a></li>
              <li><a href="/diagnosis" className="hover:text-white">Crop Diagnosis</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400">
              Email: support@digifarm.com<br />
              Phone: +254 700 000 000
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DigiFarm Assist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

