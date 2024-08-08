// // contexts/UserContext.js
// "use client"
// import React, { createContext, useState } from 'react';

// // Create a context object
// export const UserContext = createContext();

// // Create a provider component
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Initialize state

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// contexts/UserContext.js

// "use client"

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This effect runs only on the client side
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

