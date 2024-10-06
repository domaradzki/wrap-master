"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {}

const AppContext = createContext<AppContextType | undefined>({});

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
