import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useFont } from './components/FontContext'
import AudioError from './assets/audio/no_audio.mp3'
import Content from './components/Content'
import dictionaryService from './services/dictionaryService'
import Filter from './components/Filter'
import Navbar from './components/Navbar'
import { IconMoon } from './components/Icons'
import "./index.css"
import "./output.css"

const getSystemColorScheme = () => window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';

const App = () => {
  const storedTheme = localStorage.getItem('theme')
  const defaultTheme = storedTheme || getSystemColorScheme();
  const { fontFamily } = useFont();
  const [theme, setTheme] = useState(defaultTheme);
  const icon = IconMoon;
  const [dictionaryData, setDictionaryData] = useState(null);
  const [error, setError] = useState(null);
  const { sourceUrls } = dictionaryData?.[0] ?? {}
  const [audioUrl, setAudioUrl] = useState(null);

  // console.log(sourceUrls)

  const handleSearch = async (userInput) => {
    try {
      const data = await dictionaryService.getAll(userInput);
      setDictionaryData(data);
      setError(null);

      const audioUrl = findPronunciationAudioUrl(data)
      // console.log(`Audio URL: ${audioUrl}`);
      setAudioUrl(audioUrl)
      // console.log(data)
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

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme);
  }

  return (
    <Router>
      <div className={`App ${theme === 'dark' ? 'dark' : ''} ${fontClass} min-h-dvh dark:bg-black transition-colors duration-500 px-6`}>
        <Navbar switchTheme={switchTheme} theme={theme} icon={icon} />
        <div className="max-w-2xl mx-auto dark:text-white pb-10">
          <Filter handleSearch={handleSearch} />
          <Content audioUrl={audioUrl} dictionaryData={dictionaryData} error={error} sourceUrls={sourceUrls} />
        </div>
      </div>
    </Router>
  );
}

export default App;
