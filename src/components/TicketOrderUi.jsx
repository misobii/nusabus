// TicketOrderUI.js
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { IoIosCheckmarkCircle } from 'react-icons/io';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const TicketOrderUI = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  date,
  setDate,
  busType,
  setBusType,
  busName,
  setBusName,
  price,
  numPassengers,
  setNumPassengers,
  availableSchedules,
  schedule,
  setSchedule,
  passengers,
  setPassengers,
  step,
  showPayment,
  paymentDone,
  selectedMethod,
  setSelectedMethod,
  isLoading,
  passengerErrors,
  availableBuses,
  dropdownCities,
  busClasses,
  paymentOptions,
  isPreFilled,
  ordererName,
  setOrdererName,
  ordererPhone,
  setOrdererPhone,
  ordererEmail,
  setOrdererEmail,
  errors,
  updatePassengerErrors,
  handleSubmit,
  handlePaymentConfirmation,
  handleCancelPayment,
  handleBackToHome,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Progress Indicator */}
      <div className="max-w-6xl mx-auto -mb-6 mt-20">
        <div className="flex md:flex-row items-center justify-between relative">
          <div className="flex-1 text-center">
            <span
              className={`inline-block w-7 h-7 rounded-full ${
                step >= 1
                  ? 'bg-blue-600 text-white pt-1'
                  : 'bg-gray-300 text-gray-600 pt-1'
              }`}
            >
              1
            </span>
            <p
              className={`mt-2 ${
                step >= 1 ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              Pemesanan
            </p>
          </div>
          <div className="flex-1 h-0.5 -mt-6 bg-gray-300 my-2 md:my-0">
            <div
              className={`h-full bg-blue-600 transition-all duration-500 ${
                step >= 2 ? 'w-full' : 'w-0'
              }`}
            ></div>
          </div>
          <div className="flex-1 text-center">
            <span
              className={`inline-block w-7 h-7 rounded-full ${
                step >= 2
                  ? 'bg-blue-600 text-white pt-1'
                  : 'bg-gray-300 text-gray-600 pt-1'
              }`}
            >
              2
            </span>
            <p
              className={`mt-2 ${
                step >= 2 ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              Pembayaran
            </p>
          </div>
          <div className="flex-1 h-0.5 -mt-6 bg-gray-300 my-2 md:my-0">
            <div
              className={`h-full bg-blue-600 transition-all duration-500 ${
                step >= 3 ? 'w-full' : 'w-0'
              }`}
            ></div>
          </div>
          <div className="flex-1 text-center">
            <span
              className={`inline-block w-7 h-7 rounded-full ${
                step >= 3
                  ? 'bg-blue-600 text-white pt-1'
                  : 'bg-gray-300 text-gray-600 pt-1'
              }`}
            >
              3
            </span>
            <p
              className={`mt-2 ${
                step >= 3 ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              Konfirmasi
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {!showPayment ? (
          <div className="flex-1 bg-white p-6 mt-10 md:mt-20 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Detail Pemesan
            </h2>
            <p className="text-sm text-gray-600 mb-4 -mt-3 ml-1">
              Detail kontak ini akan digunakan untuk pengiriman e-tiket dan
              keperluan reschedule.
            </p>
            <div className="flex flex-col gap-4 mb-4">
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={ordererName}
                onChange={(e) => setOrdererName(e.target.value)}
                className={`flex-1 border border-gray-300 rounded-xl p-3 placeholder-gray-400 focus:outline-blue-500 ${
                  errors.ordererName ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.ordererName && (
                <p className="text-red-500 text-sm -mt-2 ml-2">
                  {errors.ordererName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nomor Telepon (contoh: 08123456789 atau 628123456789)"
                value={ordererPhone}
                onChange={(e) => setOrdererPhone(e.target.value)}
                className={`w-full border border-gray-300 rounded-xl p-3 placeholder-gray-400 focus:outline-blue-500 ${
                  errors.ordererPhone ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.ordererPhone && (
                <p className="text-red-500 text-sm mt-2 ml-2">
                  {errors.ordererPhone}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Alamat Email"
                value={ordererEmail}
                onChange={(e) => setOrdererEmail(e.target.value)}
                className={`w-full border border-gray-300 rounded-xl p-3 placeholder-gray-400 focus:outline-blue-500 ${
                  errors.ordererEmail ? 'border-red-500' : ''
                }`}
                required
              />
              {errors.ordererEmail && (
                <p className="text-red-500 text-sm mt-2 ml-2">
                  {errors.ordererEmail}
                </p>
              )}
            </div>

            <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-6">
              Detail Perjalanan
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Kota Asal
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                disabled={isPreFilled}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500 appearance-none"
              >
                <option value="">Pilih Kota Asal</option>
                {dropdownCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Kota Tujuan
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                disabled={isPreFilled}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500 appearance-none"
              >
                <option value="">Pilih Kota Tujuan</option>
                {dropdownCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Tanggal Keberangkatan
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isPreFilled}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Jadwal Keberangkatan
              </label>

              {isPreFilled ? (
                <input
                  type="text"
                  value={schedule || 'Jadwal tidak tersedia'}
                  readOnly
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500"
                />
              ) : (
                <select
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500 appearance-none"
                >
                  <option value="">Pilih Jadwal</option>
                  {availableSchedules.length > 0 ? (
                    availableSchedules.map((sched, index) => (
                      <option key={index} value={sched}>
                        {sched}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      ⚠ Jadwal tidak tersedia
                    </option>
                  )}
                </select>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Jumlah Penumpang
              </label>
              <input
                type="number"
                min="1"
                value={numPassengers}
                onChange={(e) =>
                  setNumPassengers(parseInt(e.target.value) || 1)
                }
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Kelas Bus
              </label>
              <select
                value={busType}
                onChange={(e) => setBusType(e.target.value)}
                disabled={isPreFilled}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500 appearance-none cursor-pointer"
              >
                <option value="">Pilih Kelas Bus</option>
                {busClasses.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Bus</label>
              <select
                value={busName}
                onChange={(e) => setBusName(e.target.value)}
                disabled={isPreFilled}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500 appearance-none cursor-pointer"
              >
                <option value="">Pilih Bus</option>
                {availableBuses.length > 0 ? (
                  availableBuses.map((bus) => (
                    <option key={bus.id} value={bus.name}>
                      {bus.name}
                    </option>
                  ))
                ) : busName ? (
                  <option value={busName}>{busName}</option>
                ) : null}
              </select>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-6 text-gray-800">
              Detail Penumpang
            </h2>
            <p className="text-sm text-gray-600 mb-4 -mt-3">
              Pastikan untuk mengisi detail penumpang dengan benar agar
              perjalananmu lancar.
            </p>
            {passengers.map((passenger, index) => (
              <div key={index} className="mb-6 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Penumpang {index + 1}
                </h3>
                <div className="flex flex-col gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={passenger.name}
                      onChange={(e) => {
                        const newPassengers = [...passengers];
                        newPassengers[index].name = e.target.value;
                        setPassengers(newPassengers);
                        updatePassengerErrors(newPassengers);
                      }}
                      disabled={passenger.sameAsOrderer}
                      className={`w-full border border-gray-300 rounded-xl p-3 placeholder-gray-400 focus:outline-blue-500 ${
                        passengerErrors[index]?.name ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {passengerErrors[index]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {passengerErrors[index].name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-3">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={passenger.dob}
                    onChange={(e) => {
                      const newPassengers = [...passengers];
                      newPassengers[index].dob = e.target.value;
                      setPassengers(newPassengers);
                      updatePassengerErrors(newPassengers);
                    }}
                    className={`w-full border border-gray-300 rounded-xl p-3 focus:outline-blue-500 ${
                      passengerErrors[index]?.dob ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {passengerErrors[index]?.dob && (
                    <p className="text-red-500 text-sm mt-1">
                      {passengerErrors[index].dob}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 bg-white p-6 mt-10 md:mt-20 rounded-lg shadow-md">
            {!paymentDone ? (
              <>
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  Konfirmasi Pembayaran
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Transaksi cepat dan aman, bebas biaya.
                </p>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Details
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-sm">Tanggal</span>
                    <span className="text-sm font-medium">
                      {new Date(date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rute</span>
                    <span className="text-sm font-medium">
                      {origin} - {destination}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bus</span>
                    <span className="text-sm font-medium">{busName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Jadwal</span>
                    <span className="text-sm font-medium">{schedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Jumlah Penumpang</span>
                    <span className="text-sm font-medium">{numPassengers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Nama Pemesan</span>
                    <span className="text-sm font-medium">{ordererName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Email</span>
                    <span className="text-sm font-medium">{ordererEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Metode Pembayaran</span>
                    <span className="text-sm font-medium">
                      <select
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="border border-gray-300 rounded-md p-1 w-50 focus:outline-blue-500 text-right appearance-none cursor-pointer"
                      >
                        <option value="">Pilih</option>
                        {paymentOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between">
                    <span className="text-sm font-semibold">Total Harga</span>
                    <span className="text-sm font-semibold">
                      IDR {(price * numPassengers).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCancelPayment}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 cursor-pointer"
                  >
                    Batalkan Pembayaran
                  </button>
                  <button
                    onClick={handlePaymentConfirmation}
                    disabled={!selectedMethod || isLoading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                  >
                    {isLoading ? (
                      <ClipLoader color="#ffffff" size={20} />
                    ) : (
                      'Konfirmasi Pembayaran'
                    )}
                  </button>
                </div>
              </>
            ) : (
              <motion.div
                className="text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 300 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-semibold text-blue-500 animate-fadeIn">
                  Pembayaran Berhasil!
                </h2>
                <div className="text-[300px] text-blue-500">
                  <IoIosCheckmarkCircle />
                </div>
                <p className="text-gray-600 mt-4">
                  E-tiket telah dikirim ke {ordererEmail}.
                </p>
                <div className="flex gap-4 mt-6">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-500 cursor-pointer text-center"
                    onClick={handleBackToHome}
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {!showPayment && (
          <div className="w-full lg:w-80 mt-10 md:mt-20 bg-white p-6 rounded-lg shadow-md h-1/2">
            <h2 className="text-xl font-semibold mb-4 text-blue-500">
              Ringkasan Pemesanan
            </h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Rute</p>
              <p className="font-medium text-blue-500">
                {origin && destination
                  ? `${origin} - ${destination}`
                  : 'Tidak Ada'}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Tanggal</p>
              <p className="font-medium text-blue-500">
                {date
                  ? new Date(date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Tidak Ada'}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Jadwal</p>
              <p className="font-medium text-blue-500">
                {schedule || 'Tidak Ada'}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Kelas Bus</p>
              <p className="font-medium text-blue-500">
                {busType || 'Tidak Ada'}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Nama Bus</p>
              <p className="font-medium text-blue-500">
                {busName || 'Tidak Ada'}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Jumlah Penumpang</p>
              <p className="font-medium text-blue-500">{numPassengers}</p>
            </div>
            <div className="border-t text-gray-300 pt-4">
              <p className="text-sm text-gray-500">Total Harga</p>
              <p className="text-xl font-semibold text-blue-500">
                IDR {(price * numPassengers).toLocaleString('id-ID')}
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 cursor-pointer hover:bg-blue-700 transition-colors duration-500"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketOrderUI;
