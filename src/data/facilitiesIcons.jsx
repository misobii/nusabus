import React from 'react';
import {
  FaWifi,
  FaTv,
  FaChargingStation,
  FaSmoking,
  FaToilet,
} from 'react-icons/fa';
import { MdAcUnit, MdFastfood, MdOutlineSportsBar } from 'react-icons/md';
import { PiMicrophoneStageDuotone } from 'react-icons/pi';
import { TbMassage } from 'react-icons/tb';

const facilitiesIcons = {
  'Full AC': MdAcUnit,
  'Toilet': FaToilet,
  'WiFi': FaWifi,
  'Snack': MdFastfood,
  'USB Charging': FaChargingStation,
  'TV': FaTv,
  'Smoking Area': FaSmoking,
  'Mini Bar': MdOutlineSportsBar,
  'Personal Entertainment': PiMicrophoneStageDuotone,
  'Massage Seat': TbMassage,
};

// Komponen untuk render ikon fasilitas
const FacilityIcon = ({ facility }) => {
  const IconComponent = facilitiesIcons[facility];
  return IconComponent ? <IconComponent className="text-3xl" /> : '❓';
};

export default FacilityIcon;
