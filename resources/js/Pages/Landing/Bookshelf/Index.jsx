import React, { useState } from 'react';
import LandingLayout from '@/Layouts/LandingLayout';
import TabButton from '@/Components/Landing/Bookshelf/Index/TabButton';
import PlaylistsTab from '@/Components/Landing/Bookshelf/Index/PlaylistsTab';
import ReposTab from '@/Components/Landing/Bookshelf/Index/ReposTab';
import GistsTab from '@/Components/Landing/Bookshelf/Index/GistsTab';
import BooksTab from '@/Components/Landing/Bookshelf/Index/BooksTab';

export default function Index({ playlists, repos, gists, langColors, seo }) {
  const [currentTab, setCurrentTab] = useState('playlists');

  return (
    <LandingLayout seo={seo}>
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">Dijital Kitaplığım</h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">Müzik zevkim, kod dünyam ve okuma notlarım. Hepsi bir arada. Umarım hoşuna gidecek şeyler bulabilirsin.</p>
      </header>

      <div className="container">
        <div className="flex justify-center mb-8 border-b border-divider dark:border-divider-dark">
          <nav className="flex flex-wrap justify-center -mb-px space-x-2 sm:space-x-6">
            <TabButton isActive={currentTab === 'playlists'} onClick={() => setCurrentTab('playlists')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Playlistler
            </TabButton>
            <TabButton isActive={currentTab === 'repos'} onClick={() => setCurrentTab('repos')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Repolar
            </TabButton>
            <TabButton isActive={currentTab === 'gists'} onClick={() => setCurrentTab('gists')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Gistler
            </TabButton>
            <TabButton isActive={currentTab === 'books'} onClick={() => setCurrentTab('books')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Kitaplar
            </TabButton>
          </nav>
        </div>

        {currentTab === 'playlists' && <PlaylistsTab playlists={playlists} />}
        {currentTab === 'repos' && <ReposTab repos={repos} langColors={langColors} />}
        {currentTab === 'gists' && <GistsTab gists={gists} />}
        {currentTab === 'books' && <BooksTab />}

      </div>
    </LandingLayout>
  );
} 
