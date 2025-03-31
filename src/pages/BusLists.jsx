import { useState } from 'react';
import { FaRegSnowflake, FaCouch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import busData from '../data/busData.json';
import { useNavigate } from 'react-router-dom';

const BusLists = () => {
  const [filter, setFilter] = useState({
    tipe: '',
    kapasitas: '',
    fasilitas: [],
  });

  const navigate = useNavigate();

  const [showFacilitiesDropdown, setShowFacilitiesDropdown] = useState(false);
  const categories = ['Semua', 'Kelas Ekonomi', 'Kelas Bisnis', 'First Class'];
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Toggle dropdown fasilitas
  const toggleFasilitasDropdown = () => {
    setShowFacilitiesDropdown((prev) => !prev);
  };

  // Toggle fasilitas untuk multi-select
  const toggleFasilitas = (selectedFasilitas) => {
    setFilter((prev) => {
      const fasilitasBaru = prev.fasilitas.includes(selectedFasilitas)
        ? prev.fasilitas.filter((f) => f !== selectedFasilitas)
        : [...prev.fasilitas, selectedFasilitas];
      return { ...prev, fasilitas: fasilitasBaru };
    });
  };

  // Filter bus berdasarkan kategori, kapasitas, dan fasilitas
  const filteredBus = busData.filter((bus) => {
    const matchTipe =
      selectedCategory === 'Semua' ||
      bus.type?.toLowerCase() === selectedCategory.toLowerCase();
    const matchKapasitas = filter.kapasitas
      ? filter.kapasitas === 'under30'
        ? parseInt(bus.capacity) <= 30
        : parseInt(bus.capacity) > 30
      : true;
    const matchFasilitas = filter.fasilitas.length
      ? filter.fasilitas.every((f) =>
          bus.facilities.some((busFasilitas) =>
            busFasilitas.toLowerCase().includes(f.toLowerCase())
          )
        )
      : true;

    return matchTipe && matchKapasitas && matchFasilitas;
  });


  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h2 className="text-3xl font-semibold pt-35 text-center text-[#1F2733]">
        Daftar Bus
      </h2>

      {/* 🔵 Button Filter Kategori */}
      <div className="flex justify-center space-x-1 my-6 md:space-x-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-2 py-2 text-sm rounded-lg border md:px-4 md:py-2 lg:px-6 lg:text-lg ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-900 border-gray-300'
            } hover:bg-gray-800 hover:text-white transition-colors duration-500 cursor-pointer`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🔵 Daftar Bus */}
      <div className="grid grid-cols-1 w-85 gap-8 md:grid-cols-2 md:w-160 mb-8 lg:grid-cols-3 lg:w-300 mx-auto">
        {filteredBus.length > 0 ? (
          <>
            {filteredBus.map((bus) => {
              return (
                <div key={bus.id} className="bg-white shadow-md rounded-lg p-4">
                  {/* Image or icon for the bus */}
                  <div className="h-32 bg-gray-200 flex items-center justify-center rounded-t-md overflow-hidden">
                    <img
                      src={bus.image}
                      alt={bus.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Bus name */}
                  <h3 className="mt-4 ml-4 text-lg font-semibold text-[#1F2733]">
                    {bus.name ? bus.name : 'Nama Bus Tidak Tersedia'}
                  </h3>

                  {/* Bus capacity */}
                  <p className="text-gray-600 ml-4">
                    Kapasitas:{' '}
                    {bus.capacity ? bus.capacity : 'Data Tidak Tersedia'}
                  </p>

                  {/* Seat type */}
                  <div className="flex items-center gap-2 ml-4 text-sm text-gray-600 mt-2">
                    <FaCouch />{' '}
                    {bus.seatType ? bus.seatType : 'Kursi Tidak Tersedia'}
                  </div>

                  {/* Facilities */}
                  <div className="flex items-center gap-2 ml-4 mt-3 text-sm text-gray-600">
                    <FaRegSnowflake />
                    {Array.isArray(bus.facilities) && bus.facilities.length > 0
                      ? bus.facilities.slice(0, 3).join(', ')
                      : 'Fasilitas Tidak Tersedia'}
                    {Array.isArray(bus.facilities) &&
                      bus.facilities.length > 3 &&
                      `, +${bus.facilities.length - 3} lainnya`}
                  </div>

                  {/* Button for details */}
                  <button
                    className="flex justify-center mx-auto mt-4 w-60 bg-[#1F2733] text-white py-2 rounded-lg hover:bg-gray-600 transition-colors duration-500 cursor-pointer uppercase"
                    onClick={() => navigate(`/bus/${bus.id}`)}
                  >
                    Detail Bus
                  </button>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            Tidak ada bus yang tersedia.
          </p>
        )}
      </div>

      {/* 🔵 Filter Kapasitas & Fasilitas */}
      <div className="w-85 md:bg-white p-6 shadow-md rounded-lg my-10 md:w-150 mx-auto lg:w-150">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filter Kapasitas */}
          <div className="relative">
            <h1 className="text-[#1F2733] mb-2">Kapasitas</h1>
            <select
              className="border border-gray-300 focus:outline-none p-2 pr-8 rounded-lg appearance-none w-full cursor-pointer"
              onChange={(e) =>
                setFilter({ ...filter, kapasitas: e.target.value })
              }
            >
              <option value="">Semua Kapasitas</option>
              <option value="under30">≤ 30 kursi</option>
              <option value="above30">≥ 30 kursi</option>
            </select>
            <IoIosArrowDown className="absolute right-3 top-11 text-gray-500 pointer-events-none" />
          </div>

          {/* Filter Fasilitas Multi-Select */}
          <div className="relative">
            <h1 className="text-[#1F2733] mb-2">Fasilitas</h1>
            <div
              className="border border-gray-300 p-2 rounded-lg w-full cursor-pointer"
              onClick={toggleFasilitasDropdown}
            >
              <span>
                {filter.fasilitas.length
                  ? filter.fasilitas.join(', ')
                  : 'Semua Fasilitas'}
              </span>
            </div>
            <IoIosArrowDown className="absolute right-3 top-11 text-gray-500 pointer-events-none" />

            {/* Dropdown List */}
            {showFacilitiesDropdown && (
              <div className="absolute mt-2 bg-white shadow-md rounded-lg w-full z-10 p-2">
                {['AC', 'Toilet', 'WiFi', 'Snack'].map((fasilitas) => (
                  <label
                    key={fasilitas}
                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#1F2733]"
                      checked={filter.fasilitas.includes(fasilitas)}
                      onChange={() => toggleFasilitas(fasilitas)}
                    />
                    <span className="text-gray-700">{fasilitas}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default BusLists;
