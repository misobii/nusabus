import aboutBusImg from '../assets/images/about-bus.png';
import { FaArrowRightLong } from 'react-icons/fa6';
import Footer from '../components/Footer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Bagian Konten */}
      <main className="flex-grow flex items-center justify-center bg-gray-100 px-6 py-40">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-12">
          {/* Bagian Kiri (Teks) */}
          <div className="md:w-1/2 text-center md:text-left">
            <motion.h2
              className="text-lg text-gray-500 uppercase tracking-wide"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Tentang Kami
            </motion.h2>
            <h1 className="text-4xl font-bold text-[#28313F] mt-4 leading-normal">
            <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString('<span style="color: #1D4ED8;">NusaBus</span>, Layanan Pemesanan Bus Terbaik')
                .pauseFor(100)
                .callFunction(() => {
                  document.querySelector('.Typewriter__cursor').style.display = 'none';
                })
                .start();
            }}
            options={{
              autoStart: true,
              loop: false,
              delay: 75,
              cursor: '|',
            }}
          />
            </h1>
            <motion.p
              className="text-lg text-[#28313F] mt-4"
              initial={{ opacity: 1, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-blue-600">NusaBus</span> menyediakan
              pemesanan tiket bus online yang mudah, cepat, dan aman. Dengan
              berbagai pilihan bus, kami memastikan pengalaman perjalanan
              terbaik bagi pelanggan kami.
            </motion.p>
          </div>

          {/* Bagian Kanan (Gambar) */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 1, x: 800 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-[350px] md:w-[650px]">
              <img
                src={aboutBusImg}
                alt="Bus"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer tetap di bawah */}
      <Footer />
    </div>
  );
};

export default About;
