import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import '@/../css/applause-button.css';
import RevealSection from '@/Components/Common/RevealSection';

function Show({ poem }) {
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
            <div className="mx-auto max-w-3xl">
                <RevealSection as="nav" aria-label="breadcrumb" className="mb-8">
                    <ol className="flex text-sm text-muted-foreground dark:text-muted-foreground">
                        <li className="breadcrumb-item">
                            <Link
                                href={route('landing.index')}
                                className="transition-colors hover:text-primary dark:hover:text-primary"
                            >
                                {__('Ana Sayfa')}
                            </Link>
                        </li>
                        <li className="mx-2">/</li>
                        <li className="breadcrumb-item">
                            <Link
                                href={route('poems.index')}
                                className="transition-colors hover:text-primary dark:hover:text-primary"
                            >
                                {__('Şiirler')}
                            </Link>
                        </li>
                        <li className="mx-2">/</li>
                        <li
                            className="breadcrumb-item font-medium text-foreground dark:text-foreground"
                            aria-current="page"
                        >
                            {poem.title}
                        </li>
                    </ol>
                </RevealSection>

                <article>
                    <RevealSection as="header" className="mb-8 text-center" delay={0.04}>
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground dark:text-foreground lg:text-5xl">
                            {poem.title}
                        </h1>
                        <div className="flex items-center justify-center text-sm text-muted-foreground dark:text-muted-foreground">
                            <svg
                                className="mr-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span>{formatDate(poem.wrote_at) + __(' tarihinde yazıldı.')}</span>
                        </div>
                    </RevealSection>

                    <RevealSection
                        className="whitespace-pre-wrap rounded-lg bg-muted px-6 py-8 font-serif text-xl leading-loose shadow-sm dark:bg-muted/50 sm:px-10 sm:py-12"
                        delay={0.08}
                    >
                        {poem.content}
                    </RevealSection>

                    <RevealSection as="footer" className="mt-12 flex flex-col items-center text-center" delay={0.12}>
                        <p className="mb-4 text-lg text-muted-foreground dark:text-muted-foreground">
                            {__('Bu şiiri okurken keyif aldınız mı?')}
                        </p>
                        <applause-button id={poem.id} type="poem" multiclap="true" class="h-[70px] w-[70px]" />

                        <div className="mt-12">
                            <Link
                                href={route('poems.index')}
                                className="inline-flex items-center rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                <span>{__('Tüm Şiirler')}</span>
                            </Link>
                        </div>
                    </RevealSection>
                </article>
            </div>
        </>
    );
}

Show.layout = (page) => <LandingLayout children={page} seo={page.props.seo} />;

export default Show;
