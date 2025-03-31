import BusImage from "../assets/images/hero-bus.png"
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const Hero = () => {

  const hideCursorWithRetry = (retries = 10, delay = 100) => {
    const cursor = document.querySelector('.Typewriter__cursor');
    if (cursor) {
      cursor.style.display = 'none';
      console.log('Cursor hidden successfully');
    } else if (retries > 0) {
      console.warn(`Cursor not found, retrying... (${retries} attempts left)`);
      setTimeout(() => hideCursorWithRetry(retries - 1, delay), delay);
    } else {
      console.error('Failed to find Typewriter cursor after all retries');
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center px-6 mt-10 md:px-12 lg:px-18 py-20 md:py-32 gap-x-10">
      <div className="max-w-lg">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-[#28313F]">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  'Perjalanan nyaman dengan <span style="color: #1D4ED8;">NusaBus</span>'
                )
                .pauseFor(100)
                .callFunction(() => {
                  // Delay hiding the cursor to ensure the DOM is updated
                  setTimeout(() => {
                    hideCursorWithRetry(10, 100); // Retry up to 10 times, 100ms delay between retries
                  }, 50); // Initial delay to allow DOM rendering
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
          className="text-gray-600 mb-6"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          Pesan tiket bus dengan mudah dan cepat. Nikmati perjalanan yang aman
          dan nyaman ke berbagai destinasi.
        </motion.p>
      </div>
      <motion.div
        className="w-full md:w-[700px] h-[250px] md:flex items-center lg:ml-75 rounded-2xl"
        initial={{ opacity: 1, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <img src={BusImage} alt="Bus" className="object-cover" />
      </motion.div>
    </section>
  );
};

export default Hero;
