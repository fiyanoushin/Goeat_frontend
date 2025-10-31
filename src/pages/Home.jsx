// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Slide from "../components/Slide";
// import ProductCard from "../components/ProductCard";
// import API from "../api"; // centralized axios instance with baseURL = process.env.REACT_APP_API_URL

// const Home = () => {
//   const [trending, setTrending] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTrending = async () => {
//       try {
//         const res = await API.get("products/?limit=4");
//         setTrending(res.data.results || res.data);
//       } catch (error) {
//         console.error("Error fetching trending desserts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrending();
//   }, []);

//   return (
//     <div className="bg-pink-50 min-h-screen">
//       <Slide />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-pink-100 to-pink-200 py-16 text-center">
//         <div className="max-w-3xl mx-auto px-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 animate-pulse">
//             Welcome to Go Eat 🍰
//           </h1>
//           <p className="text-lg text-gray-700 mb-6">
//             Your one-stop destination for sweet cravings. Discover trending
//             treats and taste happiness!
//           </p>
//           <Link to="/shop">
//             <button className="bg-pink-600 text-white px-6 py-3 rounded-full shadow hover:bg-pink-700 transition">
//               Explore All Desserts
//             </button>
//           </Link>
//         </div>
//       </section>

//       {/* 🍩 Trending Desserts */}
//       <section className="text-center my-14">
//         <motion.h2
//           className="text-3xl font-semibold mb-20 text-pink-500"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           🍩 Trending Desserts
//         </motion.h2>

//         {loading ? (
//           <div className="text-center text-gray-600 text-lg">
//             Loading desserts...
//           </div>
//         ) : trending.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">
//             No trending desserts found.
//           </p>
//         ) : (
//           <motion.div
//             className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-10"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             {trending
//               .sort((a, b) => b.price - a.price)
//               .slice(0, 4)
//               .map((product) => (
//                 <motion.div
//                   key={product.id}
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                 >
//                   <Link to={`/product/${product.id}`}>
//                     <ProductCard product={product} />
//                   </Link>
//                 </motion.div>
//               ))}
//           </motion.div>
//         )}
//       </section>

//       {/* Why Eat Desserts Section */}
//       <section className="bg-white py-16 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <motion.h3
//             className="text-3xl font-bold text-pink-500 mb-6"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             Why Treat Yourself with Dessert?
//           </motion.h3>

//           <div className="grid md:grid-cols-3 gap-8 text-left mt-10">
//             {[
//               {
//                 title: "Boosts Mood",
//                 desc: "Desserts like chocolate stimulate endorphin release — making you happier instantly!",
//               },
//               {
//                 title: "Celebrates Life",
//                 desc: "Every celebration is sweeter with a slice of cake, a scoop of ice cream, or a delicious donut!",
//               },
//               {
//                 title: "Great Energy Source",
//                 desc: "Need a quick pick-me-up? Desserts are packed with sugars and carbs to fuel your day.",
//               },
//             ].map((card, i) => (
//               <motion.div
//                 key={i}
//                 className="bg-pink-100 rounded-xl p-6 shadow hover:shadow-lg transition"
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ delay: i * 0.1 }}
//               >
//                 <h4 className="font-semibold text-lg text-pink-600 mb-2">
//                   {card.title}
//                 </h4>
//                 <p className="text-gray-700">{card.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <footer className="text-center py-6 text-sm text-gray-500">
//         © {new Date().getFullYear()} Go Eat. Made with ❤️ for dessert lovers.
//       </footer>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Slide from "../components/Slide";
import ProductCard from "../components/ProductCard";
import API from "../api"; // centralized axios instance with baseURL = process.env.REACT_APP_API_URL

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await API.get("products/?limit=4");
        setTrending(res.data.results || res.data);
      } catch (error) {
        console.error("Error fetching trending desserts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 min-h-screen">
      <Slide />

      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-rose-300/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-amber-300/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block text-6xl md:text-7xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🍰
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 bg-clip-text text-transparent leading-tight">
              Welcome to Go Eat
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-light max-w-2xl mx-auto">
              Your one-stop destination for sweet cravings. Discover trending
              treats and taste happiness!
            </p>
            <Link to="/shop">
              <motion.button
                className="relative bg-gradient-to-r from-pink-600 to-rose-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-pink-500/50 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore All Desserts</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🍩 Trending Desserts - Enhanced */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-5xl mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🍩
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-3">
              Trending Desserts
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full" />
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 bg-pink-500 rounded-full"
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          ) : trending.length === 0 ? (
            <motion.p
              className="text-center text-gray-500 text-lg py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No trending desserts found.
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {trending
                .sort((a, b) => b.price - a.price)
                .slice(0, 4)
                .map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                        <ProductCard product={product} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Eat Desserts Section - Enhanced */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/50 to-white" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-4">
              Why Treat Yourself with Dessert?
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Life is sweet, and so are the reasons to indulge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Boosts Mood",
                desc: "Desserts like chocolate stimulate endorphin release — making you happier instantly!",
                icon: "😊",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                title: "Celebrates Life",
                desc: "Every celebration is sweeter with a slice of cake, a scoop of ice cream, or a delicious donut!",
                icon: "🎉",
                gradient: "from-rose-500 to-orange-500",
              },
              {
                title: "Great Energy Source",
                desc: "Need a quick pick-me-up? Desserts are packed with sugars and carbs to fuel your day.",
                icon: "⚡",
                gradient: "from-orange-500 to-amber-500",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl -z-10" 
                     style={{ background: `linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(251, 146, 60, 0.3))` }} />
                
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-pink-200/50 border border-pink-100 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-pink-300/50">
                  <motion.div
                    className="text-5xl mb-4 inline-block"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {card.icon}
                  </motion.div>
                  <h4 className={`font-bold text-2xl mb-3 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                    {card.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="relative py-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-rose-100 to-orange-100 opacity-50" />
        <motion.p
          className="text-gray-600 relative z-10 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Go Eat. Made with{" "}
          <motion.span
            className="inline-block text-red-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ❤️
          </motion.span>{" "}
          for dessert lovers.
        </motion.p>
      </footer>
    </div>
  );
};

export default Home;