import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-loading-dialog',
    templateUrl: './loading-dialog.component.html',
    styleUrls: ['./loading-dialog.component.scss'],
})
export class LoadingDialogComponent {
    constructor() {}
}
