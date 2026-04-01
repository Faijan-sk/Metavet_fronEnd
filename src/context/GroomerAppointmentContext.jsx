import React, { createContext, useContext, useEffect, useState } from "react";

const GroomerAppointmentContext = createContext();

const STORAGE_KEY = "groomer_booking_data";

const GroomerProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored
        ? JSON.parse(stored)
        : {
            petUid: null,
            serviceProviderUid: null,
            appointmentDate: null,
            startTime: null,
            serviceUid: null,
            // notes : null ,
            platForm: null,
            kycId: null,
          };
    } catch {
      return {
        petUid: null,
        serviceProviderUid: null,
        appointmentDate: null,
        startTime: null,
        serviceUid: null,
        // notes : null ,
        platForm: null,
        kycId: null,
      };
    }
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
  }, [bookingData]);

  const setGroomerBookingData = (data) => {
    setBookingData(data);
  };

  const clearBookingData = () => {
    sessionStorage.removeItem(STORAGE_KEY);

    setBookingData({
      petUid: null,
      serviceProviderUid: null,
      appointmentDate: null,
      startTime: null,
      serviceUid: null,
      // notes : null ,
      platForm: null,
      kycId: null,
    });
  };

  const setPetUid = (petUid) => {
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

  const setAppointmentData = (appointmentDate) => {
    setBookingData((prev) => ({
      ...prev,
      appointmentDate,
    }));
  };

  const setServicetime = (startTime) => {
    setBookingData((prev) => ({
      ...prev,
      startTime,
    }));
  };

  const setSerivceUid = (serviceUid) => {
    setBookingData((prev) => ({
      ...prev,
      serviceUid,
    }));
  };

  const setKycId = (kycId) => {
    setBookingData((prev) => ({
      ...prev,
      kycId,
    }));
  };

  return (
    <GroomerAppointmentContext.Provider
      value={{
        setKycId,
        setSerivceUid,
        setServicetime,
        setAppointmentData,
        setServiceProviderUid,
        setPetUid,
        clearBookingData,
        setGroomerBookingData,
        bookingData,
      }}
    >
      {children}
    </GroomerAppointmentContext.Provider>
  );
};

export const useGroomerAppointment = () =>
  useContext(GroomerAppointmentContext);

export default GroomerProvider;
