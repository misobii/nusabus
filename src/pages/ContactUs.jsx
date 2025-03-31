import axios from 'axios';
import Footer from '../components/Footer';
import useContactStore from '../store/useContactStore';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Typewriter from 'typewriter-effect';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ContactUs = () => {
  const {
    name,
    email,
    message,
    nameError,
    emailError,
    messageError,
    isSending,
    successMessage,
    errorMessage,
    setName,
    setEmail,
    setMessage,
    setIsSending,
    setSuccessMessage,
    setErrorMessage,
    resetForm,
  } = useContactStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    if (
      nameError ||
      emailError ||
      messageError ||
      !name ||
      !email ||
      !message
    ) {
      setErrorMessage('Mohon isi semua field dengan benar.');
      setIsSending(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/send-email', {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setSuccessMessage('Email berhasil dikirim!');
        resetForm();
        
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);

      } else {
        setErrorMessage('Gagal mengirim email, coba lagi.');
      }
    } catch (error) {
      setErrorMessage('Terjadi kesalahan saat mengirim email.');
      console.error(error);
    } finally {
      setIsSending(false);

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-11">
      {/* Container Utama */}
      <div className="w-full flex justify-center items-center px-4 sm:px-10 py-20 md:py-60">
        <div className="w-full max-w-screen-lg flex flex-col md:flex-row md:items-center justify-center mx-auto">
          {/* Bagian Kiri - Teks */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left mt-3 md:mt-5 md:mr-6">
            <h2 className="text-3xl mb-2 font-bold text-gray-800">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      'Kontak <span style="color: #1D4ED8;">NusaBus</span>'
                    )
                    .pauseFor(100)
                    .callFunction(() => {
                      document.querySelector(
                        '.Typewriter__cursor'
                      ).style.display = 'none';
                    })
                    .start();
                }}
                options={{
                  autoStart: true,
                  loop: false,
                  delay: 100,
                  cursor: '|',
                }}
              />
            </h2>
            <motion.p
              className="mt-2 mb-4 text-gray-600"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              Jika ada pertanyaan atau masukan, silakan kirimkan pesan melalui
              form atau sosial media.
            </motion.p>
            <motion.div
              className="flex gap-4 mb-8"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              <a href="#" className="text-gray-800 text-2xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-800 text-2xl">
                <FaXTwitter />
              </a>
              <a href="#" className="text-gray-800 text-2xl">
                <FaInstagram />
              </a>
            </motion.div>
          </div>

          {/* Container Form */}
          <div className="bg-white w-full max-w-2xl mx-auto rounded-lg shadow-[0px_0px_20px_rgba(0,0,0,0.25)] flex flex-col md:flex-row gap-4 p-6">
            {/* Bagian Kanan - Form */}
            <div className="w-full md:w-full p-8 flex flex-col justify-center bg-gray-50 rounded-r-lg">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Input Nama */}
                <div>
                  <label className="text-sm text-gray-600 font-medium block uppercase mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm mt-1">{nameError}</p>
                  )}
                </div>

                {/* Input Email */}
                <div>
                  <label className="text-sm text-gray-600 font-medium block uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                {/* Input Pesan */}
                <div>
                  <label className="text-sm text-gray-600 font-medium block uppercase mb-2">
                    Pesan
                  </label>
                  <textarea
                    placeholder="Masukkan pesan Anda"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none resize-none h-24"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  {messageError && (
                    <p className="text-red-500 text-sm mt-1">{messageError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full p-2 mt-4 text-white rounded-md transition ${
                    isSending
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                  }`}
                >
                  {isSending ? 'Mengirim...' : 'Kirim Pesan'}
                </button>

                {/* Pesan Sukses/Error */}
                {successMessage && (
                  <p className="text-blue-600 text-left mt-2">
                    {successMessage}
                  </p>
                )}
                {errorMessage && (
                  <p className="text-blue-600 text-left mt-2">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer di Bagian Bawah */}
      <Footer className="w-full" />
    </div>
  );
};

export default ContactUs;
