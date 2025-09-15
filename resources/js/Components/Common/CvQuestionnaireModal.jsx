import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function CvQuestionnaireModal({ isOpen, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        purpose: '', // job_application, general_view, employer_review, academic_application
        industry: '', // tech, finance, healthcare, education, other
        language: 'tr', // tr, en
        role_focus: '', // backend, frontend, fullstack, devops
    });

    const questions = [
        {
            id: 'purpose',
            title: 'CV\'nizi hangi amaçla görüntülemek istiyorsunuz?',
            titleEn: 'What is the purpose of viewing your CV?',
            options: [
                { value: 'job_application', label: 'İş başvurusu için', labelEn: 'For job application' },
                { value: 'general_view', label: 'Genel inceleme', labelEn: 'General review' },
                { value: 'employer_review', label: 'İşveren olarak değerlendirme', labelEn: 'As an employer review' },
                { value: 'academic_application', label: 'Akademik başvuru', labelEn: 'Academic application' },
            ]
        },
        {
            id: 'industry',
            title: 'Hangi sektörde çalışıyorsunuz veya başvuru yapacaksınız?',
            titleEn: 'Which industry are you working in or applying to?',
            options: [
                { value: 'tech', label: 'Teknoloji', labelEn: 'Technology' },
                { value: 'finance', label: 'Finans', labelEn: 'Finance' },
                { value: 'healthcare', label: 'Sağlık', labelEn: 'Healthcare' },
                { value: 'education', label: 'Eğitim', labelEn: 'Education' },
                { value: 'other', label: 'Diğer', labelEn: 'Other' },
            ]
        },
        {
            id: 'language',
            title: 'Hangi dilde CV görmek istiyorsunuz?',
            titleEn: 'Which language would you like to view the CV in?',
            options: [
                { value: 'tr', label: 'Türkçe', labelEn: 'Turkish' },
                { value: 'en', label: 'İngilizce', labelEn: 'English' },
            ]
        },
        {
            id: 'role_focus',
            title: 'Hangi alanda odaklı CV\'mi görmek istiyorsunuz?',
            titleEn: 'Which area-focused CV would you like to view?',
            options: [
                { value: 'fullstack', label: 'Full-stack Developer', labelEn: 'Full-stack Developer' },
                { value: 'backend', label: 'Backend Developer', labelEn: 'Backend Developer' },
                { value: 'frontend', label: 'Frontend Developer', labelEn: 'Frontend Developer' },
                { value: 'devops', label: 'DevOps Engineer', labelEn: 'DevOps Engineer' },
            ]
        },
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinish();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinish = () => {
        // Build download URL with parameters
        const params = new URLSearchParams({
            lang: answers.language,
            purpose: answers.purpose,
            industry: answers.industry,
            role_focus: answers.role_focus,
            source: 'questionnaire'
        });

        // Check if user wants to view online or download PDF
        if (answers.purpose === 'general_view') {
            // Redirect to CV preview page
            window.location.href = `/cv?${params.toString()}`;
        } else {
            // Download PDF
            window.location.href = `/cv/download?${params.toString()}`;
        }

        onClose();
    };

    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];
    const isLastStep = currentStep === questions.length - 1;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75" 
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Adım {currentStep + 1} / {questions.length}
                                </span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {Math.round(((currentStep + 1) / questions.length) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                {currentQuestion.title}
                            </h3>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map((option) => (
                                    <label 
                                        key={option.value}
                                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                                            currentAnswer === option.value
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={currentQuestion.id}
                                            value={option.value}
                                            checked={currentAnswer === option.value}
                                            onChange={() => handleAnswer(currentQuestion.id, option.value)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                            İptal
                        </button>

                        <div className="flex space-x-3">
                            {currentStep > 0 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                >
                                    Geri
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!currentAnswer}
                                className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    currentAnswer
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {isLastStep ? 'CV\'yi Görüntüle' : 'Devam Et'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}