import {
    ApplicationConfig,
    inject,
    provideAppInitializer,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { catchError, firstValueFrom, of } from 'rxjs';
import { credentialsInterceptor } from './interceptors/credientials/credentials.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptors([credentialsInterceptor])),
        // get authenticated user on app load
        provideAppInitializer(() => {
            const auth = inject(AuthService);
            return firstValueFrom(
                auth.loadUser().pipe(
                    catchError(() => of(null)), // start app even if user couldn't be loaded (logged out)
                ),
            );
        }),
    ],
};
