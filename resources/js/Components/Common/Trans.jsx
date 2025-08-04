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

  // Process all component placeholders
  let result = [text];
  let keyIndex = 0;

  // Sort component keys by length (longest first) to avoid partial matches
  const sortedComponentKeys = Object.keys(components).sort((a, b) => b.length - a.length);

  for (const componentKey of sortedComponentKeys) {
    const placeholder = `:${componentKey}`;
    const newResult = [];

    for (const item of result) {
      if (typeof item === 'string' && item.includes(placeholder)) {
        const splitParts = item.split(placeholder);
        for (let i = 0; i < splitParts.length; i++) {
          if (splitParts[i]) {
            newResult.push(splitParts[i]);
          }
          if (i < splitParts.length - 1) {
            newResult.push(React.cloneElement(components[componentKey], { key: `comp-${keyIndex++}` }));
          }
        }
      } else {
        newResult.push(item);
      }
    }
    result = newResult;
  }

  // If result is just a single string, return it directly
  if (result.length === 1 && typeof result[0] === 'string') {
    return result[0];
  }

  // Return the array of mixed text and components
  return <>{result}</>;
}