import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/guards/auth.guard';

import { AppMenuComponent } from './component/app-menu/app-menu.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: AppMenuComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            // other secure routes
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SecureRoutingModule {}
