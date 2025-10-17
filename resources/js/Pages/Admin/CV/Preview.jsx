import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CvPreview({ cvData, settings }) {
    const [selectedLanguage, setSelectedLanguage] = useState('tr');

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('tr-TR');
    };

    const currentData = cvData[selectedLanguage] || {};

    return (
        <>
            <Head title="CV Önizleme" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CV Önizleme</h1>
                        <p className="text-gray-600 dark:text-gray-400">CV'nizin son halini görüntüleyin</p>
                    </div>
                    <div className="flex space-x-3">
                        <a
                            href={route('admin.cv.download_pdf')}
                            className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700"
                        >
                            PDF İndir
                        </a>
                        <a
                            href={route('admin.cv.index')}
                            className="rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700"
                        >
                            Geri Dön
                        </a>
                    </div>
                </div>

                {/* Language Selector */}
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <div className="flex max-w-xs space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
                        <button
                            onClick={() => setSelectedLanguage('tr')}
                            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                selectedLanguage === 'tr'
                                    ? 'bg-white text-gray-900 shadow dark:bg-gray-600 dark:text-white'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        >
                            🇹🇷 Türkçe
                        </button>
                        <button
                            onClick={() => setSelectedLanguage('en')}
                            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                selectedLanguage === 'en'
                                    ? 'bg-white text-gray-900 shadow dark:bg-gray-600 dark:text-white'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        >
                            🇬🇧 English
                        </button>
                    </div>
                </div>

                {/* CV Preview */}
                <div className="rounded-lg bg-white shadow-lg dark:bg-gray-800">
                    <div className="mx-auto max-w-4xl p-8">
                        <div className="min-h-screen rounded-lg border border-gray-200 bg-white p-8">
                            {/* Header */}
                            <div className="mb-8 border-b border-gray-200 pb-6 text-center">
                                <h1
                                    className="mb-2 text-3xl font-bold text-gray-900"
                                    style={{ color: settings.template?.colors?.primary || '#2563eb' }}
                                >
                                    {currentData.personal_info?.full_name || 'Ad Soyad'}
                                </h1>
                                <h2
                                    className="mb-4 text-lg text-gray-600"
                                    style={{ color: settings.template?.colors?.secondary || '#1f2937' }}
                                >
                                    {currentData.personal_info?.title || 'Meslek/Unvan'}
                                </h2>
                                <div className="space-y-1 text-gray-600">
                                    {currentData.personal_info?.email && <div>{currentData.personal_info.email}</div>}
                                    {currentData.personal_info?.phone && <div>{currentData.personal_info.phone}</div>}
                                    {currentData.personal_info?.location && (
                                        <div>{currentData.personal_info.location}</div>
                                    )}
                                    {currentData.personal_info?.website && (
                                        <div>{currentData.personal_info.website}</div>
                                    )}
                                </div>
                            </div>

                            {/* Professional Summary */}
                            {currentData.summary?.professional_summary && (
                                <div className="mb-8">
                                    <h3
                                        className="mb-3 border-b border-gray-200 pb-1 text-xl font-semibold text-gray-900"
                                        style={{ color: settings.template?.colors?.primary || '#2563eb' }}
                                    >
                                        {selectedLanguage === 'tr' ? 'Profesyonel Özet' : 'Professional Summary'}
                                    </h3>
                                    <p
                                        className="rounded-lg border-l-4 bg-gray-50 p-4 leading-relaxed text-gray-700"
                                        style={{ borderColor: settings.template?.colors?.primary || '#2563eb' }}
                                    >
                                        {currentData.summary.professional_summary}
                                    </p>
                                </div>
                            )}

                            {/* Work Experience */}
                            {currentData.experience && currentData.experience.length > 0 && (
                                <div className="mb-8">
                                    <h3
                                        className="mb-4 border-b border-gray-200 pb-1 text-xl font-semibold text-gray-900"
                                        style={{ color: settings.template?.colors?.primary || '#2563eb' }}
                                    >
                                        {selectedLanguage === 'tr' ? 'İş Deneyimi' : 'Work Experience'}
                                    </h3>
                                    <div className="space-y-6">
                                        {currentData.experience.map((exp, index) => (
                                            <div
                                                key={index}
                                                className="border-l-2 pl-4"
                                                style={{ borderColor: settings.template?.colors?.primary || '#2563eb' }}
                                            >
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                                                        <div className="text-gray-600">
                                                            {exp.company}
                                                            {exp.location && `, ${exp.location}`}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(exp.start_date)} -{' '}
                                                        {exp.end_date
                                                            ? formatDate(exp.end_date)
                                                            : selectedLanguage === 'tr'
                                                              ? 'Devam Ediyor'
                                                              : 'Present'}
                                                    </div>
                                                </div>
                                                {exp.description && (
                                                    <p className="mb-2 text-sm text-gray-700">{exp.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills */}
                            {currentData.skills && Object.keys(currentData.skills).length > 0 && (
                                <div className="mb-8">
                                    <h3
                                        className="mb-4 border-b border-gray-200 pb-1 text-xl font-semibold text-gray-900"
                                        style={{ color: settings.template?.colors?.primary || '#2563eb' }}
                                    >
                                        {selectedLanguage === 'tr' ? 'Yetenekler' : 'Skills'}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {Object.entries(currentData.skills).map(([category, skills]) => (
                                            <div key={category}>
                                                <h4
                                                    className="mb-2 font-medium text-gray-900"
                                                    style={{ color: settings.template?.colors?.secondary || '#1f2937' }}
                                                >
                                                    {category}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                                                        >
                                                            {skill.skill_name}
                                                            {skill.level && ` (${skill.level})`}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {currentData.projects && currentData.projects.length > 0 && (
                                <div className="mb-8">
                                    <h3
                                        className="mb-4 border-b border-gray-200 pb-1 text-xl font-semibold text-gray-900"
                                        style={{ color: settings.template?.colors?.primary || '#2563eb' }}
                                    >
                                        {selectedLanguage === 'tr' ? 'Projeler' : 'Projects'}
                                    </h3>
                                    <div className="space-y-4">
                                        {currentData.projects.map((project, index) => (
                                            <div key={index} className="rounded-lg bg-gray-50 p-4">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                                                    {project.is_from_projects && (
                                                        <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                            {selectedLanguage === 'tr'
                                                                ? 'Projelerden'
                                                                : 'From Projects'}
                                                        </span>
                                                    )}
                                                </div>
                                                {project.description && (
                                                    <p className="mb-2 text-sm text-gray-700">{project.description}</p>
                                                )}
                                                {project.technologies && (
                                                    <div className="mb-2 text-xs text-gray-500">
                                                        <strong>
                                                            {selectedLanguage === 'tr'
                                                                ? 'Teknolojiler:'
                                                                : 'Technologies:'}
                                                        </strong>{' '}
                                                        {typeof project.technologies === 'string'
                                                            ? project.technologies
                                                            : project.technologies.join(', ')}
                                                    </div>
                                                )}
                                                <div className="space-y-1 text-xs text-gray-500">
                                                    {project.url && <div>URL: {project.url}</div>}
                                                    {project.github && project.github !== project.url && (
                                                        <div>GitHub: {project.github}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education */}
                            {currentData.education && currentData.education.length > 0 && (
                                <div className="mb-8">
                                    <h3
                                        className="mb-4 border-b border-gray-200 pb-1 text-xl font-semibold text-gray-900"
                                        style={{ color: settings.template?.colors?.primary || '#2563eb' }}
                                    >
                                        {selectedLanguage === 'tr' ? 'Eğitim' : 'Education'}
                                    </h3>
                                    <div className="space-y-4">
                                        {currentData.education.map((edu, index) => (
                                            <div key={index}>
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                                                        <div className="text-gray-600">{edu.institution}</div>
                                                        {edu.gpa && (
                                                            <div className="text-sm text-gray-500">
                                                                {selectedLanguage === 'tr' ? 'Not Ortalaması:' : 'GPA:'}{' '}
                                                                {edu.gpa}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-gray-500">{edu.graduation_year}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Empty State */}
                            {Object.keys(currentData).length === 0 && (
                                <div className="py-12 text-center">
                                    <div className="mb-4 text-gray-400">
                                        <svg
                                            className="mx-auto h-16 w-16"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                                        {selectedLanguage === 'tr' ? 'Henüz CV bilgisi yok' : 'No CV data yet'}
                                    </h3>
                                    <p className="mb-4 text-gray-600">
                                        {selectedLanguage === 'tr'
                                            ? 'CV bölümlerini doldurmaya başlayın'
                                            : 'Start filling out your CV sections'}
                                    </p>
                                    <a
                                        href={route('admin.cv.index')}
                                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                                    >
                                        {selectedLanguage === 'tr' ? 'CV Düzenlemeye Git' : 'Go to CV Editor'}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

CvPreview.layout = (page) => <AdminLayout children={page} />;
