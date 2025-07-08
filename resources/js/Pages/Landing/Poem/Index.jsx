import React, { useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import '@/../css/applause-button.css';

export default function Index({ poems, seo }) {

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
      <Head>
        {/* The stylesheet is imported directly, but if needed, it can be linked here */}
        {/* <link rel="stylesheet" href="/assets/styles/applause-button.css" /> */}
      </Head>

      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">Kalemimden Dökülenler</h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">Duygularımı ve düşüncelerimi mısralara döktüğüm kişisel köşem. Küçük bir uyarı, şiirlerin hiç birini bir estetik kaygısı ile yazmadım.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {poems.map(poem => (
          <Link key={poem.id} href={route('poems.show', { poem: poem.slug })} className="flex overflow-hidden relative flex-col p-8 h-full bg-transparent rounded-2xl border shadow-sm transition-all duration-300 group border-divider dark:border-divider-dark hover:shadow-lg hover:-translate-y-1">
            <div className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
            <div className="flex relative z-10 flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-text dark:text-text-dark">{poem.title}</h3>
                <applause-button
                  id={poem.id}
                  type="poem"
                  multiclap="true"
                  class="w-[58px] h-[58px] flex-shrink-0"
                />
              </div>

              <div className="flex justify-between items-center pt-4 mt-auto border-t border-divider/50 dark:border-divider-dark/50">
                <span className="text-sm text-light-text dark:text-light-text-dark">{formatDate(poem.wrote_at)}</span>
                <span className="inline-flex items-center text-sm font-semibold text-text dark:text-text-dark group-hover:underline">
                  Devamını Oku
                  <svg className="ml-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {poems.length === 0 && (
        <div className="py-16 my-5 text-center rounded-xl border shadow-sm bg-poem-container dark:bg-poem-container-dark border-divider dark:border-label-border-dark">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 w-16 h-16 text-light-text dark:text-dark-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h2 className="mb-3 text-2xl font-semibold text-text dark:text-text-dark">Henüz şiir bulunmuyor</h2>
          <p className="text-light-text dark:text-light-text-dark">Yakında burada şiirlerimi görebileceksiniz.</p>
        </div>
      )}
    </LandingLayout>
  );
} 
