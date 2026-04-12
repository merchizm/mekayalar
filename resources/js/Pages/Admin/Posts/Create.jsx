import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import CreatableSelect from 'react-select/creatable';
import MarkdownEditor from '@/Components/Admin/Posts/MarkdownEditor';
import { useState } from 'react';
import CategoryManagerModal from '@/Components/Admin/Posts/CategoryManagerModal';
import { AnimatePresence, motion } from 'framer-motion';

const defaultAlbumItem = { image_path: '', caption: '', alt_text: '' };

export default function Create({ auth, categories, books = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        post_title: '',
        post_slug: '',
        post_content: '',
        post_status: 'draft',
        post_category_id: '',
        post_tags: [],
        post_image: '',
        type: '0',
        url: '',
        description: '',
        quote_text: '',
        quote_page: '',
        quote_highlight_color: '#fef3c7',
        book_ids: [],
        primary_book_id: '',
        album_items: [defaultAlbumItem],
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

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.posts.store'), {
            onSuccess: () => toast.success('Gönderi başarıyla oluşturuldu!'),
            onError: () => toast.error('Gönderi oluşturulurken bir hata oluştu.'),
        });
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

    const formInputClass =
        'mt-1 block w-full rounded-md border-input shadow-sm focus:border-ring focus:ring-ring dark:bg-secondary dark:border-border dark:text-foreground sm:text-sm';
    const formLabelClass = 'block text-sm font-medium text-muted-foreground dark:text-muted-foreground';
    const errorClass = 'text-destructive mt-1 text-xs';

    return (
        <AdminLayout user={auth.user}>
            <Head title="Yeni Gönderi Oluştur" />

            <form onSubmit={submit}>
                <div className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card">
                    <div className="border-b border-border px-5 py-4 dark:border-border">
                        <h3 className="text-lg font-semibold text-foreground dark:text-foreground">Yeni Gönderi</h3>
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
                                                        {__('Alıntı Metni')}
                                                    </label>
                                                    <textarea
                                                        rows="6"
                                                        className={formInputClass}
                                                        value={data.quote_text}
                                                        onChange={(e) => setData('quote_text', e.target.value)}
                                                    />
                                                    {errors.quote_text && (
                                                        <div className={errorClass}>{errors.quote_text}</div>
                                                    )}
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
                                                        <label
                                                            htmlFor="quote_highlight_color"
                                                            className={formLabelClass}
                                                        >
                                                            {__('Vurgu Rengi')}
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
                                                        {__('Kitaplar')}
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
                                                    <div className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground">
                                                        {__('Birden fazla kitap seçilebilir.')}
                                                    </div>
                                                </div>
                                                {data.book_ids.length > 0 && (
                                                    <div>
                                                        <label htmlFor="primary_book_id" className={formLabelClass}>
                                                            {__('Ana Kitap')}
                                                        </label>
                                                        <select
                                                            className={formInputClass}
                                                            value={data.primary_book_id}
                                                            onChange={(e) =>
                                                                setData('primary_book_id', Number(e.target.value))
                                                            }
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
                                                    <h4 className="text-base font-semibold text-foreground dark:text-foreground">
                                                        {__('Albüm Görselleri')}
                                                    </h4>
                                                    <button
                                                        type="button"
                                                        onClick={addAlbumItem}
                                                        className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white"
                                                    >
                                                        {__('Görsel Ekle')}
                                                    </button>
                                                </div>
                                                {data.album_items.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-md border border-border p-4 dark:border-border"
                                                    >
                                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                            <div className="md:col-span-3">
                                                                <label className={formLabelClass}>
                                                                    {__('Görsel URL')}
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className={formInputClass}
                                                                    value={item.image_path}
                                                                    onChange={(e) =>
                                                                        updateAlbumItem(
                                                                            index,
                                                                            'image_path',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className={formLabelClass}>
                                                                    {__('Caption')}
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className={formInputClass}
                                                                    value={item.caption}
                                                                    onChange={(e) =>
                                                                        updateAlbumItem(
                                                                            index,
                                                                            'caption',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className={formLabelClass}>
                                                                    {__('Alt Text')}
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className={formInputClass}
                                                                    value={item.alt_text}
                                                                    onChange={(e) =>
                                                                        updateAlbumItem(
                                                                            index,
                                                                            'alt_text',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="flex items-end">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeAlbumItem(index)}
                                                                    className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-foreground dark:bg-secondary dark:text-foreground"
                                                                >
                                                                    {__('Kaldır')}
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
                            <div className="space-y-6 rounded-lg border bg-secondary/70 p-4 dark:border-border dark:bg-card md:col-span-1">
                                <div>
                                    <label htmlFor="post_status" className={formLabelClass}>
                                        {__('Durum')}
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
                                                            {allCategories.map((category) => (
                                                                <option key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsCategoryManagerOpen(true)}
                                                            className="rounded-md bg-accent p-2 text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                                        {__('Kısa Açıklama')}
                                    </label>
                                    <textarea
                                        className={formInputClass}
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="post_image" className={formLabelClass}>
                                        {isAlbumPost ? __('Kapak Görseli URL') : __('Öne Çıkan Görsel URL')}
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
                                        {__('Gönderi Tipi')}
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
                    <div className="flex justify-end border-t border-border px-5 py-4 dark:border-border">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                            disabled={processing}
                        >
                            Oluştur
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
