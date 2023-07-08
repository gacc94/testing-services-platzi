import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component')
            .then(c => c.ProductsComponent)
    },
    {
        path: 'pico-preview',
        loadComponent: () => import('./pages/pico-preview/pico-preview.component')
            .then(c => c.PicoPreviewComponent),
    }
];
