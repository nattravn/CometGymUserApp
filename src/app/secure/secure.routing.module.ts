import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/guards/auth.guard';

import { AppMenuComponent } from './component/app-menu/app-menu.component';
import { AddCustomerComponent } from './component/customer/add-customer/add-customer.component';
import { CustomerComponent } from './component/customer/customer.component';
import { HomeComponent } from './component/home/home.component';
import { UserRoleComponent } from './component/user/user-role/user-role.component';
import { UserComponent } from './component/user/user.component';

export const routes: Routes = [
    {
        path: '',
        component: AppMenuComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'userrole', component: UserRoleComponent, canActivate: [AuthGuard] },
            { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
            { path: 'customer/add', component: AddCustomerComponent, canActivate: [AuthGuard] },
            { path: 'customer/edit/:code', component: AddCustomerComponent, canActivate: [AuthGuard] },
            { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
            //{ path: 'user', component: UserComponent, canActivate: [authGuard] },
            // other secure routes
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SecureRoutingModule {}
