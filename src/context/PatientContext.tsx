import React, { createContext, useState } from "react";

interface PatientType {
  name?: string;
  phone?: string;
  token?: string;
}

export const PatientContext = createContext<any>(null);

export const PatientProvider = ({ children }: any) => {
  const [patient, setPatient] = useState<PatientType | null>(null);

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};
