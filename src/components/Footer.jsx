import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-pink-50 to-rose-50 text-gray-700 mt-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍰</span>
              </div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Go Eat
              </h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              Serving delicious desserts right at your doorstep. Order now and treat yourself to something sweet!
            </p>
            
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-400 hover:scale-110 transition-all duration-300 shadow-md"
                >
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-black text-gray-800 mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full" />
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-pink-600 group-hover:w-4 transition-all duration-200" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-pink-600 group-hover:w-4 transition-all duration-200" />
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-pink-600 group-hover:w-4 transition-all duration-200" />
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-pink-600 group-hover:w-4 transition-all duration-200" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-black text-gray-800 mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full" />
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-pink-600 group-hover:w-4 transition-all duration-200" />
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-pink-600 group-hover:w-4 transition-all duration-200" />
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-pink-600 group-hover:w-4 transition-all duration-200" />
                  Order Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-pink-600 group-hover:w-4 transition-all duration-200" />
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-black text-gray-800 mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full" />
              Newsletter
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Get the latest dessert deals and exclusive offers!
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-all duration-300 bg-white"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-3 rounded-xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <FaEnvelope />
                <span>Subscribe</span>
              </button>

              {subscribed && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-green-700 font-medium">
                    Successfully subscribed!
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>© 2025</span>
            <span className="font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Go Eat
            </span>
            <span>• All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-pink-600 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="hover:text-pink-600 transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="hover:text-pink-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;