import React from 'react'
import PlayIcon from '../assets/svg/play_icon.svg'
import { IconArrowTopRight } from './Icons'


const Content = ({ audioUrl, dictionaryData, error, sourceUrls }) => {
  const iconArrowTopRight = IconArrowTopRight;
  const { word, phonetic, meanings } = dictionaryData?.[0] ?? {}

  let audio = new Audio(audioUrl);

  const start = () => {
    audio.play();
  }

  return (
    <>
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
                <img src={PlayIcon} className="w-4 h-4 sm:w-6 sm:h-6" alt="Play audio" />
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
                          <ul>
                            {definition.example && <li className='marker:!text-white dark:marker:!text-black text-darkGray pt-1'>"{definition.example}"</li>}
                          </ul>
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
            <div className='sm:flex items-center gap-2'>
              <div className='sm:flex items-center gap-4'>
                <p className='text-darkGray text-sm'>Source</p>
                <a target='_blank' rel="noreferrer" className='underline text-mildBlack dark:text-gray text-sm pr-1 sm:pr-0' href={sourceUrls[0]}>{sourceUrls[0]}</a>
                <svg
                  className='inline'
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={"none"}
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={"#858585"}
                  strokeWidth={2}
                >
                  <path d={iconArrowTopRight.path} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Content