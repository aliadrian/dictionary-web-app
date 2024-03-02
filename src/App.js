import React, { useState, useEffect } from 'react';
import "./index.css"
import "./output.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon as fasFaMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as farFaMoon } from '@fortawesome/free-regular-svg-icons';
import { faBook as book } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const getSystemColorScheme = () => window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';

const App = () => {
  const storedTheme = localStorage.getItem('theme')
  const defaultTheme = storedTheme || getSystemColorScheme();
  const [theme, setTheme] = useState(defaultTheme);

  const swtichTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Router>
      <div className={`App ${theme === 'dark' ? 'dark' : ''}} bg-white dark:bg-darkBg`}>
        <nav className="shadow-lg bg-white dark:bg-darkElement ">
          <div className="max-w-screen-2xl mx-auto py-6 items-center">
            <div className="flex justify-between  dark:text-white sm:px-20 px-10">
              <Link to="/" className="md:text-2xl text-lg font-bold"><FontAwesomeIcon icon={book} /></Link>
              <button className="flex items-center gap-2 md:gap-4" onClick={swtichTheme}>
                <FontAwesomeIcon icon={theme === 'dark' ? fasFaMoon : farFaMoon} />
                <span className="md:text-xl">Dark Mode</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;
