import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const toastr = inject(ToastrService);

    return next(req).pipe(
        catchError((err) => {
            // Network error
            if (err.status === 0) {
                toastr.error('Unable to connect to the server.');
            }

            //  server error
            if (err.status >= 500) {
                console.error('Server error');
                toastr.error('An error occured. Please try again.');
            }

            // let component handle specific errors
            return throwError(() => err);
        }),
    );
};
