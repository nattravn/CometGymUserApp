import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppMenuComponent } from './component/app-menu/app-menu.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, AppMenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
//https://www.youtube.com/watch?v=r7mIY8Incog&ab_channel=NihiraTechiees
export class AppComponent {
    title =
        'CometGymUserAppaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa sddsfc sdfdsf sdfdsf aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
}
