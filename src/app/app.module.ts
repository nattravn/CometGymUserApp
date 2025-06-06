import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AsyncClickDirective } from 'ngx-async-click';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        RouterModule,
        AppRoutingModule,
        MaterialModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        AsyncClickDirective,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
