import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/material/material.module';

import { AppMenuComponent } from './component/app-menu/app-menu.component';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { HttpLoadingInterceptor } from './errors/http-loading.interceptor';

@NgModule({
    declarations: [AppMenuComponent],
    imports: [CommonModule, MaterialModule, RouterModule],
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {}
