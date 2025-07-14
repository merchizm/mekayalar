import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import MarkdownEditor from '@/Components/Admin/Posts/MarkdownEditor'; // Re-using the post markdown editor
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

  const formInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm";
  const formLabelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";
  const formHintClass = "mt-1 text-xs text-gray-500 dark:text-gray-400";
  const errorClass = "text-red-500 mt-1 text-xs";

  return (
    <AdminLayout user={auth.user}>
      <Head title="Yeni Proje Ekle" />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Yeni Proje Ekle</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Yeni bir proje oluşturun.</p>
        </div>
        <Link href={route('admin.projects.index')} className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition ease-in-out duration-150 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
          Geri Dön
        </Link>
      </div>

      <form onSubmit={submit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className={`${formLabelClass} required`}>Proje Başlığı</label>
                <input type="text" className={formInputClass} name="title" value={data.title} onChange={e => setData('title', e.target.value)} required />
                {errors.title && <div className={errorClass}>{errors.title}</div>}
              </div>

              <div>
                <label className={`${formLabelClass} required`}>Açıklama</label>
                <input type="text" className={formInputClass} name="description" value={data.description} onChange={e => setData('description', e.target.value)} required />
                <small className={formHintClass}>Kısa bir açıklama (SEO için de kullanılacak)</small>
                {errors.description && <div className={errorClass}>{errors.description}</div>}
              </div>

              <div>
                <label className={formLabelClass}>Etiketler</label>
                <TagInput
                  value={data.tags}
                  onChange={tags => setData('tags', tags)}
                  placeholder="Etiket ekleyin..."
                  className={formInputClass}
                />
                <small className={formHintClass}>Her bir etiketi yazıp Enter'a basarak ekleyebilirsiniz.</small>
                {errors.tags && <div className={errorClass}>{errors.tags}</div>}
              </div>

              <div>
                <label className={formLabelClass}>İçerik</label>
                <MarkdownEditor value={data.content} onChange={content => setData('content', content)} />
                <small className={formHintClass}>Markdown formatında içerik yazabilirsiniz</small>
                {errors.content && <div className={errorClass}>{errors.content}</div>}
              </div>
            </div>
            <div className="md:col-span-1 space-y-6">
              <div>
                <label className={`${formLabelClass} required`}>Proje Görseli</label>
                <input type="text" className={formInputClass} name="image" value={data.image} onChange={e => setData('image', e.target.value)} required />
                <small className={formHintClass}>Görselin URL'si. Örn: /images/project.png</small>
                {errors.image && <div className={errorClass}>{errors.image}</div>}
              </div>

              <div>
                <label className={formLabelClass}>Proje URL</label>
                <input type="url" className={formInputClass} name="url" value={data.url} onChange={e => setData('url', e.target.value)} />
                <small className={formHintClass}>Projenin yayınlandığı site adresi</small>
                {errors.url && <div className={errorClass}>{errors.url}</div>}
              </div>

              <div>
                <label className={formLabelClass}>GitHub URL</label>
                <input type="url" className={formInputClass} name="github_url" value={data.github_url} onChange={e => setData('github_url', e.target.value)} />
                <small className={formHintClass}>Projenin GitHub adresi</small>
                {errors.github_url && <div className={errorClass}>{errors.github_url}</div>}
              </div>

              <div>
                <label className={formLabelClass}>Tamamlanma Tarihi</label>
                <input type="date" className={formInputClass} name="completed_at" value={data.completed_at} onChange={e => setData('completed_at', e.target.value)} />
                {errors.completed_at && <div className={errorClass}>{errors.completed_at}</div>}
              </div>

              <div className="flex items-center">
                <input id="is_featured" name="is_featured" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} />
                <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Öne Çıkan Proje</label>
              </div>

              <div className="flex items-center">
                <input id="is_published" name="is_published" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={data.is_published} onChange={e => setData('is_published', e.target.checked)} />
                <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Yayınla</label>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" disabled={processing}>Projeyi Kaydet</button>
        </div>
      </form>
    </AdminLayout>
  );
} 
