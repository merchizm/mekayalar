import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CvIndex({ sections, cvData, settings }) {
    const getSectionProgress = (section, language = 'tr') => {
        const sectionData = cvData[language][section.name];
        if (!sectionData) return 0;
        
        if (Array.isArray(sectionData)) {
            return sectionData.length > 0 ? 100 : 0;
        } else if (typeof sectionData === 'object') {
            const filledFields = Object.values(sectionData).filter(value => 
                value !== null && value !== '' && value !== undefined
            ).length;
            const totalFields = Object.keys(sectionData).length;
            return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
        }
        
        return sectionData ? 100 : 0;
    };

    const getProgressColor = (progress) => {
        if (progress === 0) return 'bg-gray-300';
        if (progress < 50) return 'bg-red-400';
        if (progress < 100) return 'bg-yellow-400';
        return 'bg-green-400';
    };

    const getSectionIcon = (icon) => {
        const icons = {
            user: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            'document-text': (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            briefcase: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
            ),
            'academic-cap': (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            ),
            code: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            folder: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
            ),
        };
        return icons[icon] || icons.user;
    };

    return (
        <>
            <Head title="CV Yönetimi" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CV Yönetimi</h1>
                        <p className="text-gray-600 dark:text-gray-400">Kişisel CV bilgilerinizi yönetin</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link 
                            href={route('admin.cv.preview')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            CV Önizleme
                        </Link>
                        <Link 
                            href={route('admin.cv.download_pdf')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            PDF İndir
                        </Link>
                        <Link 
                            href={route('admin.cv.settings')}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Ayarlar
                        </Link>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tamamlanan Bölümler (TR)</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {sections.filter(section => getSectionProgress(section, 'tr') === 100).length}/{sections.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tamamlanan Bölümler (EN)</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {sections.filter(section => getSectionProgress(section, 'en') === 100).length}/{sections.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Görünürlük</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {settings.visibility?.show_on_public_site ? 'Aktif' : 'Pasif'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Şablon</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                                    {settings.template?.template || 'Modern'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CV Sections */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">CV Bölümleri</h2>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {sections.map((section) => {
                            const progressTr = getSectionProgress(section, 'tr');
                            const progressEn = getSectionProgress(section, 'en');
                            const sectionDataTr = cvData.tr[section.name];
                            const sectionDataEn = cvData.en[section.name];
                            // Special handling for skills section count
                            let itemCountTr = 0;
                            let itemCountEn = 0;
                            
                            if (section.name === 'skills') {
                                // Count total skills across all categories
                                if (sectionDataTr && typeof sectionDataTr === 'object') {
                                    itemCountTr = Object.values(sectionDataTr).reduce((total, skills) => {
                                        return total + (Array.isArray(skills) ? skills.length : 0);
                                    }, 0);
                                }
                                if (sectionDataEn && typeof sectionDataEn === 'object') {
                                    itemCountEn = Object.values(sectionDataEn).reduce((total, skills) => {
                                        return total + (Array.isArray(skills) ? skills.length : 0);
                                    }, 0);
                                }
                            } else {
                                itemCountTr = Array.isArray(sectionDataTr) ? sectionDataTr.length : (sectionDataTr ? 1 : 0);
                                itemCountEn = Array.isArray(sectionDataEn) ? sectionDataEn.length : (sectionDataEn ? 1 : 0);
                            }
                            
                            return (
                                <div key={section.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0 text-gray-400 dark:text-gray-500">
                                                {getSectionIcon(section.icon)}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {section.title_translations?.tr || section.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    🇹🇷 {itemCountTr} öğe • {progressTr}% | 🇬🇧 {itemCountEn} öğe • {progressEn}%
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-4">
                                            {/* Progress Bars */}
                                            <div className="flex flex-col space-y-1">
                                                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progressTr)}`}
                                                        style={{ width: `${progressTr}%` }}
                                                    ></div>
                                                </div>
                                                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progressEn)}`}
                                                        style={{ width: `${progressEn}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            {/* Edit Button */}
                                            <Link 
                                                href={route('admin.cv.section.edit', section.name)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                            >
                                                Düzenle
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

CvIndex.layout = page => <AdminLayout children={page} />;