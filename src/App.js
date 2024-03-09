import React, { useState, useEffect } from 'react';
import "./index.css"
import "./output.css"
import { IconMoon, IconPlay } from './components/Icons'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useFont } from './components/FontContext'
import ToggleSwitch from './components/ToggleSwitch'
import Dropdown from './components/Dropdown'
import Filter from './components/Filter'
import BookLogo from './assets/svg/book_logo.svg'
import PlayIcon from './assets/svg/play_icon.svg'
import dictionaryService from './services/dictionaryService'
import AudioError from './assets/audio/no_audio.mp3'

const getSystemColorScheme = () => window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';

const App = () => {
  const storedTheme = localStorage.getItem('theme')
  const defaultTheme = storedTheme || getSystemColorScheme();
  const { fontFamily } = useFont();
  const [theme, setTheme] = useState(defaultTheme);
  const icon = theme === 'dark' ? IconMoon : IconMoon;
  const playIcon = IconPlay;
  const [dictionaryData, setDictionaryData] = useState(null);
  const [error, setError] = useState(null);
  const { word, phonetic, meanings, sourceUrls } = dictionaryData?.[0] ?? {}
  const [audioUrl, setAudioUrl] = useState(null);

  console.log(sourceUrls)

  const handleSearch = async (userInput) => {
    try {
      const data = await dictionaryService.getAll(userInput);
      setDictionaryData(data);
      setError(null);

      const audioUrl = findPronunciationAudioUrl(data)
      console.log(`Audio URL: ${audioUrl}`);
      setAudioUrl(audioUrl)
      console.log(data)
      return data;
    } catch (error) {
      setDictionaryData(null);
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


  function findPronunciationAudioUrl(data) {
    if (Array.isArray(data)) {
      for (const entry of data) {
        if (entry && typeof entry === 'object' && entry.phonetics && Array.isArray(entry.phonetics) && entry.phonetics.length > 0) {
          // Find the American accent audio ("-us.mp3")
          const usPhonetic = entry.phonetics.find(phonetic => phonetic.audio && phonetic.audio.toLowerCase().includes('-us.mp3'));

          // If an American accent audio is found, return it
          if (usPhonetic && usPhonetic.audio) {
            return usPhonetic.audio;
          }

          // If no American accent audio is found, find any audio with ".mp3" extension
          const anyPhonetic = entry.phonetics.find(phonetic => phonetic.audio && phonetic.audio.toLowerCase().endsWith('.mp3'));

          // If any audio with ".mp3" extension is found, return it
          if (anyPhonetic && anyPhonetic.audio) {
            return anyPhonetic.audio;
          }

          // If no valid audio is found, return the imported audio
          return AudioError;
        }
      }
    }
    return null;
  }


  let audio = new Audio(audioUrl);

  const start = () => {
    audio.play();
  }

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme);
  }

  return (
    <Router>
      <div className={`App ${theme === 'dark' ? 'dark' : ''} ${fontClass} min-h-dvh dark:bg-black transition-colors duration-500 px-6`}>
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
        <div className="max-w-2xl mx-auto dark:text-white pb-10">
          <Filter handleSearch={handleSearch} />
          {error && <p>{error}</p>}
          {dictionaryData && (
            <div>
              <div className='flex justify-between items-center pt-8'>
                <div>
                  <h2 className="text-3xl sm:text-7xl font-bold text-mildBlack dark:text-white">{word}</h2>
                  <p className='text-xl sm:text-2xl text-purple font-medium sm:pt-4'>{phonetic}</p>
                </div>
                <div>
                  <button className="flex items-center justify-center rounded-full w-[3rem] h-[3rem] sm:h-[4.5rem] sm:w-[4.5rem] bg-lightPurple hover:cursor-pointer active:cursor-pointer focus:cursor-pointer dark:bg-darkPurple transition-colors duration-500" onClick={start}>
                    <img src={PlayIcon} className="rotate-180 w-4 h-4 sm:w-6 sm:h-6" alt="Play audio" />
                  </button>
                </div>
              </div>
              {meanings &&
                meanings.map((meaning, index) => (
                  <div className='text-mildBlack dark:text-white' key={index}>
                    <ul>
                      <div className='flex items-center py-8'>
                        <div>
                          <strong className='mr-4 text-xl text-mildBlack dark:text-white italic whitespace-nowrap'>{meaning.partOfSpeech}</strong>
                        </div>
                        <div className='w-full text-gray dark:text-darkerGray transition-colors duration-500'>
                          <hr />
                        </div>
                      </div>
                      <p className='text-darkGray pb-4'>Meaning</p>
                      <div className='px-6'>
                        <ul className="marker:text-purple list-disc list-outside">
                          {meaning.definitions.map((definition, subIndex) => (
                            <li className='pb-4' key={subIndex}>
                              {definition.definition}
                              {definition.example && <li className='marker:!text-white dark:marker:!text-black text-darkGray pt-1'>"{definition.example}"</li>}
                            </li>
                          ))}
                        </ul>
                        {meaning.synonyms && meaning.synonyms.length > 0 && (
                          <div className='flex gap-4 pt-4 text-darkGray'>
                            {meaning.synonyms.length === 1
                              ? "Synonym"
                              : meaning.synonyms.length > 1
                                ? "Synonyms"
                                : null}
                            <ul className='flex flex-wrap'>
                              {meaning.synonyms.map((synonym, synonymIndex) => (
                                <li className='text-purple font-bold' key={synonymIndex}>
                                  {meaning.synonyms.length > 1 && synonymIndex < meaning.synonyms.length - 1 ? (
                                    <>
                                      {synonym},{'\u00A0'}
                                    </>
                                  ) : (
                                    synonym
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </ul>
                  </div>
                ))}
              <div className="py-6">
                <hr className='pt-6 text-gray dark:text-darkerGray' />
                <p className='text-darkGray'>Source</p>
                <a target='_blank' className='underline text-darkerGray dark:text-gray text-sm' href={sourceUrls[0]}>{sourceUrls[0]}</a>
              </div>
            </div>
          )}
        </div>
      </div>

    </Router>
  );
}

export default App;
