import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Slide from '../components/Slide'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

const Home = () => {
  const [trending, setTrending] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/products?_limit=4').then(res => {
      setTrending(res.data)
    })
  }, [])

  return (
    <div className="bg-pink-50 min-h-screen">
      <Slide />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-100 to-pink-200 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 animate-pulse">Welcome to Go Eat 🍰</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your one-stop destination for sweet cravings. Discover trending treats and taste happiness!
          </p>
          <Link to="/products">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-full shadow hover:bg-pink-700 transition">
              Explore All Desserts
            </button>
          </Link>
        </div>
      </section>

      {/* Trending Desserts */}
      <section className="text-center my-14">
        <motion.h2 
          className="text-3xl font-semibold mb-4 text-pink-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🍩 Trending Desserts
        </motion.h2>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {trending.map(product => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Eat Desserts Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h3 
            className="text-3xl font-bold text-pink-500 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Treat Yourself with Dessert?
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8 text-left mt-10">
            <motion.div
              className="bg-pink-100 rounded-xl p-6 shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="font-semibold text-lg text-pink-600 mb-2">Boosts Mood</h4>
              <p className="text-gray-700">Desserts like chocolate stimulate endorphin release — making you happier instantly!</p>
            </motion.div>

            <motion.div
              className="bg-pink-100 rounded-xl p-6 shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold text-lg text-pink-600 mb-2">Celebrates Life</h4>
              <p className="text-gray-700">Every celebration is sweeter with a slice of cake, a scoop of ice cream, or a delicious donut!</p>
            </motion.div>

            <motion.div
              className="bg-pink-100 rounded-xl p-6 shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold text-lg text-pink-600 mb-2">Great Energy Source</h4>
              <p className="text-gray-700">Need a quick pick-me-up? Desserts are packed with sugars and carbs to fuel your day.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Go Eat. Made with ❤️ for dessert lovers.
      </footer>
    </div>
  )
}

export default Home
