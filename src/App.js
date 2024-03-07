import React, { useState, useEffect } from 'react';
import "./index.css"
import "./output.css"
import { IconMoon } from './components/Icons'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useFont } from './components/FontContext'
import ToggleSwitch from './components/ToggleSwitch'
import Dropdown from './components/Dropdown'
import Filter from './components/Filter'
import BookLogo from './assets/svg/book_logo.svg'
import dictionaryService from './services/dictionaryService'

const getSystemColorScheme = () => window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';

const App = () => {
  const storedTheme = localStorage.getItem('theme')
  const defaultTheme = storedTheme || getSystemColorScheme();
  const { fontFamily } = useFont();
  const [theme, setTheme] = useState(defaultTheme);
  const icon = theme === 'dark' ? IconMoon : IconMoon;
  const [userInput, setUserInput] = useState('');
  const [dictionaryData, setDictionaryData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (userInput) => {
    try {
      const data = await dictionaryService.getAll(userInput);
      setDictionaryData(data);
      setError(null);
      return data;
    } catch (error) {
      setDictionaryData(null);
      setError('Error fetching data. Please try again.');
      console.error('Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  let fontClass;
  if (fontFamily === 'serif') {
    fontClass = 'serif-font';
  } else if (fontFamily === 'sans') {
    fontClass = 'sans-font';
  } else if (fontFamily === 'mono') {
    fontClass = 'mono-font';
  }

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme);
  }

  return (
    <Router>
      <div className={`App ${theme === 'dark' ? 'dark' : ''} ${fontClass} bg-white dark:bg-darkBg transition-colors duration-1000`}>
        <nav className="bg-white dark:bg-darkElement ">
          <div className="max-w-screen-2xl mx-auto py-6 items-center">
            <div className="flex justify-between items-center dark:text-white sm:px-20 px-10">
              <Link to="/" className="md:text-2xl text-lg font-bold">
                <img src={BookLogo} alt="Book logo" />
              </Link>
              <div className="flex items-center pl-6 gap-4 divide-x divide-darkGray">
                <Dropdown />
                <div className='flex items-center gap-4 pl-6'>
                  <ToggleSwitch onToggle={switchTheme} />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={"none"}
                    xmlns="http://www.w3.org/2000/svg"
                    stroke={theme === "dark" ? "	#a845ef" : "#858585"}
                    strokeWidth={icon.strokeWidth || "0"}
                  >
                    <path d={icon.path} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-screen-2xl mx-auto dark:bg-darkBg sm:px-20 px-10">
          <Filter handleSearch={handleSearch} />
          {error && <p>{error}</p>}
          {dictionaryData && (
            <div>
              <h2>{dictionaryData[0].word}</h2>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
