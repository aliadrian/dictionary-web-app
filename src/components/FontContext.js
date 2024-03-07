import React, { createContext, useContext, useState } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState('sans');

  const toggleFont = (newFont) => {
    setFontFamily(newFont);

    document.body.classList.remove('sans-font', 'serif-font', 'mono-font');

    if (newFont === 'sans') {
      document.body.classList.add('sans-font');
    } else if (newFont === 'serif') {
      document.body.classList.add('serif-font');
    } else if (newFont === 'mono') {
      document.body.classList.add('mono-font');
    }
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