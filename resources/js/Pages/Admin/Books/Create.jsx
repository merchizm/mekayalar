import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

const inputClass =
    'mt-1 block w-full rounded-md border-input shadow-sm focus:border-ring focus:ring-ring dark:border-border dark:bg-secondary dark:text-foreground sm:text-sm';
const labelClass = 'block text-sm font-medium text-muted-foreground dark:text-muted-foreground';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        author: '',
        cover_image: '',
        publisher: '',
        published_year: '',
        started_at: '',
        finished_at: '',
        rating: '',
        notes: '',
        status: 'completed',
        is_public: true,
        sort_order: 0,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.books.store'));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={__('Yeni Kitap')} />
            <form
                onSubmit={submit}
                className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm dark:border-border dark:bg-card"
            >
                <h1 className="text-xl font-semibold text-foreground dark:text-foreground">{__('Yeni Kitap')}</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>{__('Başlık')}</label>
                        <input
                            className={inputClass}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <div className="mt-1 text-xs text-destructive">{errors.title}</div>}
                    </div>
                    <div>
                        <label className={labelClass}>{__('Yazar')}</label>
                        <input
                            className={inputClass}
                            value={data.author}
                            onChange={(e) => setData('author', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>{__('Kapak URL')}</label>
                        <input
                            className={inputClass}
                            value={data.cover_image}
                            onChange={(e) => setData('cover_image', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>{__('Yayınevi')}</label>
                        <input
                            className={inputClass}
                            value={data.publisher}
                            onChange={(e) => setData('publisher', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>{__('Yıl')}</label>
                        <input
                            type="number"
                            className={inputClass}
                            value={data.published_year}
                            onChange={(e) => setData('published_year', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>{__('Puan')}</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            className={inputClass}
                            value={data.rating}
                            onChange={(e) => setData('rating', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>{__('Başlama Tarihi')}</label>
                        <input
                            type="date"
                            className={inputClass}
                            value={data.started_at}
                            onChange={(e) => setData('started_at', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>{__('Bitiş Tarihi')}</label>
                        <input
                            type="date"
                            className={inputClass}
                            value={data.finished_at}
                            onChange={(e) => setData('finished_at', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>{__('Durum')}</label>
                        <select
                            className={inputClass}
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="reading">{__('Okunuyor')}</option>
                            <option value="completed">{__('Bitti')}</option>
                            <option value="on_hold">{__('Beklemede')}</option>
                            <option value="dropped">{__('Bırakıldı')}</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>{__('Sıra')}</label>
                        <input
                            type="number"
                            className={inputClass}
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>{__('Notlar')}</label>
                    <textarea
                        rows="5"
                        className={inputClass}
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                    />
                </div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground">
                    <input
                        type="checkbox"
                        checked={data.is_public}
                        onChange={(e) => setData('is_public', e.target.checked)}
                    />
                    {__('Herkese açık')}
                </label>
                <button
                    disabled={processing}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary"
                >
                    {__('Kaydet')}
                </button>
            </form>
        </AdminLayout>
    );
}
