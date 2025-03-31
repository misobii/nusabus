import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { FaCity } from 'react-icons/fa';
import { PiPark } from 'react-icons/pi';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import busTerminal from '../data/busTerminal.json';
import busData from '../data/busData.json';

const getPopularCities = (buses) => {
  const cityCount = {};
  buses.forEach((bus) => {
    if (!Array.isArray(bus.routes)) return;
    bus.routes.forEach((route) => {
      if (!route.from || !route.to) return;
      cityCount[route.from] = (cityCount[route.from] || 0) + 1;
      cityCount[route.to] = (cityCount[route.to] || 0) + 1;
    });
  });
  return Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([city]) => city);
};

// New helper function to map terminal to city
const getCityFromTerminal = (selection) => {
  for (const [city, terminals] of Object.entries(busTerminal)) {
    if (terminals.includes(selection) || city === selection) {
      return city;
    }
  }
  return selection; // Fallback if no match (shouldn't happen with valid data)
};

const SearchBar = () => {
  const navigate = useNavigate();
  const popularCities = getPopularCities(busData);

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [modalType, setModalType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerminalsByCity, setFilteredTerminalsByCity] = useState({});

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === '') {
      setFilteredTerminalsByCity({});
      return;
    }

    const groupedResults = {};
    Object.entries(busTerminal).forEach(([city, terminals]) => {
      const matchedTerminals = terminals.filter((terminal) =>
        terminal.toLowerCase().includes(searchValue)
      );
      if (
        city.toLowerCase().includes(searchValue) ||
        matchedTerminals.length > 0
      ) {
        groupedResults[city] = matchedTerminals;
      }
    });
    setFilteredTerminalsByCity(groupedResults);
  };

  const handleSelectCity = (selection) => {
    const city = getCityFromTerminal(selection); // Convert terminal to city if needed
    if (modalType === 'origin') {
      setOrigin(city);
    } else if (modalType === 'destination') {
      setDestination(city);
    }
    setModalType(null);
  };

  const handleSearchTickets = () => {
    if (!origin || !destination || origin === destination) return;

    const queryParams = new URLSearchParams({
      origin,
      destination,
      date,
    }).toString();

    navigate(`/search-results?${queryParams}`);
  };

  return (
    <motion.div
      className="bg-white shadow-xl p-6 rounded-lg flex flex-col md:flex-row items-center max-w-[350px] mx-auto -mt-30 relative md:max-w-[700px] lg:max-w-[1200px] lg:mt-4"
      initial={{ opacity: 1, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col w-full my-8 md:w-1/3 mx-4 pt-8 relative">
        <label className="text-gray-600 text-sm mb-1">Dari</label>
        <div
          className="border border-gray-700 p-3 rounded-md w-full text-gray-700 cursor-pointer bg-white"
          onClick={() => setModalType('origin')}
        >
          {origin || 'Kota Asal'}
        </div>
      </div>

      <div className="flex flex-col w-full -my-10 md:w-1/3 pt-8 relative">
        <label className="text-gray-600 text-sm mb-1">Ke</label>
        <div
          className={`border border-gray-700 p-3 rounded-md w-full cursor-pointer bg-white ${
            !origin ? 'text-gray-700 cursor-not-allowed' : 'text-gray-700'
          }`}
          onClick={() => origin && setModalType('destination')}
        >
          {destination || 'Kota Tujuan'}
        </div>
      </div>

      <div className="flex flex-col w-full md:w-1/3 my-10 mx-4 pt-8 relative">
        <label className="text-gray-600 text-sm mb-1">Tanggal</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-700 p-3 rounded-md w-full text-gray-700 focus:outline-none"
        />
      </div>

      <button
        className={`bg-gray-900 text-white p-3 h-[50px] w-full md:w-50 rounded-md flex items-center justify-center gap-2 mt-14 mr-4 cursor-pointer hover:bg-gray-600 transition duration-300 ${
          !origin || !destination || origin === destination
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
        disabled={!origin || !destination || origin === destination}
        onClick={handleSearchTickets}
      >
        <FaSearch />
        Cari Tiket
      </button>

      {modalType && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={() => setModalType(null)}
        >
          <div
            className="bg-white w-[90%] max-w-md rounded-lg p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 p-4 mb-3">
              <h2 className="font-semibold text-[#28313F] -mx-3 md:text-lg">
                Pilih{' '}
                {modalType === 'origin'
                  ? 'Lokasi Keberangkatan'
                  : 'Lokasi Tujuan'}
              </h2>
              <IoClose
                className="text-2xl cursor-pointer text-gray-700 md:text-4xl"
                onClick={() => setModalType(null)}
              />
            </div>

            <div className="relative mb-8">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-sm" />
              <input
                type="text"
                placeholder="Masukkan nama lokasi atau terminal."
                className="p-2 pl-10 rounded-md w-full text-sm focus:outline-none md:text-lg"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {!searchTerm && (
              <div className="mb-12">
                <h3 className="font-semibold text-gray-700 mb-4 lg:text-lg">
                  Kota Populer
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {popularCities.map((city, index) => (
                    <button
                      key={index}
                      className="p-2 border text-gray-700 border-gray-300 rounded-full hover:bg-gray-300 transition-colors duration-400 cursor-pointer"
                      onClick={() => handleSelectCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(filteredTerminalsByCity).length > 0 && (
              <div className="max-h-[300px] overflow-y-auto lg:max-h-[700px]">
                {Object.entries(filteredTerminalsByCity).map(
                  ([city, terminals]) => (
                    <div key={city} className="mb-4">
                      <h4 className="text-gray-900 font-semibold flex justify-between items-center">
                        <span className="flex gap-x-2 items-center">
                          <FaCity /> {city}
                        </span>
                        <span className="text-sm font-normal pr-8">Kota</span>
                      </h4>
                      <ul className="bg-white rounded-md mt-2">
                        {terminals.map((terminal, index) => (
                          <li
                            key={index}
                            className="flex gap-x-2 items-center p-2 pl-6 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                            onClick={() => handleSelectCity(terminal)}
                          >
                            <PiPark /> {terminal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SearchBar;
