import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function SpotifyPlaying() {
  const [isLoading, setIsLoading] = useState(false);
  const [musicName, setMusicName] = useState(null);
  const [musicUrl, setMusicUrl] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const hideTooltipTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hideTooltipTimeout.current);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    hideTooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 300);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/spotify/currently-playing');
      const { isPlaying, musicName, musicUrl } = response.data;
      setIsLoading(isPlaying);
      setMusicName(musicName);
      setMusicUrl(musicUrl);
    } catch (error) {
      setIsLoading(false);
      setMusicName(null);
      setMusicUrl(null);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  const limit = (text, limit) => {
    if (text && text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };



  return (
    <div
      className="relative p-1 rounded-xl border shadow-sm bg-background dark:bg-repository-card-bg-dark border-divider dark:border-label-border-dark"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <div className="flex gap-2 items-center px-3 h-10 rounded-lg transition-colors hover:bg-button-hover dark:hover:bg-button-hover-dark" title={`Spotify'da Dinliyorum: ${musicName}`}>
          <div className="equalizer-container">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
          </div>
          <span className="hidden text-xs font-medium text-text dark:text-text-dark sm:inline">{limit(musicName, 40)}</span>
          {showTooltip && musicUrl && (
            <div className="absolute bottom-full left-1/2 z-10 px-3 py-2 mb-2 w-max text-xs rounded shadow-lg -translate-x-1/2 tooltip-bubble text-default dark:text-white bg-background dark:bg-repository-card-bg-dark">
              <div className="flex gap-4 items-center">
                <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="hover:text-spotify-green">Müziği aç</a>
                <a href="https://open.spotify.com/user/hkt7thwkuynqutz8jenb3x0wu?si=eb716f20515241b4" target="_blank" rel="noopener noreferrer" className="hover:text-spotify-green">Profilime git</a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center w-10 h-10 rounded-lg transition-colors" title="Spotify'da aktif değilim">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 27 27">
            <path d="M15,3C8.4,3,3,8.4,3,15s5.4,12,12,12s12-5.4,12-12S21.6,3,15,3z M19.731,21c-0.22,0-0.33-0.11-0.55-0.22 c-1.65-0.991-3.74-1.54-5.94-1.54c-1.21,0-2.53,0.22-3.63,0.44c-0.22,0-0.44,0.11-0.55,0.11c-0.44,0-0.77-0.33-0.77-0.77 s0.22-0.77,0.66-0.77c1.43-0.33,2.861-0.55,4.401-0.55c2.53,0,4.84,0.66,6.82,1.76c0.22,0.22,0.44,0.33,0.44,0.77 C20.39,20.78,20.06,21,19.731,21z M20.94,17.921c-0.22,0-0.44-0.11-0.66-0.22c-1.87-1.21-4.511-1.87-7.37-1.87 c-1.43,0-2.751,0.22-3.74,0.44c-0.22,0.11-0.33,0.11-0.55,0.11c-0.55,0-0.881-0.44-0.881-0.881c0-0.55,0.22-0.77,0.77-0.991 c1.32-0.33,2.641-0.66,4.511-0.66c3.08,0,5.94,0.77,8.361,2.2c0.33,0.22,0.55,0.55,0.55,0.881 C21.82,17.48,21.491,17.921,20.94,17.921z M22.37,14.4c-0.22,0-0.33-0.11-0.66-0.22c-2.2-1.21-5.39-1.98-8.47-1.98 c-1.54,0-3.19,0.22-4.621,0.55c-0.22,0-0.33,0.11-0.66,0.11c-0.66,0.111-1.1-0.44-1.1-1.099s0.33-0.991,0.77-1.1 C9.39,10.22,11.26,10,13.24,10c3.41,0,6.93,0.77,9.681,2.2c0.33,0.22,0.66,0.55,0.66,1.1C23.471,13.96,23.03,14.4,22.37,14.4z"></path>
          </svg>
        </div>
      )}
    </div>
  );
} 
