import { FaTicketAlt, FaShieldAlt, FaHeadset } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section className="text-center py-40 px-6">
      <h2 className="text-2xl font-semibold mb-10 text-[#28313F]">
        Mengapa Memilih <span className='text-blue-600'>NusaBus?</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-20 max-w-7xl mx-auto pt-8">
        {/* Fitur 1 */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 1, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Start when 10% of element is in view
          transition={{ duration: 1 }}
        >
          <FaTicketAlt className="text-4xl text-[#28313F] mb-4" />
          <h3 className="text-lg font-semibold text-[#28313F]">
            Pemesanan Mudah
          </h3>
          <p className="text-gray-600">
            Proses pemesanan tiket yang cepat dan mudah melalui platform kami.
          </p>
        </motion.div>

        {/* Fitur 2 */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 1, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Start when 10% of element is in view
          transition={{ duration: 1 }}
        >
          <FaShieldAlt className="text-4xl text-[#28313F] mb-4" />
          <h3 className="text-lg font-semibold text-[#28313F]">
            Keamanan Terjamin
          </h3>
          <p className="text-gray-600">
            Sistem pembayaran yang aman dan terpercaya.
          </p>
        </motion.div>

        {/* Fitur 3 */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 1, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Start when 10% of element is in view
          transition={{ duration: 1 }}
        >
          <FaHeadset className="text-4xl text-[#28313F] mb-4" />
          <h3 className="text-lg font-semibold text-[#28313F]">Layanan 24/7</h3>
          <p className="text-gray-600">
            Dukungan pelanggan siap membantu Anda kapan saja.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
