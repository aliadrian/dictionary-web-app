import React from 'react';
import dictionaryService from '../services/dictionaryService'
import { IconSearch } from './Icons';

const Filter = ({ handleSearch, handleInputChange }) => {
  const placeholderText = 'Search for a word...';
  const icon = IconSearch;

  const handleInputClick = () => {
    handleInputChange({ target: { value: '' } });
  };

  return (
    <div className="grid dark:text-white">
      <div className="relative">
        <input
          type="text"
          value={handleSearch}
          className="xl:w-11/12 w-full pl-20 md:pr-36 md:pl-24 lg:pr-72 shadow-lg py-6 dark:bg-darkElement"
          placeholder={placeholderText}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        <div className="absolute top-6 pl-8 md:pl-8">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={"none"}
            xmlns="http://www.w3.org/2000/svg"
            stroke={theme == "dark" ? "	#a845ef" : "#858585"}
            strokeWidth={icon.strokeWidth || "0"}
            className="text-gray-500"
          >
            <path d={icon.path} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Filter;