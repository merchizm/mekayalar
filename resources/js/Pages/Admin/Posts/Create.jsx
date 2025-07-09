import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import CreatableSelect from 'react-select/creatable';
import MarkdownEditor from '@/Components/Admin/Posts/MarkdownEditor';

export default function Create({ auth, categories }) {
  const { data, setData, post, processing, errors } = useForm({
    post_title: '',
    post_slug: '',
    post_content: '',
    post_status: 'draft',
    post_category_id: '',
    post_tags: [],
    post_image: '',
    type: 'standard',
    url: '',
    description: '',
  });

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

  const formInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm";
  const formLabelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";
  const errorClass = "text-red-500 mt-1 text-xs";

  return (
    <AdminLayout user={auth.user}>
      <Head title="Yeni Gönderi Oluştur" />

      <form onSubmit={submit}>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Gönderi</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label htmlFor="post_title" className={formLabelClass}>Başlık</label>
                  <input
                    type="text"
                    className={formInputClass}
                    name="post_title"
                    value={data.post_title}
                    onChange={(e) => setData('post_title', e.target.value)}
                  />
                  {errors.post_title && <div className={errorClass}>{errors.post_title}</div>}
                </div>

                <div>
                  <label htmlFor="post_content" className={formLabelClass}>İçerik</label>
                  <MarkdownEditor
                    value={data.post_content}
                    onChange={(content) => setData('post_content', content)}
                  />
                  {errors.post_content && <div className={errorClass}>{errors.post_content}</div>}
                </div>
              </div>
              <div className="md:col-span-1 space-y-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                <div>
                  <label htmlFor="post_status" className={formLabelClass}>Durum</label>
                  <select className={formInputClass} value={data.post_status} onChange={e => setData('post_status', e.target.value)}>
                    <option value="published">Yayınlandı</option>
                    <option value="draft">Taslak</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="post_category_id" className={formLabelClass}>Kategori</label>
                  <select className={formInputClass} value={data.post_category_id} onChange={e => setData('post_category_id', e.target.value)}>
                    <option value="">Kategori Seçin</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="post_tags" className={formLabelClass}>Etiketler</label>
                  <CreatableSelect isMulti onChange={handleTagsChange} value={data.post_tags} options={[]} placeholder="Etiket seçin..." />
                </div>
                <div>
                  <label htmlFor="post_image" className={formLabelClass}>Öne Çıkan Görsel URL</label>
                  <input type="text" className={formInputClass} value={data.post_image} onChange={e => setData('post_image', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="description" className={formLabelClass}>Kısa Açıklama</label>
                  <textarea className={formInputClass} rows="3" value={data.description} onChange={e => setData('description', e.target.value)}></textarea>
                </div>
                <div>
                  <label htmlFor="type" className={formLabelClass}>Gönderi Tipi</label>
                  <select className={formInputClass} value={data.type} onChange={e => setData('type', e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
                {(data.type === 'video' || data.type === 'audio') && (
                  <div>
                    <label htmlFor="url" className={formLabelClass}>Kaynak URL</label>
                    <input type="text" className={formInputClass} value={data.url} onChange={e => setData('url', e.target.value)} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" disabled={processing}>
              Oluştur
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
} 
