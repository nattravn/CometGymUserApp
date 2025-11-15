import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuGuard } from '@app/core/guards/menu.guard';

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
            { path: 'userrole', component: UserRoleComponent, canActivate: [MenuGuard] },
            { path: 'customer', component: CustomerComponent, canActivate: [MenuGuard] },
            { path: 'customer/add', component: AddCustomerComponent, canActivate: [MenuGuard] },
            { path: 'customer/edit/:code', component: AddCustomerComponent, canActivate: [MenuGuard] },
            { path: 'user', component: UserComponent, canActivate: [MenuGuard] },
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
