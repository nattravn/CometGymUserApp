import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

// Functional interceptor with error handling (Angular 15+)
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                // Token expired or invalid - logout and redirect
                localStorage.removeItem('token');
                router.navigate(['/login']);
            }

            if (error.status === 403) {
                // Forbidden - user doesn't have permission
                router.navigate(['/access-denied']);
            }

            return throwError(() => error);
        })
    );
};
