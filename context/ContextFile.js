"use client"
import React, { createContext, useState } from 'react';

// Creating the UserContext
export const UserContext = createContext();

// Creating a provider for UserContext
 export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

   const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
