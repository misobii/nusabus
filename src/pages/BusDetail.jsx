import { useParams } from 'react-router-dom';
import busData from '../data/busData.json';
import FacilityIcon from '../data/facilitiesIcons';
import { FaFireExtinguisher } from 'react-icons/fa';
import { FaHammer } from 'react-icons/fa';
import Footer from '../components/Footer';

const safetyItems = [
  {
    icon: <FaFireExtinguisher className="text-gray-700 text-4xl" />,
    label: 'APAR',
  },
  {
    icon: <FaHammer className="text-gray-700 text-4xl" />,
    label: 'Palu Pemecah Kaca',
  },
];


const BusDetail = () => {
  const { id } = useParams();
  const selectedBus = busData.find((bus) => bus.id === parseInt(id));

  if (!selectedBus) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          Bus tidak ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Konten Utama */}
      <div className="w-full mx-auto p-6 mt-20 flex-grow">
        {/* Nama Bus */}
        <h1 className="text-2xl font-semibold mb-8 text-center text-gray-800 tracking-wide">
          {selectedBus.name}
        </h1>

        {/* Gambar Bus */}
        <div className="w-full md:bg-gray-100 flex items-center justify-center rounded-xl shadow-lg overflow-hidden h-60 md:w-150 md:mx-auto">
          <img
            src={selectedBus.image}
            alt={selectedBus.name}
            className="object-fill md:w-full h-full"
          />
        </div>

        {/* Fasilitas */}
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-lg text-gray-800 font-semibold mb-3 text-center">
            Fasilitas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 w-full max-w-md text-gray-800">
            {selectedBus.facilities.map((facility, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200"
              >
                <FacilityIcon facility={facility} />
                <p className="text-sm mt-2 text-gray-700">{facility}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Perlengkapan Keselamatan */}
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 text-center">
            Perlengkapan Keselamatan
          </h2>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {safetyItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200"
              >
                {item.icon}
                <p className="text-sm mt-2 text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer di Paling Bawah */}
      <Footer className="w-full" />
    </div>
  );
};

export default BusDetail;