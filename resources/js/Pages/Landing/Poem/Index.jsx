import React, { useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import '@/../css/applause-button.css';
import RevealSection from '@/Components/Common/RevealSection';

function Index({ poems }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = route('applause-button');
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };

    return (
        <>
            <Head>
                {/* The stylesheet is imported directly, but if needed, it can be linked here */}
                {/* <link rel="stylesheet" href="/assets/styles/applause-button.css" /> */}
            </Head>

            <RevealSection as="header" className="mb-12 text-center">
                <h1 className="text-5xl font-bold tracking-tight text-text dark:text-text-dark">
                    {__('Kalemimden Dökülenler')}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-xl text-light-text dark:text-light-text-dark">
                    {__(
                        'Duygularımı ve düşüncelerimi mısralara döktüğüm kişisel köşem. Küçük bir uyarı, şiirlerin hiç birini bir estetik kaygısı ile yazmadım.'
                    )}
                </p>
            </RevealSection>

            <RevealSection className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2" delay={0.06}>
                {poems.map((poem) => (
                    <Link
                        key={poem.id}
                        href={route('poems.show', { poem: poem.slug })}
                        className="surface-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-divider bg-transparent p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-divider-dark"
                    >
                        <div className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-20 transition-all duration-300 group-hover:opacity-30"></div>
                        <div className="relative z-10 flex flex-grow flex-col">
                            <div className="mb-4 flex items-start justify-between">
                                <h3 className="text-2xl font-bold text-text dark:text-text-dark">{poem.title}</h3>
                            </div>

                            <div className="mt-auto flex items-center justify-between border-t border-divider/50 pt-4 dark:border-divider-dark/50">
                                <span className="text-sm text-light-text dark:text-light-text-dark">
                                    {formatDate(poem.wrote_at)}
                                </span>
                                <span className="inline-flex items-center text-sm font-semibold text-text group-hover:underline dark:text-text-dark">
                                    {__('Devamını Oku')}
                                    <svg
                                        className="ml-1 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </RevealSection>

            {poems.length === 0 && (
                <RevealSection className="my-5 rounded-xl border border-divider bg-poem-container py-16 text-center shadow-sm dark:border-label-border-dark dark:bg-poem-container-dark" delay={0.06}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto mb-4 h-16 w-16 text-light-text dark:text-dark-text-dark"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                    </svg>
                    <h2 className="mb-3 text-2xl font-semibold text-text dark:text-text-dark">
                        {__('Henüz şiir bulunmuyor')}
                    </h2>
                    <p className="text-light-text dark:text-light-text-dark">
                        {__('Yakında burada şiirlerimi görebileceksiniz.')}
                    </p>
                </RevealSection>
            )}
        </>
    );
}

Index.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Index;
