import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppMenuComponent } from './component/app-menu/app-menu.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: AppMenuComponent,
        children: [{ path: 'home', component: HomeComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SecureRoutingModule {}
//export const CoreRoutingModule = RouterModule.forChild(routes);
