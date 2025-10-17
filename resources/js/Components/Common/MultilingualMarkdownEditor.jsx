import React, { useState, useEffect } from 'react';
import MarkdownEditor from '@/Components/Admin/Posts/MarkdownEditor';

/**
 * MultilingualMarkdownEditor Component
 *
 * Bilingual markdown editor supporting format: [tr:]Turkish[:][en:]English[:]
 *
 * @param {string} value - Encoded multilingual value
 * @param {function} onChange - Callback when value changes, receives encoded string
 */
export default function MultilingualMarkdownEditor({ value = '', onChange }) {
    const [trValue, setTrValue] = useState('');
    const [enValue, setEnValue] = useState('');
    const [activeTab, setActiveTab] = useState('tr');

    // Parse encoded value on mount and when value prop changes
    useEffect(() => {
        if (!value) {
            setTrValue('');
            setEnValue('');
            return;
        }

        // Check if value has language markers
        if (value.includes('[tr:]') || value.includes('[en:]')) {
            // Extract Turkish content
            const trMatch = value.match(/\[tr:\](.*?)\[:\]/s);
            setTrValue(trMatch ? trMatch[1] : '');

            // Extract English content
            const enMatch = value.match(/\[en:\](.*?)\[:\]/s);
            setEnValue(enMatch ? enMatch[1] : '');
        } else {
            // Backward compatibility: plain text is treated as Turkish
            setTrValue(value);
            setEnValue('');
        }
    }, [value]);

    // Encode and emit changes
    const handleChange = (lang, newValue) => {
        const updatedTr = lang === 'tr' ? newValue : trValue;
        const updatedEn = lang === 'en' ? newValue : enValue;

        // Update local state
        if (lang === 'tr') {
            setTrValue(newValue);
        } else {
            setEnValue(newValue);
        }

        // Encode and emit
        const encoded = encodeMultilingual(updatedTr, updatedEn);
        onChange(encoded);
    };

    const encodeMultilingual = (tr, en) => {
        const parts = [];

        if (tr && tr.trim()) {
            parts.push(`[tr:]${tr}[:]`);
        }

        if (en && en.trim()) {
            parts.push(`[en:]${en}[:]`);
        }

        return parts.join('');
    };

    return (
        <div className="space-y-2">
            {/* Language tabs */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    onClick={() => setActiveTab('tr')}
                    className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === 'tr'
                            ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                    🇹🇷 Türkçe
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('en')}
                    className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === 'en'
                            ? 'border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                    🇬🇧 English
                </button>
            </div>

            {/* Turkish editor */}
            <div className={activeTab === 'tr' ? 'block' : 'hidden'}>
                <MarkdownEditor value={trValue} onChange={(newValue) => handleChange('tr', newValue)} />
            </div>

            {/* English editor */}
            <div className={activeTab === 'en' ? 'block' : 'hidden'}>
                <MarkdownEditor value={enValue} onChange={(newValue) => handleChange('en', newValue)} />
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
                İçeriği her iki dilde de girebilirsiniz / You can enter content in both languages
            </p>
        </div>
    );
}
