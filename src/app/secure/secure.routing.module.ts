import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { CustumerComponent } from '@app/secure/component/custumer/custumer.component';

import { AppMenuComponent } from './component/app-menu/app-menu.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: AppMenuComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'userrole', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'customer', component: CustumerComponent, canActivate: [AuthGuard] },
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
