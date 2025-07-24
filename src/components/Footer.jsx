import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-pink-600 mb-3">Go Eat 🍰</h2>
          <p className="text-sm">
            Serving delicious desserts right at your doorstep. Order now and treat yourself!
          </p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Company</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:text-pink-600">About Us</a></li>
            <li><a href="#" className="hover:text-pink-600">Careers</a></li>
            <li><a href="#" className="hover:text-pink-600">Blog</a></li>
            <li><a href="#" className="hover:text-pink-600">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:text-pink-600">FAQs</a></li>
            <li><a href="#" className="hover:text-pink-600">Help Center</a></li>
            <li><a href="#" className="hover:text-pink-600">Order Status</a></li>
            <li><a href="#" className="hover:text-pink-600">Shipping Info</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Newsletter</h3>
          <p className="text-sm mb-3">Get the latest dessert deals!</p>
          <form className="flex items-center border rounded overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 outline-none text-sm"
            />
            <button className="bg-pink-600 text-white px-4 py-2 hover:bg-pink-700">
              <FaEnvelope />
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-200 py-4 text-center text-sm text-gray-600">
        © 2025 Go Eat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

