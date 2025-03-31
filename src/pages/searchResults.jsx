import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import busData from '../data/busData.json';
import { FaSnowflake, FaWifi, FaUtensils } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!origin || !destination) return;

    const filteredBuses = busData
      .map((bus) => {
        const matchingRoutes = bus.routes.filter(
          (route) => route.from === origin && route.to === destination
        );
        return matchingRoutes.length > 0
          ? { ...bus, routes: matchingRoutes }
          : null;
      })
      .filter((bus) => bus !== null);

    setResults(filteredBuses); // No need for groupedBuses or earliestTime; use raw filtered data
  }, [origin, destination]);

  const formattedDate = date
    ? new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const getRandomSeats = (maxSeats) =>
    Math.max(5, Math.floor(Math.random() * maxSeats));

  const handleOrderTicket = (bus) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    // Use the first schedule from the matching route
    const route = bus.routes[0];
    const schedule = route.schedule[0]; // First departure time

    navigate('/bus/pesan-tiket', {
      state: {
        origin: origin,
        destination: destination,
        date: tomorrowDate,
        busType: bus.type,
        busName: bus.name,
        price: bus.price,
        schedule: schedule, // Pass the actual schedule
        source: 'searchResults',
      },
    });
  };

  return (
    <div className="p-4 mt-20">
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
        Jadwal: {origin} ke {destination}
        {formattedDate && (
          <>
            <br /> pada {formattedDate}
          </>
        )}
      </h2>
      {results.length === 0 ? (
        <p className="text-gray-700 text-center">
          Tidak ada jadwal yang ditemukan untuk rute ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
          {results.map((bus) => {
            const route = bus.routes[0];
            const departureTime = route.schedule[0]; // First schedule
            const arrivalTime = route.arrivalTimes[0]; // Corresponding arrival
            return (
              <div
                key={`${bus.id}`}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold md:text-lg text-gray-700">
                      {bus.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {bus.type}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    {getRandomSeats(bus.capacity)} kursi tersisa
                  </p>
                </div>

                <div className="mt-2">
                  <div className="flex items-center">
                    <span className="text-gray-700 text-sm font-semibold w-14 md:text-lg">
                      {departureTime}
                    </span>
                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-2"></div>
                    <span className="text-xs text-gray-600 md:text-sm">
                      {route.departureTerminals[0]} ({origin})
                    </span>
                  </div>

                  <div className="flex">
                    <span className="text-gray-800 pl-1 pt-1 md:pt-1 ml-2 mb-1">
                      <IoIosArrowDown />
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-700 text-sm font-semibold w-14 md:text-lg">
                      {arrivalTime}
                    </span>
                    <div className="w-3 h-3 bg-gray-400 rounded-full mx-2"></div>
                    <span className="text-xs text-gray-600 md:text-sm">
                      {route.arrivalTerminals[0]} ({destination})
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 text-gray-600">
                  {bus.facilities.includes('Full AC') && <FaSnowflake />}
                  {bus.facilities.includes('WiFi') && <FaWifi />}
                  {bus.facilities.includes('Snack') && <FaUtensils />}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-blue-600 font-semibold text-sm md:text-lg">
                    IDR {bus.price.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-gray-500 md:text-sm">
                      /kursi
                    </span>
                  </p>
                  <button
                    onClick={() => handleOrderTicket(bus)}
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition duration-300 text-sm md:px-6 md:py-2 cursor-pointer"
                  >
                    Pesan Tiket
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
