import { useState, useEffect } from 'react';
import busData from '../data/busData.json';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PopularBuses = () => {
  const [popularBuses, setPopularBuses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!busData || !Array.isArray(busData)) {
      console.error('busData is undefined or not an array', busData);
      return;
    }

    // Ambil daftar bus dan acak 3 bus populer
    const shuffledBuses = [...busData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setPopularBuses(shuffledBuses);
  }, []);

  return (
    <motion.section
      className="py-16 px-6"
      initial={{ opacity: 1, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }} // Start when 10% of element is in view
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl text-center text-[#28313F] font-semibold mb-10">
        Bus Populer
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4">
        {popularBuses.map((bus, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={
                bus.image ||
                'https://asset.kompas.com/crops/LPwjG32zYTsbPsWAZcB0U0Wfgr0=/0x68:1000x735/1200x800/data/photo/2022/03/13/622d9e4514490.jpg'
              }
              alt={bus.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-[14px] font-semibold text-[#28313F] lg:text-lg">
                {bus.name}
              </h3>
              <p className="text-gray-600 text-sm lg:text-lg">
                {bus.type}
              </p>
              <button
                className="mt-4 bg-gray-900 text-white py-2 px-4 rounded-md w-full hover:bg-gray-600 transition duration-300 cursor-pointer uppercase"
                onClick={() => navigate(`/bus/${bus.id}`)}
              >
                Detail Bus
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default PopularBuses;
