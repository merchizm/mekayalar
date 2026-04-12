import React, { useState, useEffect } from 'react';

/**
 * MultilingualInput Component
 *
 * Supports bilingual content entry with format: [tr:]Turkish[:][en:]English[:]
 * Can be used for text inputs or textareas
 *
 * @param {string} value - Encoded multilingual value or plain text
 * @param {function} onChange - Callback when value changes, receives encoded string
 * @param {string} type - 'text' or 'textarea'
 * @param {string} className - CSS classes for inputs
 * @param {boolean} required - Whether at least one language is required
 * @param {string} placeholder - Placeholder text
 */
export default function MultilingualInput({
    value = '',
    onChange,
    type = 'text',
    className = '',
    required = false,
    placeholder = '',
}) {
    const [trValue, setTrValue] = useState('');
    const [enValue, setEnValue] = useState('');

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

    const InputComponent = type === 'textarea' ? 'textarea' : 'input';
    const textareaProps = type === 'textarea' ? { rows: 4 } : {};

    return (
        <div className="space-y-4">
            <div>
                <div className="mb-1 flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                        🇹🇷 Türkçe {required && !enValue && <span className="text-destructive">*</span>}
                    </label>
                </div>
                <InputComponent
                    type={type === 'text' ? 'text' : undefined}
                    className={className}
                    value={trValue}
                    onChange={(e) => handleChange('tr', e.target.value)}
                    placeholder={placeholder ? `${placeholder} (Türkçe)` : 'Türkçe içerik...'}
                    required={required && !enValue}
                    {...textareaProps}
                />
            </div>

            <div>
                <div className="mb-1 flex items-center justify-between">
                    <label className="block text-sm font-medium text-foreground">
                        🇬🇧 English {required && !trValue && <span className="text-destructive">*</span>}
                    </label>
                </div>
                <InputComponent
                    type={type === 'text' ? 'text' : undefined}
                    className={className}
                    value={enValue}
                    onChange={(e) => handleChange('en', e.target.value)}
                    placeholder={placeholder ? `${placeholder} (English)` : 'English content...'}
                    required={required && !trValue}
                    {...textareaProps}
                />
            </div>

            {!required && (
                <p className="text-xs text-muted-foreground">
                    En az bir dil girilmelidir / At least one language must be entered
                </p>
            )}
        </div>
    );
}
