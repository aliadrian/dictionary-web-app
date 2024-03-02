import React, { useState, useEffect } from 'react';
import "./index.css"
import "./output.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconMoon, IconSun, IconBook } from './components/Icons'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ToggleSwitch from './components/ToggleSwitch'
import Dropdown from './components/Dropdown'
import { BookOpenIcon } from '@heroicons/react/20/solid';

const getSystemColorScheme = () => window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';

const App = () => {
  const storedTheme = localStorage.getItem('theme')
  const defaultTheme = storedTheme || getSystemColorScheme();
  const [theme, setTheme] = useState(defaultTheme);
  const icon = theme === 'dark' ? IconMoon : IconSun;
  const iconBook = IconBook;

  const switchTheme = () => {
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
      <div className={`App ${theme === 'dark' ? 'dark' : ''} bg-white dark:bg-darkBg`}>
        <nav className="shadow-lg bg-white dark:bg-darkElement ">
          <div className="max-w-screen-2xl mx-auto py-6 items-center">
            <div className="flex justify-between items-center dark:text-white sm:px-20 px-10">
              <Link to="/" className="md:text-2xl text-lg font-bold"><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={icon.fill || "none"}
                xmlns="http://www.w3.org/2000/svg"
                stroke={icon.stroke || "none"}
                strokeWidth={icon.strokeWidth || "0"}
              >
                <path d={iconBook.path} />
              </svg></Link>
              <div className="flex items-center pl-6 gap-4 divide-x divide-darkGray">
                <Dropdown />
                <div className='flex items-center gap-4 pl-6'>
                  <ToggleSwitch onToggle={switchTheme} />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={icon.fill || "none"}
                    xmlns="http://www.w3.org/2000/svg"
                    stroke={icon.stroke || "none"}
                    strokeWidth={icon.strokeWidth || "0"}
                  >
                    <path d={icon.path} />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;
