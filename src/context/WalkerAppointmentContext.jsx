import React, { createContext, useState, useContext, useEffect } from "react";

const WalkerAppointmentContext = createContext();

const STORAGE_KEY = "walker_booking_data";

const WalkerProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored
        ? JSON.parse(stored)
        : {
            petWalkerUid: null,
            petWalkerDayUid: null,
            slotUid: null,
            kycId: null,
            appointmentDate: null,
            petUid: null,
          };
    } catch {
      return {
        petWalkerUid: null,
        petWalkerDayUid: null,
        slotUid: null,
        kycId: null,
        appointmentDate: null,
        petUid: null,
      };
    }
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
  }, [bookingData]);

  const setWalkerBookingData = (data) => {
    setBookingData(data);
  };

  const clearBookingData = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setBookingData({
      petWalkerUid: null,
      petWalkerDayUid: null,
      slotUid: null,
      kycId: null,
      appointmentDate: null,
      petUid: null,
    });
  };

  const setPetWalkerUid = (petWalkerUid) => {
    setBookingData((prev) => ({
      ...prev,
      petWalkerUid,
    }));
  };

  const setPetWalkerDayUid = (petWalkerDayUid) => {
    setBookingData((prev) => ({
      ...prev,
      petWalkerDayUid,
    }));
  };

  const setSlotUid = (slotUid) => {
    setBookingData((prev) => ({
      ...prev,

      slotUid,
    }));
  };

  const setKycId = (kycId) => {
    setBookingData((prev) => ({
      ...prev,
      kycId,
    }));
  };

  const setAppointmentDate = (appointmentDate) => {
    setBookingData((prev) => ({
      ...prev,
      appointmentDate,
    }));
  };

  const setPetUid = (petUid) => {
    setBookingData((prev) => ({
      ...prev,
      petUid,
    }));
  };

  return (
    <WalkerAppointmentContext.Provider
      value={{
        setPetUid,
        setAppointmentDate,
        setKycId,
        setSlotUid,
        setPetWalkerDayUid,
        setPetWalkerUid,
        clearBookingData,
        setWalkerBookingData,
        bookingData,
      }}
    >
      {children}
    </WalkerAppointmentContext.Provider>
  );
};

export const useWalkerAppointment = () => useContext(WalkerAppointmentContext);

export default WalkerProvider;
