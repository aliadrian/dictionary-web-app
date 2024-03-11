import React from 'react'
import ToggleSwitch from './ToggleSwitch'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom';
import BookLogo from '../assets/svg/book_logo.svg'

const Navbar = ({ switchTheme, theme, icon }) => {
  return (
    <nav>
      <div className="max-w-2xl mx-auto py-6 items-center relative">
        <div className="flex justify-between items-center dark:text-white">
          <Link to="/" className="sm:text-2xl text-lg font-bold">
            <img src={BookLogo} alt="Book logo" />
          </Link>
          <div className="flex items-center xl:pl-6 xl:gap-4 divide-x divide-gray">
            <Dropdown />
            <div className='flex items-center gap-2 pl-4 xl:gap-4 xl:pl-6'>
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
  )
}

export default Navbar