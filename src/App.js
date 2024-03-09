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
  const { word, phonetic } = dictionaryData?.[0] ?? {}
  const [audioUrl, setAudioUrl] = useState(null);

  const handleSearch = async (userInput) => {
    try {
      const data = await dictionaryService.getAll(userInput);
      setDictionaryData(data);
      setError(null);

      const audioUrl = findPronunciationAudioUrl(data)
      console.log(`Audio URL: ${audioUrl}`);
      setAudioUrl(audioUrl)

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
          const usPhonetic = entry.phonetics.find(phonetic => {
            return phonetic.audio && phonetic.audio.toLowerCase().includes('-us.mp3');
          });

          if (usPhonetic && usPhonetic.audio) {
            return usPhonetic.audio;
          }
        }
      }
    }
    return "Couldn't provide the audio for the word.";;
  }

  let audio = new Audio();

  const start = async () => {
    try {
      // Set the audio source based on the availability of audioUrl
      if (audioUrl) {
        audio.src = audioUrl;
      } else {
        audio.src = './assets/audio/no_audio.mp3';  // Use an absolute path
      }

      console.log('Audio Object:', audio);

      // Play the audio
      await audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    } catch (error) {
      console.error('Error during audio playback:', error);
    }
  };

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
              <Link to="/" className="md:text-2xl text-lg font-bold">
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
        <div className="max-w-2xl mx-auto dark:text-white">
          <Filter handleSearch={handleSearch} />
          {error && <p>{error}</p>}
          {dictionaryData && (
            <div>
              <div className='flex justify-between items-center pt-8'>
                <h2 className="text-3xl sm:text-7xl font-bold text-mildBlack dark:text-white">{word}</h2>
                <button className="flex items-center justify-center rounded-full w-[3rem] h-[3rem] sm:h-[4rem] sm:w-[4rem] bg-lightPurple hover:cursor-pointer active:cursor-pointer focus:cursor-pointer" onClick={start} >
                  {/* <svg
                    className='w-6 h-6 sm:w-8 sm:h-8'
                    viewBox="0 0 24 24"
                    fill="#a845ef"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#a845ef"
                    strokeWidth={playIcon.strokeWidth}
                  >
                    <path d={playIcon.path} />
                  </svg> */}
                  <img src={PlayIcon} className="rotate-180 w-4 h-4 sm:w-6 sm:h-6" alt="Play audio" />
                </button>
              </div>
              <p className='text-2xl text-purple font-medium pt-4'>{phonetic}</p>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
