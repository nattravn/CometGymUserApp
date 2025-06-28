import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink, RouterModule } from '@angular/router';

import { AsyncClickDirective } from 'ngx-async-click';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { MaterialModule } from './core/material/material.module';
import { jwtInterceptor } from './secure/errors/jwt.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        RouterModule,
        RouterLink,
        AppRoutingModule,
        MaterialModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        AsyncClickDirective,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [provideHttpClient(withInterceptors([jwtInterceptor]))],
    bootstrap: [AppComponent],
})
export class AppModule {}
