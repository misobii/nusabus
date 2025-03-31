// TicketOrder.jsx
import React, { useEffect } from 'react';
import useTicketOrderLogic from '../hooks/useTicketOrderLogic';
import TicketOrderUi from '../components/TicketOrderUi';
import { useLocation } from 'react-router-dom';

const TicketOrder = () => {
  const logic = useTicketOrderLogic();
  const { clearOrderData, step } = logic;
  const location = useLocation();

  // Reset form when navigating away after payment confirmation (Step 3)
  useEffect(() => {
    return () => {
      if (step === 3 && typeof clearOrderData === 'function') {
        clearOrderData();
      }
    };
  }, [step, clearOrderData, location.pathname]); // Dependencies

  return <TicketOrderUi {...logic} />;
};

export default TicketOrder;
