import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import NavLink from './NavLink';

const Header = () => {
  const { url } = usePage();
  const [scrolled, setScrolled] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    document.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onStart = (event) => setNavigatingTo(event.detail.visit.url.href);
    const onFinish = () => setNavigatingTo(null);

    const removeStartListener = router.on('start', onStart);
    const removeFinishListener = router.on('finish', onFinish);

    return () => {
      removeStartListener();
      removeFinishListener();
    };
  }, []);

  const isNavigating = (routeHref, isPrefixMatch = false) => {
    if (!navigatingTo) return false;
    return isPrefixMatch
      ? navigatingTo.startsWith(routeHref)
      : navigatingTo === routeHref;
  };

  return (
    <header className={`flex fixed ${scrolled ? 'top-2' : 'top-4'} z-50 justify-center w-full transition-all duration-300`}>
      {/* Mobil Container */}
      <div className="relative px-4 mx-auto w-full max-w-screen-xl md:hidden">
        <nav className={`mobile-nav-wrapper overflow-hidden rounded-full backdrop-blur-lg bg-background/80 dark:bg-background-dark/80 ${scrolled ? 'ring-1 shadow-lg ring-black/5' : ''}`}>
          <div className="mobile-nav-container">
            <ul className="flex gap-1 items-center p-2 whitespace-nowrap">
              <li><NavLink href={route('landing.index')} active={url === '/'} loading={isNavigating(route('landing.index'))}>Hakkımda</NavLink></li>
              <li><NavLink href={route('blog.index')} active={url.startsWith('/posts')} loading={isNavigating(route('blog.index'), true)}>Gönderilerim</NavLink></li>
              <li><NavLink href={route('poems.index')} active={url.startsWith('/poems')} loading={isNavigating(route('poems.index'), true)}>Şiirlerim</NavLink></li>
              <li><NavLink href={route('projects.index')} active={url.startsWith('/projects')} loading={isNavigating(route('projects.index'), true)}>Projelerim</NavLink></li>
              <li><NavLink href={route('bookshelf.index')} active={url.startsWith('/bookshelf')} loading={isNavigating(route('bookshelf.index'), true)}>Kitaplık</NavLink></li>
              <li><NavLink href={route('bookmarks.index')} active={url.startsWith('/bookmarks')} loading={isNavigating(route('bookmarks.index'), true)}>Yer İmleri</NavLink></li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Desktop Container */}
      <div className="hidden relative px-4 md:block">
        <nav className={`overflow-hidden rounded-full backdrop-blur-lg bg-background/80 dark:bg-background-dark/80 ${scrolled ? 'ring-1 shadow-lg ring-black/5' : ''}`}>
          <div className="mobile-nav-container">
            <ul className="flex gap-1 justify-center items-center p-2 whitespace-nowrap">
              <li><NavLink href={route('landing.index')} active={url === '/'} loading={isNavigating(route('landing.index'))}>Hakkımda</NavLink></li>
              <li><NavLink href={route('blog.index')} active={url.startsWith('/posts')} loading={isNavigating(route('blog.index'), true)}>Gönderilerim</NavLink></li>
              <li><NavLink href={route('poems.index')} active={url.startsWith('/poems')} loading={isNavigating(route('poems.index'), true)}>Şiirlerim</NavLink></li>
              <li><NavLink href={route('projects.index')} active={url.startsWith('/projects')} loading={isNavigating(route('projects.index'), true)}>Projelerim</NavLink></li>
              <li><NavLink href={route('bookshelf.index')} active={url.startsWith('/bookshelf')} loading={isNavigating(route('bookshelf.index'), true)}>Kitaplık</NavLink></li>
              <li><NavLink href={route('bookmarks.index')} active={url.startsWith('/bookmarks')} loading={isNavigating(route('bookmarks.index'), true)}>Yer İmleri</NavLink></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header; 
