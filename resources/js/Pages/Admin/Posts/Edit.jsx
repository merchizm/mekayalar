import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import MarkdownEditor from '@/Components/Admin/Posts/MarkdownEditor';
import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';
import CategoryManagerModal from '@/Components/Admin/Posts/CategoryManagerModal';
import { AnimatePresence, motion } from 'framer-motion';

const defaultAlbumItem = { image_path: '', caption: '', alt_text: '' };

export default function Edit({ auth, post, categories, books = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        post_title: post.post_title || '',
        post_content: post.post_content || '',
        post_category_id: post.post_category_id || '',
        post_tags: Array.isArray(post.post_tags) ? post.post_tags.map((tag) => ({ value: tag, label: tag })) : [],
        post_image: post.post_image || '',
        description: post.description || '',
        post_status: post.post_status || 'published',
        type: post.type ? post.type.toString() : '0',
        url: post.url || '',
        quote_text: post.quote_text || '',
        quote_page: post.quote_page || '',
        quote_highlight_color: post.quote_highlight_color || '#fef3c7',
        book_ids: Array.isArray(post.books) ? post.books.map((book) => book.id) : [],
        primary_book_id: Array.isArray(post.books)
            ? post.books.find((book) => book.pivot?.is_primary)?.id || post.books[0]?.id || ''
            : '',
        album_items:
            Array.isArray(post.album_items) && post.album_items.length > 0
                ? post.album_items.map((item) => ({
                      image_path: item.image_path || '',
                      caption: item.caption || '',
                      alt_text: item.alt_text || '',
                  }))
                : [defaultAlbumItem],
    });

    const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
    const [allCategories, setAllCategories] = useState(categories);

    const isStandardPost = data.type === '0';
    const isQuotePost = data.type === '3';
    const isAlbumPost = data.type === '4';

    const animationProps = {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.3 },
        style: { overflow: 'hidden' },
    };

    const handleTagsChange = (selectedOptions) => {
        setData('post_tags', selectedOptions || []);
    };

    const handleBookSelection = (event) => {
        const selectedIds = Array.from(event.target.selectedOptions, (option) => Number(option.value));
        setData('book_ids', selectedIds);
        if (!selectedIds.includes(Number(data.primary_book_id))) {
            setData('primary_book_id', selectedIds[0] || '');
        }
    };

    const updateAlbumItem = (index, key, value) => {
        const nextItems = [...data.album_items];
        nextItems[index] = { ...nextItems[index], [key]: value };
        setData('album_items', nextItems);
    };

    const addAlbumItem = () => setData('album_items', [...data.album_items, { ...defaultAlbumItem }]);
    const removeAlbumItem = (index) => {
        const nextItems = data.album_items.filter((_, itemIndex) => itemIndex !== index);
        setData('album_items', nextItems.length ? nextItems : [{ ...defaultAlbumItem }]);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.posts.update', post.id), {
            preserveScroll: true,
        });
    };

    const formInputClass =
        'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm';
    const formLabelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300';
    const errorClass = 'text-red-500 mt-1 text-xs';

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gönderiyi Düzenle" />

            <form onSubmit={submit}>
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gönderiyi Düzenle</h3>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="space-y-6 md:col-span-2">
                                <div>
                                    <label htmlFor="post_title" className={formLabelClass}>
                                        Başlık
                                    </label>
                                    <input
                                        type="text"
                                        className={formInputClass}
                                        name="post_title"
                                        value={data.post_title}
                                        onChange={(e) => setData('post_title', e.target.value)}
                                    />
                                    {errors.post_title && <div className={errorClass}>{errors.post_title}</div>}
                                </div>

                                <AnimatePresence>
                                    {isStandardPost && (
                                        <motion.div {...animationProps}>
                                            <div className="pt-6">
                                                <label htmlFor="post_content" className={formLabelClass}>
                                                    İçerik
                                                </label>
                                                <MarkdownEditor
                                                    value={data.post_content}
                                                    onChange={(content) => setData('post_content', content)}
                                                />
                                                {errors.post_content && (
                                                    <div className={errorClass}>{errors.post_content}</div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {isQuotePost && (
                                        <motion.div {...animationProps}>
                                            <div className="space-y-6 rounded-lg border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900 dark:bg-amber-950/20">
                                                <div>
                                                    <label htmlFor="quote_text" className={formLabelClass}>
                                                        Alıntı Metni
                                                    </label>
                                                    <textarea
                                                        rows="6"
                                                        className={formInputClass}
                                                        value={data.quote_text}
                                                        onChange={(e) => setData('quote_text', e.target.value)}
                                                    />
                                                    {errors.quote_text && <div className={errorClass}>{errors.quote_text}</div>}
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div>
                                                        <label htmlFor="quote_page" className={formLabelClass}>
                                                            Sayfa
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={formInputClass}
                                                            value={data.quote_page}
                                                            onChange={(e) => setData('quote_page', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="quote_highlight_color" className={formLabelClass}>
                                                            Vurgu Rengi
                                                        </label>
                                                        <input
                                                            type="color"
                                                            className={`${formInputClass} h-11`}
                                                            value={data.quote_highlight_color}
                                                            onChange={(e) =>
                                                                setData('quote_highlight_color', e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="book_ids" className={formLabelClass}>
                                                        Kitaplar
                                                    </label>
                                                    <select
                                                        multiple
                                                        className={`${formInputClass} min-h-40`}
                                                        value={data.book_ids.map(String)}
                                                        onChange={handleBookSelection}
                                                    >
                                                        {books.map((book) => (
                                                            <option key={book.id} value={book.id}>
                                                                {book.title} - {book.author}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {data.book_ids.length > 0 && (
                                                    <div>
                                                        <label htmlFor="primary_book_id" className={formLabelClass}>
                                                            Ana Kitap
                                                        </label>
                                                        <select
                                                            className={formInputClass}
                                                            value={data.primary_book_id}
                                                            onChange={(e) => setData('primary_book_id', Number(e.target.value))}
                                                        >
                                                            {books
                                                                .filter((book) => data.book_ids.includes(book.id))
                                                                .map((book) => (
                                                                    <option key={book.id} value={book.id}>
                                                                        {book.title}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {isAlbumPost && (
                                        <motion.div {...animationProps}>
                                            <div className="space-y-4 rounded-lg border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900 dark:bg-rose-950/20">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                                                        Albüm Görselleri
                                                    </h4>
                                                    <button
                                                        type="button"
                                                        onClick={addAlbumItem}
                                                        className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white"
                                                    >
                                                        Görsel Ekle
                                                    </button>
                                                </div>
                                                {data.album_items.map((item, index) => (
                                                    <div key={index} className="rounded-md border border-gray-200 p-4 dark:border-gray-700">
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                            <div className="md:col-span-3">
                                                                <label className={formLabelClass}>Görsel URL</label>
                                                                <input
                                                                    type="text"
                                                                    className={formInputClass}
                                                                    value={item.image_path}
                                                                    onChange={(e) =>
                                                                        updateAlbumItem(index, 'image_path', e.target.value)
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className={formLabelClass}>Caption</label>
                                                                <input
                                                                    type="text"
                                                                    className={formInputClass}
                                                                    value={item.caption}
                                                                    onChange={(e) => updateAlbumItem(index, 'caption', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className={formLabelClass}>Alt Text</label>
                                                                <input
                                                                    type="text"
                                                                    className={formInputClass}
                                                                    value={item.alt_text}
                                                                    onChange={(e) => updateAlbumItem(index, 'alt_text', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="flex items-end">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeAlbumItem(index)}
                                                                    className="w-full rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                                                                >
                                                                    Kaldır
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="space-y-6 rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:col-span-1">
                                <div>
                                    <label htmlFor="post_status" className={formLabelClass}>
                                        Durum
                                    </label>
                                    <select
                                        className={formInputClass}
                                        value={data.post_status}
                                        onChange={(e) => setData('post_status', e.target.value)}
                                    >
                                        <option value="published">Yayınlandı</option>
                                        <option value="draft">Taslak</option>
                                    </select>
                                </div>

                                <AnimatePresence>
                                    {isStandardPost && (
                                        <motion.div {...animationProps}>
                                            <div className="space-y-6">
                                                <div>
                                                    <label htmlFor="post_category_id" className={formLabelClass}>
                                                        Kategori
                                                    </label>
                                                    <div className="flex items-center space-x-2">
                                                        <select
                                                            className={formInputClass + ' flex-grow'}
                                                            value={data.post_category_id}
                                                            onChange={(e) =>
                                                                setData('post_category_id', e.target.value)
                                                            }
                                                        >
                                                            <option value="">Kategori Seçin</option>
                                                            {Array.isArray(allCategories) &&
                                                                allCategories.map((category) => (
                                                                    <option key={category.id} value={category.id}>
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsCategoryManagerOpen(true)}
                                                            className="rounded-md bg-gray-600 p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                                        >
                                                            Yönet
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="post_tags" className={formLabelClass}>
                                                        Etiketler
                                                    </label>
                                                    <CreatableSelect
                                                        isMulti
                                                        onChange={handleTagsChange}
                                                        value={data.post_tags}
                                                        options={[]}
                                                        placeholder="Etiket seçin..."
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div>
                                    <label htmlFor="description" className={formLabelClass}>
                                        Kısa Açıklama
                                    </label>
                                    <textarea
                                        className={formInputClass}
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="post_image" className={formLabelClass}>
                                        {isAlbumPost ? 'Kapak Görseli URL' : 'Öne Çıkan Görsel URL'}
                                    </label>
                                    <input
                                        type="text"
                                        className={formInputClass}
                                        value={data.post_image}
                                        onChange={(e) => setData('post_image', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="type" className={formLabelClass}>
                                        Gönderi Tipi
                                    </label>
                                    <select
                                        className={formInputClass}
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                    >
                                        <option value="0">Standart</option>
                                        <option value="1">Resim</option>
                                        <option value="2">Çizim</option>
                                        <option value="3">Alıntı</option>
                                        <option value="4">Albüm</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-700">
                        <a
                            href={route('admin.posts.preview', post.id)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                            Önizleme
                        </a>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            disabled={processing}
                        >
                            Güncelle
                        </button>
                    </div>
                </div>
            </form>

            <CategoryManagerModal
                isOpen={isCategoryManagerOpen}
                onClose={() => setIsCategoryManagerOpen(false)}
                categories={allCategories}
                onUpdate={(updatedCategories) => {
                    setAllCategories(updatedCategories);
                }}
            />
        </AdminLayout>
    );
}
