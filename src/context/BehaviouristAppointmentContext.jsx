import React, { useContext, useState, createContext, useEffect } from "react";

const behaviouristAppointmnetContext = createContext();

const STORAGE_KEY = "behaviourist_booking_data";

const BehaviouristProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored
        ? JSON.parse(stored)
        : {
            petUid: null,
            serviceProviderUid: null,
            behaviouristDayUid: null,
            slotUid: null,
            appointmentDate: null,
            notes: null,
            kycId: null,
          };
    } catch {
      return {
        petUid: null,
        serviceProviderUid: null,
        behaviouristDayUid: null,
        slotUid: null,
        appointmentDate: null,
        notes: null,
        kycId: null,
      };
    }
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
  }, [bookingData]);

  const setBehaviouristBookingData = (data) => {
    setBookingData(data);
  };

  const clearBookingData = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setBookingData({
      petUid: null,
      serviceProviderUid: null,
      behaviouristDayUid: null,
      slotUid: null,
      appointmentDate: null,
      notes: null,
      kycId: null,
    });
  };

  const setPetuid = (petUid) => {
    setBookingData((prev) => ({
      ...prev,
      petUid,
    }));
  };

  const setServiceProviderUid = (serviceProviderUid) => {
    setBookingData((prev) => ({
      ...prev,
      serviceProviderUid,
    }));
  };

  const setBehaviouristDayUid = (behaviouristDayUid) => {
    setBookingData((prev) => ({
      ...prev,
      behaviouristDayUid,
    }));
  };

  const setSlotUid = (slotUid) => {
    setBookingData((prev) => ({
      ...prev,
      slotUid,
    }));
  };

  const setAppointmentData = (appointmentDate) => {
    setBookingData((prev) => ({
      ...prev,
      appointmentDate,
    }));
  };

  const setKycId = (kycId) => {
    setBookingData((prev) => ({
      ...prev,
      kycId,
    }));
  };

  return (
    <behaviouristAppointmnetContext.Provider
      value={{
        setKycId,
        setAppointmentData,
        setSlotUid,
        setBehaviouristDayUid,
        setPetuid,
        setServiceProviderUid,
        clearBookingData,
        setBehaviouristBookingData,
        bookingData,
      }}
    >
      {children}
    </behaviouristAppointmnetContext.Provider>
  );
};

export const useBehaviouristAppointment = () =>
  useContext(behaviouristAppointmnetContext);

export default BehaviouristProvider;
