import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/core/material/material.module';

import { ErrorDialogService } from '../core/errors/error-dialog.service';
import { ErrorDialogComponent } from '../core/errors/error-dialog/error-dialog.component';
import { LoadingDialogService } from '../core/loading/loading-dialog.service';
import { LoadingDialogComponent } from '../core/loading/loading-dialog/loading-dialog.component';

const sharedComponents = [LoadingDialogComponent, ErrorDialogComponent];

@NgModule({
    declarations: [...sharedComponents],
    imports: [CommonModule, RouterModule, MaterialModule],
    exports: [...sharedComponents],
    providers: [ErrorDialogService, LoadingDialogService],
    //entryComponents: [...sharedComponents],
})
export class SharedModule {}
