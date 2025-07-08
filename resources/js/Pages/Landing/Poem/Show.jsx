import React, { useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import '@/../css/applause-button.css';

export default function Show({ poem, seo }) {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = route('applause-button');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  return (
    <LandingLayout seo={seo}>
      <div className="mx-auto max-w-3xl">
        <nav aria-label="breadcrumb" className="mb-8">
          <ol className="flex text-sm text-light-text dark:text-light-text-dark">
            <li className="breadcrumb-item"><Link href={route('landing.index')} className="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">Ana Sayfa</Link></li>
            <li className="mx-2">/</li>
            <li className="breadcrumb-item"><Link href={route('poems.index')} className="transition-colors hover:text-menu-active dark:hover:text-menu-active-dark">Şiirler</Link></li>
            <li className="mx-2">/</li>
            <li className="font-medium text-text breadcrumb-item dark:text-text-dark" aria-current="page">{poem.title}</li>
          </ol>
        </nav>

        <article>
          <header className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl text-text dark:text-text-dark">{poem.title}</h1>
            <div className="flex justify-center items-center text-sm text-light-text dark:text-light-text-dark">
              <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(poem.wrote_at)} tarihinde yazıldı.</span>
            </div>
          </header>

          <div className="px-6 py-8 font-serif text-xl leading-loose whitespace-pre-wrap rounded-lg shadow-sm bg-poem-container dark:bg-poem-container-dark/50 sm:px-10 sm:py-12">{poem.content}</div>

          <footer className="flex flex-col items-center mt-12 text-center">
            <p className="mb-4 text-lg text-light-text dark:text-light-text-dark">Bu şiiri okurken keyif aldınız mı?</p>
            <applause-button
              id={poem.id}
              type="poem"
              multiclap="true"
              class="w-[70px] h-[70px]"
            />

            <div className="mt-12">
              <Link href={route('poems.index')} className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-lg transition-colors bg-button dark:bg-button-dark text-text dark:text-text-dark hover:bg-button-hover dark:hover:bg-button-hover-dark">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Tüm Şiirler</span>
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </LandingLayout>
  );
} 
