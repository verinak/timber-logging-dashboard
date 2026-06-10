import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        title: 'Timber Console - All your logs in one place',
    },
];
