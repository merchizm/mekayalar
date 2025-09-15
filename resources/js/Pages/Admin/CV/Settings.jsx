import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CvSettings({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
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
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Geri Dön
                    </a>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Template Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Şablon Ayarları</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Template Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Şablon Türü
                                </label>
                                <select
                                    value={data.template.template}
                                    onChange={(e) => updateTemplate('template', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="modern">Modern</option>
                                    <option value="classic">Klasik</option>
                                    <option value="minimal">Minimal</option>
                                </select>
                            </div>

                            {/* Font Family */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Yazı Tipi
                                </label>
                                <select
                                    value={data.template.font_family}
                                    onChange={(e) => updateTemplate('font_family', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="Inter">Inter</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Open Sans">Open Sans</option>
                                    <option value="DejaVu Sans">DejaVu Sans</option>
                                </select>
                            </div>

                            {/* Primary Color */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ana Renk (Başlıklar, Vurgular)
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={data.template.colors.primary}
                                        onChange={(e) => updateTemplateColor('primary', e.target.value)}
                                        className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={data.template.colors.primary}
                                        onChange={(e) => updateTemplateColor('primary', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                        placeholder="#2563eb"
                                    />
                                </div>
                            </div>

                            {/* Secondary Color */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    İkincil Renk (Metin, Detaylar)
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={data.template.colors.secondary}
                                        onChange={(e) => updateTemplateColor('secondary', e.target.value)}
                                        className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={data.template.colors.secondary}
                                        onChange={(e) => updateTemplateColor('secondary', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                        placeholder="#1f2937"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quick Color Presets */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
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
                                        onClick={() => {
                                            updateTemplateColor('primary', preset.primary);
                                            updateTemplateColor('secondary', preset.secondary);
                                        }}
                                        className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="flex space-x-1">
                                                <div 
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: preset.primary }}
                                                ></div>
                                                <div 
                                                    className="w-3 h-3 rounded-full"
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
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Görünürlük Ayarları</h2>
                        
                        <div className="space-y-4">
                            {/* Show on Public Site */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Genel Sitede Göster</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">CV'nizi halka açık sitede görüntüleyin</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.visibility.show_on_public_site}
                                        onChange={(e) => updateVisibility('show_on_public_site', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {/* Allow PDF Download */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">PDF İndirmeye İzin Ver</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Ziyaretçiler CV'nizi PDF olarak indirebilir</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.visibility.allow_pdf_download}
                                        onChange={(e) => updateVisibility('allow_pdf_download', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {/* Show Contact Info */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">İletişim Bilgilerini Göster</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">E-posta, telefon gibi iletişim bilgilerini göster</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.visibility.show_contact_info}
                                        onChange={(e) => updateVisibility('show_contact_info', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-3">
                        <a
                            href={route('admin.cv.index')}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            İptal
                        </a>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

CvSettings.layout = page => <AdminLayout children={page} />;