import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';

const statusOptions = [
    { key: 'all', label: 'Tüm' },
    { key: 'reading', label: 'Okunuyor' },
    { key: 'completed', label: 'Tamamlandı' },
    { key: 'on_hold', label: 'Beklemede' },
    { key: 'dropped', label: 'Bırakıldı' },
];

const BooksTab = ({ books = [] }) => {
    const [status, setStatus] = useState('all');

    const filteredBooks = useMemo(() => {
        const items = status === 'all' ? books : books.filter((book) => book.status === status);
        return [...items].sort((a, b) => {
            const dateA = a.finished_at ? new Date(a.finished_at).getTime() : 0;
            const dateB = b.finished_at ? new Date(b.finished_at).getTime() : 0;
            return dateB - dateA;
        });
    }, [books, status]);

    return (
        <div>
            <div className="mb-6 flex flex-wrap gap-3">
                {statusOptions.map((option) => (
                    <button
                        key={option.key}
                        type="button"
                        onClick={() => setStatus(option.key)}
                        className={`interactive-pill rounded-full px-4 py-2 text-sm font-semibold transition ${
                            status === option.key
                                ? 'bg-menu-active text-white dark:bg-menu-active-dark dark:text-text-dark'
                                : 'bg-button text-text dark:bg-button-dark dark:text-text-dark'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book) => (
                        <Link
                            key={book.id}
                            href={route('books.show', { book: book.slug })}
                            className="surface-lift group overflow-hidden rounded-3xl border border-divider bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-divider-dark dark:bg-repository-card-bg-dark"
                        >
                            <div className="aspect-[4/5] overflow-hidden bg-divider/40 dark:bg-divider-dark/40">
                                {book.cover_image ? (
                                    <img
                                        src={book.cover_image}
                                        alt={book.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-light-text dark:text-light-text-dark">
                                        Kapak yok
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="line-clamp-2 text-xl font-bold text-text dark:text-text-dark">{book.title}</h3>
                                <p className="mt-2 text-sm text-light-text dark:text-light-text-dark">{book.author}</p>
                                <div className="mt-4 flex items-center justify-between text-xs text-light-text dark:text-light-text-dark">
                                    <span>{statusOptions.find((option) => option.key === book.status)?.label || book.status}</span>
                                    <span>{book.rating ? `${book.rating}/10` : 'Puan yok'}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="my-5 rounded-2xl border-2 border-dashed border-divider bg-background py-24 text-center dark:border-divider-dark dark:bg-repository-card-bg-dark">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto mb-6 h-20 w-20 text-light-text dark:text-dark-text-dark"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                    </svg>
                    <h2 className="mb-3 text-3xl font-bold text-text dark:text-text-dark">{__('Kitap Bulunamadı')}</h2>
                    <p className="text-center text-xl text-light-text dark:text-light-text-dark">
                        {__('Bu filtrede gösterilecek kitap yok.')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default BooksTab;
