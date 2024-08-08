// SharedStateContext.js
import React, { createContext, useState, useContext } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState('Initial Value');

  return (
    <SharedStateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};
