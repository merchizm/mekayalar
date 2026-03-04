import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CvSettings({ settings }) {
    const { data, setData, post, processing } = useForm({
        template: settings.template || {
            template: 'modern',
            colors: {
                primary: '#2563eb',
                secondary: '#1f2937',
            },
            font_family: 'Inter',
        },
        visibility: settings.visibility || {
            show_on_public_site: true,
            allow_pdf_download: true,
            show_contact_info: true,
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.cv.settings.update'));
    };

    const updateTemplate = (key, value) => {
        setData('template', {
            ...data.template,
            [key]: value,
        });
    };

    const updateTemplateColor = (colorKey, value) => {
        setData('template', {
            ...data.template,
            colors: {
                ...data.template.colors,
                [colorKey]: value,
            },
        });
    };

    const applyTemplatePreset = (preset) => {
        setData('template', {
            ...data.template,
            colors: {
                primary: preset.primary,
                secondary: preset.secondary,
            },
        });
    };

    const updateVisibility = (key, value) => {
        setData('visibility', {
            ...data.visibility,
            [key]: value,
        });
    };

    return (
        <>
            <Head title="CV Ayarları" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CV Ayarları</h1>
                        <p className="text-gray-600 dark:text-gray-400">CV görünümü ve görünürlük ayarları</p>
                    </div>
                    <a
                        href={route('admin.cv.index')}
                        className="rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700"
                    >
                        Geri Dön
                    </a>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Template Settings */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Şablon Ayarları</h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Template Type */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Şablon Türü
                                </label>
                                <select
                                    value={data.template.template}
                                    onChange={(e) => updateTemplate('template', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="modern">Modern</option>
                                    <option value="classic">Klasik</option>
                                    <option value="minimal">Minimal</option>
                                </select>
                            </div>

                            {/* Font Family */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Yazı Tipi
                                </label>
                                <select
                                    value={data.template.font_family}
                                    onChange={(e) => updateTemplate('font_family', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="Inter">Inter</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Open Sans">Open Sans</option>
                                    <option value="DejaVu Sans">DejaVu Sans</option>
                                </select>
                            </div>

                            {/* Primary Color */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Ana Renk (Başlıklar, Vurgular)
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={data.template.colors.primary}
                                        onChange={(e) => updateTemplateColor('primary', e.target.value)}
                                        className="h-10 w-12 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
                                    />
                                    <input
                                        type="text"
                                        value={data.template.colors.primary}
                                        onChange={(e) => updateTemplateColor('primary', e.target.value)}
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="#2563eb"
                                    />
                                </div>
                            </div>

                            {/* Secondary Color */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    İkincil Renk (Metin, Detaylar)
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={data.template.colors.secondary}
                                        onChange={(e) => updateTemplateColor('secondary', e.target.value)}
                                        className="h-10 w-12 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
                                    />
                                    <input
                                        type="text"
                                        value={data.template.colors.secondary}
                                        onChange={(e) => updateTemplateColor('secondary', e.target.value)}
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="#1f2937"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quick Color Presets */}
                        <div className="mt-6">
                            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Hazır Renk Paletleri
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { name: 'Profesyonel Mavi', primary: '#2563eb', secondary: '#1f2937' },
                                    { name: 'Kurumsal Gri', primary: '#374151', secondary: '#111827' },
                                    { name: 'Yaratıcı Mor', primary: '#7c3aed', secondary: '#374151' },
                                    { name: 'Teknoloji Yeşili', primary: '#059669', secondary: '#111827' },
                                    { name: 'Modern Teal', primary: '#0d9488', secondary: '#1f2937' },
                                ].map((preset) => (
                                    <button
                                        key={preset.name}
                                        type="button"
                                        onClick={() => applyTemplatePreset(preset)}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="flex space-x-1">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: preset.primary }}
                                                ></div>
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: preset.secondary }}
                                                ></div>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">{preset.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Visibility Settings */}
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Görünürlük Ayarları
                        </h2>

                        <div className="space-y-4">
                            {/* Show on Public Site */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        Genel Sitede Göster
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        CV'nizi halka açık sitede görüntüleyin
                                    </p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.visibility.show_on_public_site}
                                        onChange={(e) => updateVisibility('show_on_public_site', e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                </label>
                            </div>

                            {/* Allow PDF Download */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        PDF İndirmeye İzin Ver
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Ziyaretçiler CV'nizi PDF olarak indirebilir
                                    </p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.visibility.allow_pdf_download}
                                        onChange={(e) => updateVisibility('allow_pdf_download', e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                </label>
                            </div>

                            {/* Show Contact Info */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        İletişim Bilgilerini Göster
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        E-posta, telefon gibi iletişim bilgilerini göster
                                    </p>
                                </div>
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.visibility.show_contact_info}
                                        onChange={(e) => updateVisibility('show_contact_info', e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-3">
                        <a
                            href={route('admin.cv.index')}
                            className="rounded-lg bg-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-400"
                        >
                            İptal
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

CvSettings.layout = (page) => <AdminLayout children={page} />;
