import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import MarkdownEditor from '@/Components/Admin/Posts/MarkdownEditor';
import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryManagerModal from '@/Components/Admin/Posts/CategoryManagerModal';
import { AnimatePresence, motion } from 'framer-motion';

export default function Edit({ auth, post, categories }) {
  const { data, setData, put, processing, errors } = useForm({
    post_title: post.post_title || '',
    post_content: post.post_content || '',
    post_category_id: post.post_category_id || '',
    post_tags: Array.isArray(post.post_tags) ? post.post_tags.map(tag => ({ value: tag, label: tag })) : [],
    post_image: post.post_image || '',
    description: post.description || '',
    post_status: post.post_status || 'published',
    type: post.type ? post.type.toString() : '0',
    url: post.url || '',
  });

  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [allCategories, setAllCategories] = useState(categories);

  const isStandardPost = data.type === '0';

  const animationProps = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3 },
    style: { overflow: 'hidden' }
  };

  const tagOptions = [];

  const handleTagsChange = (selectedOptions) => {
    setData('post_tags', selectedOptions || []);
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('admin.posts.update', post.id), {
      preserveScroll: true,
    });
  };

  const formInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 sm:text-sm";
  const formLabelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";
  const errorClass = "text-red-500 mt-1 text-xs";

  return (
    <AdminLayout user={auth.user}>
      <Head title="Gönderiyi Düzenle" />

      <form onSubmit={submit}>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gönderiyi Düzenle</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-6 md:col-span-2">
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

                <AnimatePresence>
                  {isStandardPost && (
                    <motion.div {...animationProps}>
                      <div className="pt-6">
                        <label htmlFor="post_content" className={formLabelClass}>İçerik</label>
                        <MarkdownEditor
                          value={data.post_content}
                          onChange={(content) => setData('post_content', content)}
                        />
                        {errors.post_content && <div className={errorClass}>{errors.post_content}</div>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="p-4 space-y-6 bg-gray-50 rounded-lg border md:col-span-1 dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <label htmlFor="post_status" className={formLabelClass}>Durum</label>
                  <select className={formInputClass} value={data.post_status} onChange={e => setData('post_status', e.target.value)}>
                    <option value="published">Yayınlandı</option>
                    <option value="draft">Taslak</option>
                  </select>
                </div>

                <AnimatePresence>
                  {isStandardPost && (
                    <motion.div {...animationProps}>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="post_category_id" className={formLabelClass}>Kategori</label>
                          <div className="flex items-center space-x-2">
                            <select className={formInputClass + " flex-grow"} value={data.post_category_id} onChange={e => setData('post_category_id', e.target.value)}>
                              <option value="">Kategori Seçin</option>
                              {Array.isArray(allCategories) && allCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                              ))}
                            </select>
                            <button type="button" onClick={() => setIsCategoryManagerOpen(true)} className="p-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Yönet</button>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="post_tags" className={formLabelClass}>Etiketler</label>
                          <CreatableSelect isMulti onChange={handleTagsChange} value={data.post_tags} options={tagOptions} placeholder="Etiket seçin..." />
                        </div>
                        <div>
                          <label htmlFor="description" className={formLabelClass}>Kısa Açıklama</label>
                          <textarea className={formInputClass} rows="3" value={data.description} onChange={e => setData('description', e.target.value)}></textarea>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label htmlFor="post_image" className={formLabelClass}>Öne Çıkan Görsel URL</label>
                  <input type="text" className={formInputClass} value={data.post_image} onChange={e => setData('post_image', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="type" className={formLabelClass}>Gönderi Tipi</label>
                  <select className={formInputClass} value={data.type} onChange={e => setData('type', e.target.value)}>
                    <option value="0">Standart</option>
                    <option value="1">Resim</option>
                    <option value="2">Çizim</option>
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
          <div className="flex justify-end px-5 py-4 border-t border-gray-200 dark:border-gray-700">
            <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" disabled={processing}>
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
