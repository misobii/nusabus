import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { FaBusAlt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBusOpen, setIsBusOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed -top-1 left-0 right-0 bg-white shadow-md z-[50] md:top-0 w-full lg:top-0">
      <div className="flex justify-between items-center p-4 mx-5 md:mx-14">
        <div className="flex items-center text-[#28313F] text-2xl gap-x-2 font-semibold">
          <Link to="/" onClick={closeMenu}>
            <FaBusAlt />
          </Link>
          <Link to="/" onClick={closeMenu}>
            <h2 className="font-medium">Nusa<span className='text-blue-600'>Bus</span></h2>
          </Link>
        </div>

        <ul className="hidden md:flex gap-x-7 text-[#28313F] font-medium">
          <Link
            to="/"
            onClick={closeMenu}
            className={`transition-colors duration-500 ${
              location.pathname === '/'
                ? 'text-blue-600'
                : 'hover:text-blue-600'
            }`}
          >
            Home
          </Link>

          <li
            className="relative cursor-pointer dropdown-bus"
            onClick={() => setIsBusOpen(!isBusOpen)}
            ref={dropdownRef}
          >
            <span
              className={`flex items-center gap-x-1 transition-colors duration-500 ${
                location.pathname.startsWith('/bus')
                  ? 'text-blue-600'
                  : 'hover:text-blue-600'
              }`}
            >
              Bus <IoIosArrowDown />
            </span>

            <AnimatePresence>
              {isBusOpen && (
                <motion.ul
                  className="absolute left-0 top-full mt-2 min-w-[160px] bg-white shadow-lg rounded-md"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <li>
                    <Link
                      to="/bus/daftar-bus"
                      className={`block px-4 py-2 transition-colors duration-500 whitespace-nowrap ${
                        location.pathname === '/bus/daftar-bus'
                          ? 'text-blue-600'
                          : 'hover:text-blue-600'
                      }`}
                    >
                      Daftar Bus
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bus/jadwal"
                      className={`block px-4 py-2 transition-colors duration-500 whitespace-nowrap ${
                        location.pathname === '/bus/jadwal'
                          ? 'text-blue-600'
                          : 'hover:text-blue-600'
                      }`}
                    >
                      Jadwal Keberangkatan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bus/pesan-tiket" // Updated to match route
                      className={`block px-4 py-2 transition-colors duration-500 whitespace-nowrap ${
                        location.pathname === '/bus/pesan-tiket'
                          ? 'text-blue-600'
                          : 'hover:text-blue-600'
                      }`}
                    >
                      Pesan Tiket
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <Link
            to="/tentang-kami"
            className={`transition-colors duration-500 ${
              location.pathname === '/tentang-kami'
                ? 'text-blue-600'
                : 'hover:text-blue-600'
            }`}
          >
            Tentang Kami
          </Link>
          <Link
            to="/kontak"
            className={`transition-colors duration-500 ${
              location.pathname === '/kontak'
                ? 'text-blue-600'
                : 'hover:text-blue-600'
            }`}
          >
            Kontak
          </Link>
        </ul>

        <div className="fixed top-3 right-6 z-[60] md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="fixed top-[59px] left-0 w-full flex flex-col items-center justify-center space-y-6 bg-white text-gray-900 text-center shadow-xl rounded-b-3xl py-6 z-[50]"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className={`transition-colors duration-500 ${
                location.pathname === '/'
                  ? 'text-blue-600'
                  : 'hover:text-blue-600'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/bus/daftar-bus"
              className={`transition-colors duration-500 ${
                location.pathname === '/bus/daftar-bus'
                  ? 'text-blue-600'
                  : 'hover:text-blue-600'
              }`}
              onClick={closeMenu}
            >
              Daftar Bus
            </Link>
            <Link
              to="/bus/jadwal"
              className={`transition-colors duration-500 ${
                location.pathname === '/bus/jadwal'
                  ? 'text-blue-600'
                  : 'hover:text-blue-600'
              }`}
              onClick={closeMenu}
            >
              Jadwal Keberangkatan
            </Link>
            <Link
              to="/bus/pesan-tiket" // Updated to match route
              className={`transition-colors duration-500 ${
                location.pathname === '/bus/pesan-tiket'
                  ? 'text-blue-600'
                  : 'hover:text-blue-600'
              }`}
              onClick={closeMenu}
            >
              Pesan Tiket
            </Link>
            <Link
              to="/tentang-kami"
              className={`transition-colors duration-500 ${
                location.pathname === '/tentang-kami'
                  ? 'text-blue-600'
                  : 'hover:text-blue-600'
              }`}
              onClick={closeMenu}
            >
              Tentang Kami
            </Link>
            <Link
              to="/kontak"
              className={`transition-colors duration-500 ${
                location.pathname === '/kontak'
                  ? 'text-blue-600'
                  : 'hover:text-blue-600'
              }`}
              onClick={closeMenu}
            >
              Kontak
            </Link>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
