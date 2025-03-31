// BookingModal.jsx
import { IoClose } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import busDataJson from '../data/busData.json';
import { useState } from 'react';

const BookingModal = ({ isOpen, onClose, busData }) => {
  const navigate = useNavigate();
  const [selectedSchedule, setSelectedSchedule] = useState(
    busData?.schedule?.[0] || ''
  );

  if (!isOpen || !busData) return null;

  const handleOrderTicket = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    const [origin, destination] = busData.route.split(' - ');

    // Find the bus in busData.json to get the correct type
    const busDetails = busDataJson.find(
      (bus) => bus.name === busData.busName
    ) || {
      name: busData.busName,
      type: busData.busName.includes('First Class')
        ? 'First Class'
        : busData.busName.includes('Bisnis')
        ? 'Bisnis'
        : busData.busName.includes('Ekonomi')
        ? 'Ekonomi'
        : 'Ekonomi', // Default to Ekonomi if no match
      price: parseInt(busData.price.replace(/[^0-9]/g, '')),
    };

    // Normalize busType
    const normalizedBusType = busDetails.type.includes('Kelas')
      ? busDetails.type.replace('Kelas ', '')
      : busDetails.type;

    navigate('/bus/pesan-tiket', {
      state: {
        origin: origin,
        destination: destination,
        date: tomorrowDate,
        busType: normalizedBusType,
        busName: busDetails.name,
        price: busDetails.price,
        source: 'departureSchedule',
        schedule: selectedSchedule || busData.schedule[0]
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white h-150 mt-115 w-full max-w-4xl p-6 rounded-lg shadow-lg relative md:w-150 md:h-80 md:mb-150 lg:w-full">
        <button
          className="absolute top-4 right-6 text-4xl text-gray-500 cursor-pointer"
          onClick={onClose}
        >
          <IoClose />
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          Pilih Jadwal Keberangkatan
        </h2>

        <div className="pb-4 mb-4">
          <p className="text-lg font-medium">{busData?.busName}</p>
          <p className="text-sm text-gray-500">
            {busData?.busName.includes('First Class')
              ? 'First Class'
              : busData?.busName.includes('Bisnis')
              ? 'Bisnis'
              : 'Ekonomi'}
          </p>
        </div>

        <div className="mb-4">
          <p className="font-medium">Jadwal Tersedia:</p>
          <select
            className="w-full p-2 border rounded mt-2 border-gray-400 focus:outline-none appearance-none pr-8 cursor-pointer"
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
          >
            {Array.isArray(busData?.schedule) && busData.schedule.length > 0 ? (
              busData.schedule.map((jadwal, index) => (
                <option key={index} value={jadwal}>
                  {jadwal}
                </option>
              ))
            ) : (
              <option disabled>Tidak ada jadwal</option>
            )}
          </select>
          <div className="absolute right-10 top-40 transform translate-y-5 items-center pointer-events-none text-xl md:-translate-y-3">
            <IoIosArrowDown />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(`/bus/${busData.id}`)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors duration-500 text-white rounded cursor-pointer"
          >
            Informasi Bus
          </button>
          <button
            onClick={handleOrderTicket}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors duration-500 text-white rounded cursor-pointer"
          >
            Pesan Tiket
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
