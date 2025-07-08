import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    resolve: name => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/dashboard.tsx')),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
