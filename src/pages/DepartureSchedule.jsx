import { useState, useEffect, useCallback } from 'react';
import busData from '../data/busData.json';
import Footer from '../components/Footer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import BookingModal from '../components/BookingModal';

const DepartureSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('Semua Kota');
  const [schedule, setSchedule] = useState([]);

  // 🔵 State untuk Modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  const openModal = (busData) => {
    setSelectedBus(busData);
    setModalOpen(true);
  };
    
  const getRandomSeats = (maxSeats) =>
      Math.max(5, Math.floor(Math.random() * maxSeats));

  const getArrivalTime = (departureTime) => {
    const [hour, minute] = departureTime.split(':').map(Number);
    const travelDuration = Math.floor(Math.random() * 14) + 2; // 2 - 15 jam
    let arrivalHour = hour + travelDuration;

    if (arrivalHour >= 24) {
      arrivalHour -= 24; // Agar tetap dalam format 24 jam
    }

    const formattedArrivalHour = arrivalHour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    return `${formattedArrivalHour}:${formattedMinute}`;
  };

const generateSchedule = useCallback(() => {
  let newSchedule = [];

  busData.forEach((bus) => {
    if (Array.isArray(bus.routes)) {
      bus.routes.forEach((route) => {
        if (Array.isArray(route.schedule)) {
          route.schedule.forEach((departureTime) => {
            const cleanDepartureTime = departureTime.replace(' WIB', '');
            const arrivalTime = getArrivalTime(cleanDepartureTime);

            newSchedule.push({
              id: `${bus.id}-${route.from}-${route.to}-${departureTime}`,
              route: `${route.from} - ${route.to}`,
              departureTerminals: route.departureTerminals,
              arrivalTerminals: route.arrivalTerminals,
              time: `${departureTime} - ${arrivalTime} WIB`,
              busName: bus.name,
              availableSeats: getRandomSeats(bus.capacity),
              price: bus.price.toLocaleString('id-ID'),
              schedule: route.schedule,
            });
          });
        }
      });
    }
  });

  newSchedule = newSchedule.sort(() => Math.random() - 0.5);
  const randomCount = Math.floor(Math.random() * 4) + 2;

  setSchedule(newSchedule.slice(0, randomCount));
}, []);

  useEffect(() => {
    generateSchedule();
  }, [generateSchedule]); // 🚀 Panggil sekali saat komponen pertama kali dirender

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-full py-20 px-6">
        <h2 className="text-3xl font-semibold text-center text-[#1F2733] mt-6">
          Jadwal Keberangkatan Bus
        </h2>

        {/* 🔵 Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <input
            type="text"
            placeholder="Cari rute..."
            className="border border-gray-300 rounded-lg p-2 pl-4 w-full md:w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg p-2 w-full md:w-48 cursor-pointer focus:outline-none"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <option value="Semua Kota">Semua Kota</option>
            {Array.from(
              new Set(
                busData.flatMap((bus) =>
                  Array.isArray(bus.routes)
                    ? bus.routes.flatMap((route) => [route.from, route.to])
                    : []
                )
              )
            ).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* 🔵 Card Container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          {schedule
            .filter((item) => {
              // 🔍 Filter berdasarkan kota
              if (selectedRoute !== 'Semua Kota') {
                const isMatchingCity = item.route
                  .toLowerCase()
                  .includes(selectedRoute.toLowerCase());
                if (!isMatchingCity) return false;
              }

              // 🔍 Filter berdasarkan pencarian
              if (searchTerm) {
                const isMatchingSearch =
                  item.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.busName.toLowerCase().includes(searchTerm.toLowerCase());
                return isMatchingSearch;
              }

              return true; // Jika tidak ada filter, tampilkan semua
            })
            .map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-300 p-4 rounded-lg shadow-md text-center"
              >
                <h3 className="text-lg font-bold text-[#1F2733]">
                  {item.route}
                </h3>
                <p className="text-[#1F2733] mt-2">{item.time}</p>
                <p className="text-[#1F2733] font-semibold mt-2">
                  {item.busName}
                </p>

                {/* 🔵 Tombol untuk membuka modal */}
                <button
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-500 cursor-pointer mt-4 uppercase"
                  onClick={() => openModal(item)}
                >
                  Selengkapnya
                </button>
              </div>
            ))}

          {/* Jika tidak ada hasil pencarian */}
          {schedule.filter(
            (item) =>
              (selectedRoute === 'Semua Kota' ||
                item.route
                  .toLowerCase()
                  .includes(selectedRoute.toLowerCase())) &&
              (!searchTerm ||
                item.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.busName.toLowerCase().includes(searchTerm.toLowerCase()))
          ).length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              Tidak ada jadwal yang tersedia untuk pencarian ini.
            </p>
          )}
        </motion.div>
      </main>

      <Footer />

      {/* 🔵 Modal */}
      {isModalOpen && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          busData={selectedBus}
        />
      )}
    </div>
  );
};

export default DepartureSchedule;
