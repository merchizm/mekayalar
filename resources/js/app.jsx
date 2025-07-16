import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { usePage } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME;

window.__ = (name, params = {}) => {
  const language = usePage().props?.localeLanguage || {};
  let sentence = language[name] ?? name;

  if (typeof sentence !== 'string') {
    sentence = String(sentence || name);
  }

  for (const [key, value] of Object.entries(params).sort(
    ([a], [b]) => b.length - a.length
  )) {
    sentence = sentence.replace(`:${key}`, value);
  }
  return sentence;
};

createInertiaApp({
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});
