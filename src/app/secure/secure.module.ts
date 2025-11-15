import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

import { AsyncClickDirective } from 'ngx-async-click';

import { MaterialModule } from '@app/core/material/material.module';

import { AppMenuComponent } from './component/app-menu/app-menu.component';
import { AddCustomerComponent } from './component/customer/add-customer/add-customer.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CustomerService } from './component/customer/service/customer.service';
import { HomeComponent } from './component/home/home.component';
import { UserRoleComponent } from './component/user/user-role/user-role.component';
import { UserUpdateComponent } from './component/user/user-update/user-update.component';
import { UserComponent } from './component/user/user.component';
import { SecureRoutingModule } from './secure.routing.module';
import { UserService } from './services/user.service';

@NgModule({
    declarations: [
        HomeComponent,
        AppMenuComponent,
        CustomerComponent,
        AddCustomerComponent,
        UserComponent,
        UserUpdateComponent,
        UserRoleComponent,
    ],
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
    providers: [CustomerService, UserService],
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
