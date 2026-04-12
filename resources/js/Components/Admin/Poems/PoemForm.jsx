import React from 'react';
import { useForm } from '@inertiajs/react';
import slugify from 'slugify';

export default function PoemForm({ poem, onCancel, onSuccess }) {
    const { data, setData, post, put, errors, processing } = useForm({
        title: poem?.title || '',
        content: poem?.content || '',
        status: poem?.status || 'draft',
        wrote_at: poem?.wrote_at ? new Date(poem.wrote_at).toISOString().slice(0, 16) : '',
    });

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData('title', title);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const slug = slugify(data.title, { lower: true, strict: true });
        const submissionData = { ...data, slug };

        if (poem) {
            put(route('admin.poems.update', poem.id), {
                data: submissionData,
                onSuccess: onSuccess,
            });
        } else {
            post(route('admin.poems.store'), {
                data: submissionData,
                onSuccess: onSuccess,
            });
        }
    };

    const formInputClass =
        'mt-1 block w-full rounded-md border-input shadow-sm focus:border-ring focus:ring-ring dark:bg-secondary dark:border-border dark:text-foreground sm:text-sm';
    const formLabelClass = 'block text-sm font-medium text-muted-foreground dark:text-muted-foreground';

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4 p-6">
                <div>
                    <label htmlFor="title" className={formLabelClass}>
                        Başlık
                    </label>
                    <input
                        type="text"
                        className={formInputClass}
                        id="add_title"
                        name="title"
                        required
                        value={data.title}
                        onChange={handleTitleChange}
                    />
                    {errors.title && <div className="mt-2 text-xs text-destructive">{errors.title}</div>}
                </div>

                <div>
                    <label htmlFor="content" className={formLabelClass}>
                        Şiir
                    </label>
                    <textarea
                        className={formInputClass}
                        name="content"
                        rows="5"
                        required
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                    ></textarea>
                    {errors.content && <div className="mt-2 text-xs text-destructive">{errors.content}</div>}
                </div>
                <div>
                    <label htmlFor="status" className={formLabelClass}>
                        Durum
                    </label>
                    <select
                        className={formInputClass}
                        name="status"
                        required
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option value="published">Yayınla</option>
                        <option value="draft">Taslak</option>
                        <option value="trash">Çöp</option>
                    </select>
                    {errors.status && <div className="mt-2 text-xs text-destructive">{errors.status}</div>}
                </div>
                <div>
                    <label htmlFor="wrote_at" className={formLabelClass}>
                        Yazılış Tarihi
                    </label>
                    <input
                        type="datetime-local"
                        className={formInputClass}
                        name="wrote_at"
                        required
                        value={data.wrote_at}
                        onChange={(e) => setData('wrote_at', e.target.value)}
                    />
                    {errors.wrote_at && <div className="mt-2 text-xs text-destructive">{errors.wrote_at}</div>}
                </div>
            </div>
            <div className="flex justify-end space-x-2 bg-secondary px-6 py-4 dark:bg-card">
                <button
                    type="button"
                    className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                    onClick={onCancel}
                >
                    Kapat
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>
        </form>
    );
}
