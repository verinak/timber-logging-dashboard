import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        title: 'Timber Console - All your logs in one place',
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                title: 'Log In | Timber',
            },
            {
                path: 'signup',
                component: RegisterComponent,
                title: 'Sign Up | Timber',
            },
        ],
    },
];
