import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: "Cake", image: "/assets/cak.jpg" },
  { name: "Brownie", image: "/assets/brown.jpg" },
  { name: "Cupcake", image: "/assets/cup.jpg" },
  { name: "Mousse", image: "/assets/mouse.jpg" }
];

const Menu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-pink-600 text-center mb-4">Explore Our Desserts</h2>
        <p className="text-center text-gray-600 mb-10 text-lg">Find your favorite treat from our curated collection</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.name}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center text-xl font-semibold text-gray-800">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
