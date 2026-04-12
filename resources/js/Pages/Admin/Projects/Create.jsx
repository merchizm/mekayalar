import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import MultilingualInput from '@/Components/Common/MultilingualInput';
import MultilingualMarkdownEditor from '@/Components/Common/MultilingualMarkdownEditor';
import TagInput from '@/Components/Common/TagInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        content: '',
        image: '',
        url: '',
        github_url: '',
        completed_at: '',
        is_featured: false,
        is_published: true,
        tags: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.projects.store'), {
            onSuccess: () => toast.success('Proje başarıyla oluşturuldu!'),
            onError: (e) => {
                console.error(e);
                toast.error('Proje oluşturulurken bir hata oluştu.');
            },
        });
    };

    const formInputClass =
        'mt-1 block w-full rounded-md border-input shadow-sm focus:border-ring focus:ring-ring dark:bg-secondary dark:border-border dark:text-foreground sm:text-sm';
    const formLabelClass = 'block text-sm font-medium text-muted-foreground dark:text-muted-foreground';
    const formHintClass = 'mt-1 text-xs text-muted-foreground dark:text-muted-foreground';
    const errorClass = 'text-destructive mt-1 text-xs';

    return (
        <AdminLayout user={auth.user}>
            <Head title="Yeni Proje Ekle" />

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground dark:text-foreground">Yeni Proje Ekle</h2>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
                        Yeni bir proje oluşturun.
                    </p>
                </div>
                <Link
                    href={route('admin.projects.index')}
                    className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 font-semibold text-muted-foreground shadow-sm transition duration-150 ease-in-out hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:bg-secondary dark:text-foreground dark:hover:bg-accent"
                >
                    Geri Dön
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="rounded-lg border border-border bg-card shadow-sm dark:border-border dark:bg-card"
            >
                <div className="p-5">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="space-y-6 md:col-span-2">
                            <div>
                                <label className={`${formLabelClass} required`}>Proje Başlığı</label>
                                <MultilingualInput
                                    type="text"
                                    value={data.title}
                                    onChange={(title) => setData('title', title)}
                                    className={formInputClass}
                                    required={true}
                                />
                                {errors.title && <div className={errorClass}>{errors.title}</div>}
                            </div>

                            <div>
                                <label className={`${formLabelClass} required`}>Açıklama</label>
                                <MultilingualInput
                                    type="textarea"
                                    value={data.description}
                                    onChange={(description) => setData('description', description)}
                                    className={formInputClass}
                                    required={true}
                                />
                                <small className={formHintClass}>Kısa bir açıklama (SEO için de kullanılacak)</small>
                                {errors.description && <div className={errorClass}>{errors.description}</div>}
                            </div>

                            <div>
                                <label className={formLabelClass}>Etiketler</label>
                                <TagInput
                                    value={data.tags}
                                    onChange={(tags) => setData('tags', tags)}
                                    placeholder="Etiket ekleyin..."
                                    className={formInputClass}
                                />
                                <small className={formHintClass}>
                                    Her bir etiketi yazıp Enter'a basarak ekleyebilirsiniz.
                                </small>
                                {errors.tags && <div className={errorClass}>{errors.tags}</div>}
                            </div>

                            <div>
                                <label className={formLabelClass}>İçerik</label>
                                <MultilingualMarkdownEditor
                                    value={data.content}
                                    onChange={(content) => setData('content', content)}
                                />
                                <small className={formHintClass}>Markdown formatında içerik yazabilirsiniz</small>
                                {errors.content && <div className={errorClass}>{errors.content}</div>}
                            </div>
                        </div>
                        <div className="space-y-6 md:col-span-1">
                            <div>
                                <label className={`${formLabelClass} required`}>Proje Görseli</label>
                                <input
                                    type="text"
                                    className={formInputClass}
                                    name="image"
                                    value={data.image}
                                    onChange={(e) => setData('image', e.target.value)}
                                    required
                                />
                                <small className={formHintClass}>Görselin URL'si. Örn: /images/project.png</small>
                                {errors.image && <div className={errorClass}>{errors.image}</div>}
                            </div>

                            <div>
                                <label className={formLabelClass}>Proje URL</label>
                                <input
                                    type="url"
                                    className={formInputClass}
                                    name="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                />
                                <small className={formHintClass}>Projenin yayınlandığı site adresi</small>
                                {errors.url && <div className={errorClass}>{errors.url}</div>}
                            </div>

                            <div>
                                <label className={formLabelClass}>GitHub URL</label>
                                <input
                                    type="url"
                                    className={formInputClass}
                                    name="github_url"
                                    value={data.github_url}
                                    onChange={(e) => setData('github_url', e.target.value)}
                                />
                                <small className={formHintClass}>Projenin GitHub adresi</small>
                                {errors.github_url && <div className={errorClass}>{errors.github_url}</div>}
                            </div>

                            <div>
                                <label className={formLabelClass}>Tamamlanma Tarihi</label>
                                <input
                                    type="date"
                                    className={formInputClass}
                                    name="completed_at"
                                    value={data.completed_at}
                                    onChange={(e) => setData('completed_at', e.target.value)}
                                />
                                {errors.completed_at && <div className={errorClass}>{errors.completed_at}</div>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="is_featured"
                                    name="is_featured"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                />
                                <label
                                    htmlFor="is_featured"
                                    className="ml-2 block text-sm text-foreground dark:text-muted-foreground"
                                >
                                    Öne Çıkan Proje
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="is_published"
                                    name="is_published"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                />
                                <label
                                    htmlFor="is_published"
                                    className="ml-2 block text-sm text-foreground dark:text-muted-foreground"
                                >
                                    Yayınla
                                </label>
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
                        Projeyi Kaydet
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
