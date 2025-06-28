import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const _token = localStorage.getItem('token');
    const jwtToken = req.clone({
        setHeaders: {
            Authorization: `bearer ${_token}`,
        },
    });
    return next(jwtToken);
};
