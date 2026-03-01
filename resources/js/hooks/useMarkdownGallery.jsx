import { useCallback, useState } from 'react';
import FsLightbox from 'fslightbox-react';

export const useMarkdownGallery = () => {
    const [state, setState] = useState({ toggler: false, sources: [], slide: 1 });

    const onGalleryClick = useCallback((event) => {
        const item = event.target.closest('.md-gallery-item');
        if (!item) {
            return;
        }

        const gallery = item.closest('.md-gallery');
        if (!gallery) {
            return;
        }

        const items = Array.from(gallery.querySelectorAll('.md-gallery-item'));
        const sources = items.map((node) => node.getAttribute('data-src')).filter(Boolean);
        const index = items.indexOf(item);

        if (!sources.length || index === -1) {
            return;
        }

        setState((prev) => ({
            toggler: !prev.toggler,
            sources,
            slide: index + 1,
        }));
    }, []);

    const lightbox = <FsLightbox toggler={state.toggler} sources={state.sources} slide={state.slide} />;

    return { lightbox, onGalleryClick };
};
