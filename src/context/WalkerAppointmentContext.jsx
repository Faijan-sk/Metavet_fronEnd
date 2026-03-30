import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "walker_appointment_data";

const WalkerAppointmentContext = createContext(null);

// Helper to rehydrate date strings back to Date objects
const rehydrate = (data) => {
  if (!data) return null;
  return {
    ...data,
    selectedDate: data.selectedDate ? new Date(data.selectedDate) : null,
  };
};

export const WalkerAppointmentProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    // On first render, try to load from sessionStorage
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw
        ? rehydrate(JSON.parse(raw))
        : {
            walkerInfo: null,
            selectedDate: null,
            walkerDayUid: null,
            selectedSlot: null,
            selectedPet: null,
          };
    } catch {
      return {
        walkerInfo: null,
        selectedDate: null,
        walkerDayUid: null,
        selectedSlot: null,
        selectedPet: null,
      };
    }
  });

  // Keep sessionStorage in sync whenever state changes
  useEffect(() => {
    if (state.walkerInfo) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  const saveAppointmentData = ({ walkerInfo, date, dayUid, slot, pet }) => {
    setState({
      walkerInfo,
      selectedDate: date,
      walkerDayUid: dayUid,
      selectedSlot: slot,
      selectedPet: pet,
    });
  };

  const clearAppointmentData = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setState({
      walkerInfo: null,
      selectedDate: null,
      walkerDayUid: null,
      selectedSlot: null,
      selectedPet: null,
    });
  };

  return (
    <WalkerAppointmentContext.Provider
      value={{
        ...state,
        saveAppointmentData,
        clearAppointmentData,
      }}
    >
      {children}
    </WalkerAppointmentContext.Provider>
  );
};

export const useWalkerAppointment = () => {
  const ctx = useContext(WalkerAppointmentContext);
  if (!ctx) {
    throw new Error(
      "useWalkerAppointment must be used inside WalkerAppointmentProvider",
    );
  }
  return ctx;
};

export default WalkerAppointmentContext;

// import React, { createContext, useState, useContext, Children } from "react";

// const walkerAppointmentContext = createContext();

// const walekrProvider = ({ Children }) => {
//   const [bookingData, setBookingData] = useState({});
// };
