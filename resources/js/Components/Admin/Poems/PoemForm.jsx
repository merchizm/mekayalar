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

  const formInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm";
  const formLabelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 space-y-4">
        <div>
          <label htmlFor="title" className={formLabelClass}>Başlık</label>
          <input type="text" className={formInputClass} id="add_title" name="title" required value={data.title} onChange={handleTitleChange} />
          {errors.title && <div className="text-red-500 mt-2 text-xs">{errors.title}</div>}
        </div>

        <div>
          <label htmlFor="content" className={formLabelClass}>Şiir</label>
          <textarea className={formInputClass} name="content" rows="5" required value={data.content} onChange={e => setData('content', e.target.value)}></textarea>
          {errors.content && <div className="text-red-500 mt-2 text-xs">{errors.content}</div>}
        </div>
        <div>
          <label htmlFor="status" className={formLabelClass}>Durum</label>
          <select className={formInputClass} name="status" required value={data.status} onChange={e => setData('status', e.target.value)}>
            <option value="published">Yayınla</option>
            <option value="draft">Taslak</option>
            <option value="trash">Çöp</option>
          </select>
          {errors.status && <div className="text-red-500 mt-2 text-xs">{errors.status}</div>}
        </div>
        <div>
          <label htmlFor="wrote_at" className={formLabelClass}>Yazılış Tarihi</label>
          <input type="datetime-local" className={formInputClass} name="wrote_at" required value={data.wrote_at} onChange={e => setData('wrote_at', e.target.value)} />
          {errors.wrote_at && <div className="text-red-500 mt-2 text-xs">{errors.wrote_at}</div>}
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-100 dark:bg-gray-800 flex justify-end space-x-2">
        <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600" onClick={onCancel}>Kapat</button>
        <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" disabled={processing}>
          {processing ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
} 
