import React, { useState, useEffect } from 'react';
import "./index.css"
import "./output.css"
import { IconMoon } from './components/Icons'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ToggleSwitch from './components/ToggleSwitch'
import Dropdown from './components/Dropdown'
import { useFont } from './components/FontContext'
import BookLogo from './assets/svg/book_logo.svg'

const getSystemColorScheme = () => window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';

const App = () => {
  const storedTheme = localStorage.getItem('theme')
  const defaultTheme = storedTheme || getSystemColorScheme();
  const { fontFamily } = useFont();
  const [theme, setTheme] = useState(defaultTheme);
  const icon = theme === 'dark' ? IconMoon : IconMoon;

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

  const handleWordChange = (e) => {
    const nameFilter = e.target.value.toLowerCase();
    setshowFilter(nameFilter);
    setFilterValue(nameFilter);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Router>
      <div className={`App ${theme === 'dark' ? 'dark' : ''} ${fontClass} bg-white dark:bg-darkBg`}>
        <nav className="shadow-lg bg-white dark:bg-darkElement ">
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
                    stroke={theme == "dark" ? "	#a845ef" : "#858585"}
                    strokeWidth={icon.strokeWidth || "0"}
                  >
                    <path d={icon.path} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <p>Some text</p>
      </div>
    </Router>
  );
}

export default App;
