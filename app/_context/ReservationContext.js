"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
    const resetRange = () => {
        setRange(initialState);
      };
  const [range, setRange] = useState(initialState);
  return (
    <ReservationContext.Provider value={{ setRange, range ,resetRange}}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context Was ued outside provider");
  return context;
}
export { ReservationProvider, useReservation };
