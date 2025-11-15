import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigInGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '',
        loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule),
        canActivate: [SigInGuard], // double check protection at root
    },
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: '**', redirectTo: 'auth/login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
