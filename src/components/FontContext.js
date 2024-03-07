import React, { createContext, useContext, useEffect, useState } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const storedFontFamily = localStorage.getItem('selectedFont') || 'sans';
  const [fontFamily, setFontFamily] = useState(storedFontFamily);

  useEffect(() => {
    localStorage.setItem('selectedFont', fontFamily)
  })

  const toggleFont = (newFont) => {
    setFontFamily(newFont);
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