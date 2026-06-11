import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { DashboardAppsComponent } from './pages/dashboard-apps/dashboard-apps.component';
import { ApplicationDetailsComponent } from './pages/application-details/application-details.component';
import { authGuard } from './guards/auth/auth.guard';

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
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                component: DashboardHomeComponent,
                title: 'Dashboard | Timber',
            },
            {
                path: 'all-apps',
                component: DashboardAppsComponent,
                title: 'My Apps | Timber',
            },
            {
                path: 'app/:appId',
                component: ApplicationDetailsComponent,
                title: 'App Details | Timber',
            },
        ],
    },
];
