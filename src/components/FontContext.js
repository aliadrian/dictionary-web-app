import React, { createContext, useContext, useState } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState('sans');

  const toggleFont = () => {
    setFontFamily((prevFont) => (prevFont === 'serif' ? 'sans' : 'serif'))
  }

  return (
    <FontContext.Provider value={{ fontFamily, toggleFont }}>
      {children}
    </FontContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}