import React, { useState, useEffect } from 'react';
import dictionaryService from '../services/dictionaryService'
import { IconSearch } from './Icons';

const Filter = ({ handleSearch }) => {
  const [userInput, setUserInput] = useState('');
  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wordData, setWordData] = useState('')

  const placeholderText = 'Search for a word...';
  const icon = IconSearch;

  // useEffect(() => {
  //   const performSearch = async () => {
  //     if (userInput.trim() === '') {
  //       setLocalError('Please enter a valid word.')
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       await handleSearch(userInput);
  //       setLocalError(null)
  //     } catch (error) {
  //       setLocalError('Error fetching data. Please try again.');
  //       console.error('Error', error)
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (userInput.trim() !== '') {
  //     performSearch();
  //   }
  // }, [userInput, handleSearch]);

  const handleSearchButtonClick = async () => {
    if (userInput.trim() === '') {
      setLocalError('Please enter a valid word.');
      return;
    }

    try {
      setLoading(true);
      const data = await handleSearch(userInput);
      console.log('API Response:', data); // Add this line

      if (data && data.length > 0 && data[0].meanings) {
        setWordData(data[0]);

        data[0].meanings.forEach((meaning, index) => {
          console.log(`Meaning ${index + 1}: ${meaning.partOfSpeech}`)
          meaning.definitions.forEach((definition, defIndex) => {
            console.log(` Definition ${defIndex + 1}: ${definition.definition}`)
          })
          console.log('\n')
        });
        setLocalError(null);
      } else {
        setLocalError('No data found for the given word.');
      }
    } catch (error) {
      setLocalError('Error fetching data. Please try again.')
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value.toLowerCase());
  }

  return (
    <div className="grid dark:text-white">
      <div className="relative">
        <input
          type="text"
          value={userInput}
          className="w-full pl-20 md:pr-36 md:pl-24 lg:pr-72 py-6 dark:bg-darkElement"
          placeholder={placeholderText}
          onChange={handleInputChange}
        />
        <div className="absolute top-6 pl-8 md:pl-8">
          <buttton onClick={handleSearchButtonClick} className="w-36 h-48 z-10"><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke={icon.stroke || 'none'}
            strokeWidth={icon.strokeWidth || '0'}
            className="text-gray-500"
          >
            <path d={icon.path} />
          </svg>Search</buttton>

          {loading && <p>Loading...</p>}
          {localError && <p>{localError}</p>}
        </div>
      </div>

    </div>
  );
};

export default Filter;