import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    // if user exists, allow access
    if (auth.user()) return true;

    // else navigate to login
    router.navigate(['/login']);
    return false;
};
