import React, { useState, useEffect, useCallback } from 'react';
import { IconSearch } from './Icons';

const Filter = ({ handleSearch }) => {
  const [userInput, setUserInput] = useState('');
  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [wordData, setWordData] = useState('');
  const [enterPressed, setEnterPressed] = useState(false);

  const handleInputClick = () => {
    handleInputChange({ target: { value: '' } });
  };

  const placeholderText = 'Search for a word...';
  const iconSearch = IconSearch;

  const handleSearchButtonClick = useCallback(async () => {
    if (userInput.trim() === '') {
      setLocalError('Please enter a valid word.');
      return;
    }

    try {
      setLoading(true);
      const data = await handleSearch(userInput);
      console.log('API Response:', data);

      if (data && data.length > 0 && data[0].meanings) {
        setWordData(data[0]);

        data[0].meanings.forEach((meaning, index) => {
          // console.log(`Meaning ${index + 1}: ${meaning.partOfSpeech}`)
          meaning.definitions.forEach((definition, defIndex) => {
            // console.log(` Definition ${defIndex + 1}: ${definition.definition}`)
          })
          // console.log('\n')
        });
        setLocalError(null);
      } else {
        setLocalError('No data found for the given word.');
      }
    } catch (error) {
      setLocalError("Couldn't find the word. Please try again.")
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [userInput, handleSearch, setLocalError, setLoading, setWordData]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value.toLowerCase());
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEnterPressed(true);
    }
  }

  useEffect(() => {
    if (enterPressed) {
      handleSearchButtonClick();
      setEnterPressed(false);
    }
  }, [enterPressed, handleSearchButtonClick])

  return (
    <div className=" dark:text-white">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={userInput}
          className="w-full pl-4 lg:pr-72 py-4 dark:bg-darkerGray bg-lightGray transition-colors duration-500 rounded-2xl outline-none font-bold placeholder:font-normal"
          placeholder={placeholderText}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center justify-center rounded-full bg-purple w-14 sm:h-12 h-11 hover:cursor-pointer active:cursor-pointer focus:cursor-pointer">
          <button onClick={handleSearchButtonClick}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke={iconSearch.stroke || '#ffffff'}
              strokeWidth={iconSearch.strokeWidth}
            >
              <path d={iconSearch.path} />
            </svg>
          </button>
        </div>
      </div>
      {loading && <div role="status">
        <svg aria-hidden="true" className="absolute inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600 mt-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className='absolute ml-10 mt-3'>Loading...</span>
      </div>}

      {<p className='pt-8'>{localError}</p>}
    </div>
  );
};

export default Filter;