import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

import { AsyncClickDirective } from 'ngx-async-click';

import { MaterialModule } from '@app/core/material/material.module';
import { CustumerComponent } from '@app/secure/component/custumer/custumer.component';

import { AppMenuComponent } from './component/app-menu/app-menu.component';
import { HomeComponent } from './component/home/home.component';
import { SecureRoutingModule } from './secure.routing.module';

@NgModule({
    declarations: [HomeComponent, AppMenuComponent, CustumerComponent],
    imports: [
        CommonModule,
        RouterModule,
        SecureRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterLink,
        AsyncClickDirective,
        //BrowserAnimationsModule, // required animations module
        //ToastrModule.forRoot(), // ToastrModule added
    ],
    // providers: [
    //     {
    //         provide: ErrorHandler,
    //         useClass: GlobalErrorHandler,
    //     },
    //     {
    //         provide: HTTP_INTERCEPTORS,
    //         useClass: HttpLoadingInterceptor,
    //         multi: true,
    //     },
    // ],
})
export class SecureModule {}
