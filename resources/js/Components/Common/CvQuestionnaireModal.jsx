import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export default function CvQuestionnaireModal({ isOpen, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        purpose: '', // job_application, general_view
        industry: '', // tech, finance, healthcare, education, entertainment, other
        language: 'tr', // tr, en
        role_focus: '', // backend, frontend, fullstack, devops
    });

    const questions = [
        {
            id: 'purpose',
            title: "CV'yi hangi amaçla görüntülemek istiyorsunuz?",
            titleEn: 'What is the purpose of viewing my CV?',
            options: [
                { value: 'job_application', label: 'İş başvurusu için', labelEn: 'For job application' },
                { value: 'general_view', label: 'Genel inceleme', labelEn: 'General review' },
            ],
        },
        {
            id: 'industry',
            title: 'Hangi sektördesiniz?',
            titleEn: 'What industry are you in?',
            options: [
                { value: 'tech', label: 'Teknoloji', labelEn: 'Technology' },
                { value: 'finance', label: 'Finans', labelEn: 'Finance' },
                { value: 'healthcare', label: 'Sağlık', labelEn: 'Healthcare' },
                { value: 'education', label: 'Eğitim', labelEn: 'Education' },
                { value: 'entertainment', label: 'Oyun/Eğlence', labelEn: 'Entertainment' },
                { value: 'other', label: 'Diğer', labelEn: 'Other' },
            ],
        },
        {
            id: 'language',
            title: 'Hangi dilde CV görmek istiyorsunuz?',
            titleEn: 'Which language would you like to view the CV in?',
            options: [
                { value: 'tr', label: 'Türkçe', labelEn: 'Turkish' },
                { value: 'en', label: 'İngilizce', labelEn: 'English' },
            ],
        },
        {
            id: 'role_focus',
            title: "Hangi alanda odaklı CV'mi görmek istiyorsunuz?",
            titleEn: 'Which area-focused CV would you like to view?',
            options: [
                { value: 'fullstack', label: 'Full-stack Developer', labelEn: 'Full-stack Developer' },
                { value: 'backend', label: 'Backend Developer', labelEn: 'Backend Developer' },
                { value: 'frontend', label: 'Frontend Developer', labelEn: 'Frontend Developer' },
                { value: 'devops', label: 'DevOps Engineer', labelEn: 'DevOps Engineer' },
            ],
        },
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
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
            source: 'questionnaire',
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

    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:p-0">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-background/70 transition-opacity" onClick={onClose}></div>

                {/* Modal */}
                <div className="relative inline-block transform overflow-hidden rounded-lg bg-background px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-background sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                    <div>
                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="mb-2 flex justify-between">
                                <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                                    Adım {currentStep + 1} / {questions.length}
                                </span>
                                <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">
                                    {Math.round(((currentStep + 1) / questions.length) * 100)}%
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-border dark:bg-border">
                                <div
                                    className="h-2 rounded-full bg-primary transition-all duration-300 ease-out dark:bg-primary"
                                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-6">
                            <h3 className="mb-4 text-lg font-medium text-foreground dark:text-foreground">
                                {currentQuestion.title}
                            </h3>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex cursor-pointer items-center rounded-lg border-2 p-4 transition-colors ${
                                            currentAnswer === option.value
                                                ? 'border-primary bg-primary/10 dark:border-primary dark:bg-primary/20'
                                                : 'border-border hover:bg-accent dark:border-border dark:hover:bg-accent'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name={currentQuestion.id}
                                            value={option.value}
                                            checked={currentAnswer === option.value}
                                            onChange={() => handleAnswer(currentQuestion.id, option.value)}
                                            className="h-4 w-4 border-border text-primary focus:ring-2 focus:ring-ring dark:border-border dark:bg-secondary dark:text-primary dark:ring-offset-background dark:focus:ring-ring"
                                        />
                                        <span className="ml-3 text-sm font-medium text-foreground dark:text-foreground">
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
                            className="inline-flex justify-center rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent dark:focus:ring-ring"
                        >
                            İptal
                        </button>

                        <div className="flex space-x-3">
                            {currentStep > 0 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="inline-flex justify-center rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-border dark:bg-secondary dark:text-foreground dark:hover:bg-accent dark:focus:ring-ring"
                                >
                                    Geri
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!currentAnswer}
                                className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    currentAnswer
                                        ? 'bg-primary text-background hover:opacity-90 focus:ring-ring dark:bg-primary dark:text-background dark:focus:ring-ring'
                                        : 'cursor-not-allowed bg-border text-muted-foreground opacity-50 dark:bg-border dark:text-muted-foreground'
                                }`}
                            >
                                {isLastStep ? "CV'yi Görüntüle" : 'Devam Et'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
