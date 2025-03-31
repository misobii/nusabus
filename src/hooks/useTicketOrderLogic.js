import { useState, useEffect, useRef, useCallback } from 'react'; // Added useCallback
import { useLocation, useNavigate } from 'react-router-dom';
import busData from '../data/busData.json';
import terminalBus from '../data/busTerminal.json';
import useOrdererStore from '../store/useOrdererStore';

const useTicketOrderLogic = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  // Pre-filled data
  const isPreFilled =
    !!state &&
    (state.source === 'searchResults' || state.source === 'departureSchedule');
  const preFilledData = state || {};

  const normalizeValue = (value, defaultValue = '') =>
    value ? value.trim() : defaultValue;
  const normalizedBusType = preFilledData.busType
    ? preFilledData.busType.includes('Kelas')
      ? preFilledData.busType.replace('Kelas ', '')
      : preFilledData.busType
    : '';
  const normalizedOrigin = normalizeValue(preFilledData.origin);
  const normalizedDestination = normalizeValue(preFilledData.destination);
  const normalizedSchedule = normalizeValue(preFilledData.schedule);

  // Load initial state from localStorage with error handling
  let initialData = {};
  try {
    const savedData = localStorage.getItem('ticketOrderData');
    if (savedData) {
      initialData = JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error parsing ticketOrderData from localStorage:', error);
    localStorage.removeItem('ticketOrderData'); // Clear invalid data
    initialData = {};
  }

  // Form states
  const [origin, setOrigin] = useState(
    isPreFilled ? normalizedOrigin : initialData.origin || ''
  );
  const [destination, setDestination] = useState(
    isPreFilled ? normalizedDestination : initialData.destination || ''
  );
  const [date, setDate] = useState(
    isPreFilled ? preFilledData.date || '' : initialData.date || ''
  );
  const [busType, setBusType] = useState(
    isPreFilled ? normalizedBusType : initialData.busType || ''
  );
  const [busName, setBusName] = useState(
    isPreFilled
      ? normalizeValue(preFilledData.busName)
      : initialData.busName || ''
  );
  const [price, setPrice] = useState(
    isPreFilled ? preFilledData.price || 0 : initialData.price || 0
  );
  const [numPassengers, setNumPassengers] = useState(
    initialData.numPassengers || 1
  );
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [schedule, setSchedule] = useState(
    isPreFilled ? normalizedSchedule : initialData.schedule || ''
  );
  const [passengers, setPassengers] = useState(
    initialData.passengers ||
      Array.from({ length: initialData.numPassengers || 1 }, () => ({
        name: '',
        dob: '',
        sameAsOrderer: false,
      }))
  );
  const [step, setStep] = useState(initialData.step || 1);
  const [showPayment, setShowPayment] = useState(
    initialData.showPayment || false
  );
  const [paymentDone, setPaymentDone] = useState(
    initialData.paymentDone || false
  );
  const [selectedMethod, setSelectedMethod] = useState(
    initialData.selectedMethod || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [passengerErrors, setPassengerErrors] = useState(
    Array.from({ length: initialData.numPassengers || 1 }, () => ({
      name: '',
      dob: '',
    }))
  );

  // Zustand store for orderer fields
  const {
    ordererName,
    ordererPhone,
    ordererEmail,
    errors,
    setOrdererName,
    setOrdererPhone,
    setOrdererEmail,
    reset: resetOrdererStore,
    isValid,
  } = useOrdererStore();

  // Reset logic for manual orders (memoized with useCallback)
  const clearOrderData = useCallback(() => {
    localStorage.removeItem('ticketOrderData');
    setOrigin(isPreFilled ? normalizedOrigin : '');
    setDestination(isPreFilled ? normalizedDestination : '');
    setDate(isPreFilled ? preFilledData.date || '' : '');
    setBusType(isPreFilled ? normalizedBusType : '');
    setBusName(isPreFilled ? normalizeValue(preFilledData.busName) : '');
    setPrice(isPreFilled ? preFilledData.price || 0 : 0);
    setNumPassengers(1);
    setSchedule(isPreFilled ? normalizedSchedule : '');
    setAvailableSchedules([]);
    setPassengers([{ name: '', dob: '', sameAsOrderer: false }]);
    setStep(1);
    setShowPayment(false);
    setPaymentDone(false);
    setSelectedMethod('');
    resetOrdererStore(); // Fully reset the Zustand store
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isPreFilled,
    normalizedOrigin,
    normalizedDestination,
    preFilledData.date,
    normalizedBusType,
    normalizedSchedule,
    resetOrdererStore,
  ]);

  useEffect(() => {
    if (!isPreFilled && step === 1) {
      clearOrderData();
    }
  }, [isPreFilled, step, clearOrderData]);

  // Pre-fill logic
  useEffect(() => {
    if (isPreFilled && normalizedSchedule && schedule !== normalizedSchedule) {
      setOrigin(normalizedOrigin);
      setDestination(normalizedDestination);
      setDate(preFilledData.date || '');
      setBusType(normalizedBusType);
      setBusName(normalizeValue(preFilledData.busName));
      setPrice(preFilledData.price || 0);
      setSchedule(normalizedSchedule);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isPreFilled,
    normalizedSchedule,
    schedule,
    normalizedOrigin,
    normalizedDestination,
    normalizedBusType,
    preFilledData.date,
  ]);

  // Restore orderer fields from localStorage (run only once on mount)
  useEffect(() => {
    if (initialData.ordererName) setOrdererName(initialData.ordererName);
    if (initialData.ordererPhone) setOrdererPhone(initialData.ordererPhone);
    if (initialData.ordererEmail) setOrdererEmail(initialData.ordererEmail);
  }, [
    initialData.ordererName,
    initialData.ordererPhone,
    initialData.ordererEmail,
    setOrdererName,
    setOrdererPhone,
    setOrdererEmail,
  ]);

  // Persist state to localStorage with debounce
  const saveTimeout = useRef(null);
  useEffect(() => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      const orderData = {
        origin,
        destination,
        date,
        busType,
        busName,
        price,
        numPassengers,
        schedule,
        ordererName,
        ordererPhone,
        ordererEmail,
        passengers,
        step,
        showPayment,
        paymentDone,
        selectedMethod,
      };

      const currentData = localStorage.getItem('ticketOrderData');
      const newDataString = JSON.stringify(orderData);

      if (currentData !== newDataString) {
        localStorage.setItem('ticketOrderData', newDataString);
        console.log('Saved to localStorage:', orderData);
      }
    }, 2000); // 5-second debounce

    return () => clearTimeout(saveTimeout.current);
  }, [
    origin,
    destination,
    date,
    busType,
    busName,
    price,
    numPassengers,
    schedule,
    ordererName,
    ordererPhone,
    ordererEmail,
    passengers,
    step,
    showPayment,
    paymentDone,
    selectedMethod,
  ]);

  // Populate available schedules
  const [availableBuses, setAvailableBuses] = useState([]);
  useEffect(() => {
    if (!isPreFilled && origin && destination) {
      console.log('🔄 Memeriksa jadwal berdasarkan rute...');
      console.log('📌 Data pencarian:', { origin, destination });

      const matchingBuses = busData.filter((bus) =>
        bus.routes.some(
          (route) =>
            route.from.trim() === origin.trim() &&
            route.to.trim() === destination.trim()
        )
      );

      if (matchingBuses.length > 0) {
        const allSchedules = matchingBuses
          .flatMap((bus) =>
            bus.routes
              .filter(
                (route) =>
                  route.from.trim() === origin.trim() &&
                  route.to.trim() === destination.trim()
              )
              .flatMap((route) => route.schedule || [])
          )
          .filter((sched, index, self) => self.indexOf(sched) === index);
        console.log('✅ Bus ditemukan:', matchingBuses);
        console.log('📆 Jadwal yang tersedia:', allSchedules);
        setAvailableSchedules(allSchedules);
      } else {
        console.log('⚠ Tidak ada rute yang cocok.');
        setAvailableSchedules([]);
      }
    }
  }, [origin, destination, isPreFilled]);

  useEffect(() => {
    if (!isPreFilled && availableSchedules.length > 0 && !schedule) {
      setSchedule(availableSchedules[0]);
      console.log('📌 Auto-set schedule:', availableSchedules[0]);
    }
  }, [availableSchedules, isPreFilled, schedule]);

  useEffect(() => {
    if (origin && destination && busType) {
      const filteredBuses = busData.filter((bus) => {
        const hasMatchingRoute = bus.routes.some(
          (route) =>
            route.from.trim() === origin && route.to.trim() === destination
        );
        const normalizedBusTypeInData = bus.type
          ? bus.type.includes('Kelas')
            ? bus.type.replace('Kelas ', '').trim()
            : bus.type.trim()
          : '';
        return hasMatchingRoute && normalizedBusTypeInData === busType;
      });
      setAvailableBuses(filteredBuses);
      if (
        !isPreFilled &&
        !filteredBuses.some((bus) => bus.name.trim() === busName)
      ) {
        setBusName('');
        setPrice(0);
      }
    } else if (!isPreFilled) {
      setAvailableBuses([]);
      setBusName('');
      setPrice(0);
    }
  }, [origin, destination, busType, isPreFilled, busName]);

  useEffect(() => {
    if (busName && !isPreFilled) {
      const selectedBus = busData.find((bus) => bus.name.trim() === busName);
      if (selectedBus) setPrice(selectedBus.price);
    }
  }, [busName, isPreFilled]);

  useEffect(() => {
    if (passengers.length !== numPassengers) {
      const newPassengers = Array.from(
        { length: numPassengers },
        (_, index) =>
          passengers[index] || { name: '', dob: '', sameAsOrderer: false }
      );
      setPassengers(newPassengers);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPassengers, passengers.length]);

  // Cities and buses
  const cities = Object.keys(terminalBus).map((city) => city.trim());
  const dropdownCities = [...new Set([...cities, destination])].filter(
    (city) => city
  );
  const busClasses = ['First Class', 'Bisnis', 'Ekonomi'];
  const paymentOptions = [
    'Virtual Account',
    'Kartu Kredit/Debit',
    'E-Wallet',
    'Transfer Bank',
  ];

  // Validation functions for passengers
  const validatePassengerName = (name) => {
    if (!name) return 'Nama lengkap wajib diisi';
    if (name.length < 3) return 'Nama harus memiliki minimal 3 karakter';
    return '';
  };

  const validatePassengerDob = (dob) => {
    if (!dob) return 'Tanggal lahir wajib diisi';
    const today = new Date();
    const birthDate = new Date(dob);
    if (birthDate >= today) return 'Tanggal lahir harus di masa lalu';
    return '';
  };

  const updatePassengerErrors = (newPassengers) => {
    const newErrors = newPassengers.map((passenger) => ({
      name: validatePassengerName(passenger.name),
      dob: validatePassengerDob(passenger.dob),
    }));
    setPassengerErrors(newErrors);
  };

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) {
      alert('Harap perbaiki kesalahan pada formulir sebelum melanjutkan.');
      return;
    }
    if (!schedule) {
      alert('Harap pilih jadwal keberangkatan.');
      return;
    }
    const hasPassengerErrors = passengers.some((p) => !p.name.trim() || !p.dob);
    if (hasPassengerErrors) {
      alert('Harap isi semua detail penumpang dengan benar.');
      return;
    }
    setStep(2);
    setShowPayment(true);
  };

  const generateTicketId = () =>
    `TIKET-NB${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`;

  const getArrivalTime = (busName, origin, destination, schedule) => {
    const bus = busData.find((b) => b.name.trim() === busName.trim());
    if (!bus) return 'Tidak tersedia';

    const route = bus.routes.find(
      (r) =>
        r.from.trim() === origin.trim() && r.to.trim() === destination.trim()
    );
    if (!route || !route.schedule || !route.arrivalTimes)
      return 'Tidak tersedia';

    const scheduleIndex = route.schedule.indexOf(schedule);
    return scheduleIndex !== -1 && route.arrivalTimes[scheduleIndex]
      ? route.arrivalTimes[scheduleIndex]
      : 'Tidak tersedia';
  };

  const sendEmailWithTicket = async (ticketId) => {
    setIsLoading(true);
    const arrivalTime = getArrivalTime(busName, origin, destination, schedule);
    try {
      const response = await fetch('http://localhost:5000/send-ticket-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ordererName,
          ordererEmail,
          origin,
          destination,
          date,
          busName,
          numPassengers,
          price,
          ticketId,
          passengers,
          schedule,
          arrivalTime,
        }),
      });
      if (!response.ok) throw new Error('Failed to send e-ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentConfirmation = async () => {
    try {
      const ticketId = generateTicketId();
      await sendEmailWithTicket(ticketId);
      localStorage.setItem(
        'ticketOrderData',
        JSON.stringify({ ...initialData, paymentDone: true, ticketId })
      );
      setPaymentDone(true);
      setStep(3);
    } catch (error) {
      console.error('Error confirming payment:', error);
      alert('Terjadi kesalahan saat mengkonfirmasi pembayaran.');
      setIsLoading(false);
    }
  };

  const handleCancelPayment = () => {
    clearOrderData(); // Reset the form
    setShowPayment(false);
    setStep(1);
  };

  const handleBackToHome = () => {
    clearOrderData(); // Reset the form
    navigate('/');
  };

  return {
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
    setPrice,
    numPassengers,
    setNumPassengers,
    availableSchedules,
    setAvailableSchedules,
    schedule,
    setSchedule,
    passengers,
    setPassengers,
    step,
    setStep,
    showPayment,
    setShowPayment,
    paymentDone,
    setPaymentDone,
    selectedMethod,
    setSelectedMethod,
    isLoading,
    setIsLoading,
    passengerErrors,
    setPassengerErrors,
    availableBuses,
    setAvailableBuses,
    cities,
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
    isValid,
    updatePassengerErrors,
    handleSubmit,
    handlePaymentConfirmation,
    handleCancelPayment,
    handleBackToHome,
    clearOrderData, // Expose clearOrderData
  };
};

export default useTicketOrderLogic;
