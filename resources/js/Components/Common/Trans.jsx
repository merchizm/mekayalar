import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Trans({ i18nKey, components = {}, values = {} }) {
  const language = usePage().props?.localeLanguage || {};
  let text = language[i18nKey] ?? i18nKey;
  
  // Ensure text is a string
  if (typeof text !== 'string') {
    text = String(text || i18nKey);
  }

  // Replace simple values first
  for (const [key, value] of Object.entries(values).sort(
    ([a], [b]) => b.length - a.length
  )) {
    text = text.replace(`:${key}`, value);
  }

  // Handle component interpolation
  if (Object.keys(components).length === 0) {
    return text;
  }

  // Split text by component placeholders and rebuild with JSX
  const parts = [];
  let remainingText = text;
  let keyIndex = 0;

  // Sort component keys by length (longest first) to avoid partial matches
  const sortedComponentKeys = Object.keys(components).sort((a, b) => b.length - a.length);

  for (const componentKey of sortedComponentKeys) {
    const placeholder = `:${componentKey}`;
    const splitParts = remainingText.split(placeholder);
    
    if (splitParts.length > 1) {
      const newParts = [];
      for (let i = 0; i < splitParts.length; i++) {
        if (i > 0) {
          newParts.push(React.cloneElement(components[componentKey], { key: `comp-${keyIndex++}` }));
        }
        if (splitParts[i]) {
          newParts.push(splitParts[i]);
        }
      }
      remainingText = newParts;
      break;
    }
  }

  // If no components were replaced, return the text
  if (typeof remainingText === 'string') {
    return remainingText;
  }

  // Return the array of mixed text and components
  return <>{remainingText}</>;
}