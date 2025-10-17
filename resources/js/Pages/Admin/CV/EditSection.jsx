import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function EditSection({ section, cvData, existingProjects }) {
    const isMultipleItemSection = ['experience', 'education', 'projects', 'skills'].includes(section.name);
    const [currentLanguage, setCurrentLanguage] = useState('tr');

    // Initialize form data for current language
    const getCurrentLanguageData = (lang) => {
        if (!isMultipleItemSection) {
            return cvData[lang] || {};
        }

        // Special handling for skills section
        if (section.name === 'skills') {
            const skillsData = cvData[lang] || {};
            const skillsArray = [];

            // Convert categorized skills object to flat array
            for (const [category, skills] of Object.entries(skillsData)) {
                if (Array.isArray(skills)) {
                    skills.forEach((skill) => {
                        skillsArray.push({
                            ...skill,
                            category: category,
                        });
                    });
                }
            }

            return skillsArray;
        }

        return Array.isArray(cvData[lang]) ? cvData[lang] : [];
    };

    const [items, setItems] = useState(() => getCurrentLanguageData(currentLanguage));
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    // Update form data when language changes
    const switchLanguage = (newLang) => {
        setCurrentLanguage(newLang);
        const newItems = getCurrentLanguageData(newLang);
        console.log('Switching to language:', newLang, 'New items:', newItems);
        setItems(newItems);
    };

    // Add new item for multiple-item sections
    const addItem = () => {
        const newItem = {};
        section.questions.forEach((question) => {
            newItem[question.field_name] = question.input_type === 'date' ? '' : '';
        });

        const newItems = [...items, newItem];
        setItems(newItems);
    };

    // Add existing project (for projects section)
    const addExistingProject = (project) => {
        const newItems = [...items, project];
        setItems(newItems);
    };

    // Remove item
    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    // Update item field
    const updateItem = (index, fieldName, value) => {
        const newItems = [...items];
        newItems[index][fieldName] = value;
        setItems(newItems);
    };

    // Handle single-item section updates
    const updateSingleField = (fieldName, value) => {
        const newData = { ...items };
        newData[fieldName] = value;
        setItems(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare data for submission
        const formData = {};
        formData[currentLanguage] = isMultipleItemSection ? { items } : items;

        console.log('Submitting CV data:', formData);
        console.log('Items state:', items);
        console.log('Current language:', currentLanguage);
        console.log('Is multiple item section:', isMultipleItemSection);
        console.log('Route URL:', route('admin.cv.section.update', section.name));

        setProcessing(true);

        // Use router.post instead of useForm().post
        router.post(route('admin.cv.section.update', section.name), formData, {
            onSuccess: () => {
                console.log('CV data saved successfully');
                setProcessing(false);
            },
            onError: (responseErrors) => {
                console.error('CV save error:', responseErrors);
                setErrors(responseErrors);
                setProcessing(false);
            },
            onFinish: () => {
                console.log('Request finished');
                setProcessing(false);
            },
        });
    };

    const renderInput = (question, value = '', onChange) => {
        const inputClass =
            'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white';

        switch (question.input_type) {
            case 'textarea':
                return (
                    <textarea
                        className={`${inputClass} resize-none`}
                        rows={4}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                    />
                );

            case 'select':
                return (
                    <select className={inputClass} value={value || ''} onChange={(e) => onChange(e.target.value)}>
                        <option value="">Seçiniz</option>
                        {question.options &&
                            Object.entries(question.options).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                    </select>
                );

            case 'date':
                return (
                    <input
                        type="date"
                        className={inputClass}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                    />
                );

            case 'email':
                return (
                    <input
                        type="email"
                        className={inputClass}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                    />
                );

            case 'url':
                return (
                    <input
                        type="url"
                        className={inputClass}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        className={inputClass}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                    />
                );

            default:
                return (
                    <input
                        type="text"
                        className={inputClass}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                    />
                );
        }
    };

    return (
        <>
            <Head title={`${section.title_translations?.tr || section.name} - CV Düzenle`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {section.title_translations?.tr || section.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">CV bölümünüzü düzenleyin</p>
                    </div>
                    <div className="flex space-x-3">
                        <a
                            href={route('admin.cv.index')}
                            className="rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700"
                        >
                            Geri Dön
                        </a>
                    </div>
                </div>

                {/* Language Tabs */}
                <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                    <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
                        <button
                            type="button"
                            onClick={() => switchLanguage('tr')}
                            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                currentLanguage === 'tr'
                                    ? 'bg-white text-gray-900 shadow dark:bg-gray-600 dark:text-white'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        >
                            🇹🇷 Türkçe
                        </button>
                        <button
                            type="button"
                            onClick={() => switchLanguage('en')}
                            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                currentLanguage === 'en'
                                    ? 'bg-white text-gray-900 shadow dark:bg-gray-600 dark:text-white'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        >
                            🇬🇧 English
                        </button>
                    </div>
                </div>

                {/* Existing Projects Section (for projects only) */}
                {section.name === 'projects' && existingProjects && existingProjects.length > 0 && (
                    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Mevcut Projelerden Ekle
                        </h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {existingProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="rounded-lg border border-gray-200 p-4 dark:border-gray-600"
                                >
                                    <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                                    <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                                        {project.description?.substring(0, 100)}...
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => addExistingProject(project)}
                                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
                                    >
                                        CV'ye Ekle
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Action Buttons */}
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Şu an <strong>{currentLanguage === 'tr' ? 'Türkçe' : 'İngilizce'}</strong>{' '}
                                düzenliyorsunuz
                            </div>
                            {isMultipleItemSection && (
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700"
                                >
                                    Yeni Ekle
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Single Item Section */}
                    {!isMultipleItemSection && (
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {section.questions.map((question) => (
                                    <div
                                        key={question.id}
                                        className={question.input_type === 'textarea' ? 'md:col-span-2' : ''}
                                    >
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {question.label_translations?.tr || question.field_name}
                                            {question.is_required && <span className="ml-1 text-red-500">*</span>}
                                        </label>
                                        {renderInput(question, items[question.field_name] || '', (value) =>
                                            updateSingleField(question.field_name, value)
                                        )}
                                        {errors[`${currentLanguage}.${question.field_name}`] && (
                                            <div className="mt-1 text-sm text-red-500">
                                                {errors[`${currentLanguage}.${question.field_name}`]}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Multiple Items Section */}
                    {isMultipleItemSection && (
                        <div className="space-y-4">
                            {items.length === 0 ? (
                                <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-gray-800">
                                    <p className="mb-4 text-gray-500 dark:text-gray-400">
                                        Henüz {currentLanguage === 'tr' ? 'Türkçe' : 'İngilizce'} için{' '}
                                        {section.title_translations?.tr || section.name} bilgisi eklenmedi.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        İlk Öğeyi Ekle
                                    </button>
                                </div>
                            ) : (
                                items.map((item, index) => (
                                    <div key={index} className="rounded-lg bg-white shadow dark:bg-gray-800">
                                        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                {item.name || `${section.title_translations?.tr} #${index + 1}`}
                                                {item.is_from_projects && (
                                                    <span className="ml-2 rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                        Projelerden
                                                    </span>
                                                )}
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="text-red-600 transition-colors hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                {section.questions.map((question) => (
                                                    <div
                                                        key={question.id}
                                                        className={
                                                            question.input_type === 'textarea' ? 'md:col-span-2' : ''
                                                        }
                                                    >
                                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {question.label_translations?.tr || question.field_name}
                                                            {question.is_required && (
                                                                <span className="ml-1 text-red-500">*</span>
                                                            )}
                                                        </label>
                                                        {renderInput(
                                                            question,
                                                            item[question.field_name] || '',
                                                            (value) => updateItem(index, question.field_name, value)
                                                        )}
                                                        {errors[
                                                            `${currentLanguage}.items.${index}.${question.field_name}`
                                                        ] && (
                                                            <div className="mt-1 text-sm text-red-500">
                                                                {
                                                                    errors[
                                                                        `${currentLanguage}.items.${index}.${question.field_name}`
                                                                    ]
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

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
                            {processing
                                ? 'Kaydediliyor...'
                                : `${currentLanguage === 'tr' ? 'Türkçe' : 'İngilizce'} Kaydet`}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

EditSection.layout = (page) => <AdminLayout children={page} />;
