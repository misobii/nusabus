import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaBusAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#1f2733] text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-y-5 md:grid-cols-4 tracking-wide">
        {/* Logo & Deskripsi */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span><FaBusAlt /></span>NusaBus
          </h2>
          <p className="text-gray-400 mt-3 mr-4">
            Solusi perjalanan bus terbaik untuk Anda
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="/" className="hover:text-white transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/tentang-kami" className="hover:text-white transition-colors duration-300">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="/kontak" className="hover:text-white transition-colors duration-300">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Layanan */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Layanan</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="/bus/daftar-bus" className="hover:text-white transition-colors duration-300">
                Daftar Bus
              </a>
            </li>
            <li>
              <a href="/bus/jadwal" className="hover:text-white transition-colors duration-300">
                Jadwal Keberangkatan
              </a>
            </li>
            <li>
              <a href="/bus/pesan-tiket" className="hover:text-white transition-colors duration-300">
                Pesan Tiket
              </a>
            </li>
          </ul>
        </div>

        {/* Hubungi Kami */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Hubungi Kami</h3>
          <ul className="text-gray-400 space-y-2">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +62 123 4567 890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@nusabus.com
            </li>
          </ul>

          {/* Sosial Media */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-500 text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-500 text-xl">
              <FaXTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-500 text-xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 text-center text-gray-400 text-sm mt-6 pt-4 max-w-[300px] mx-auto md:max-w-[600px]">
        © 2025 NusaBus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
