import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    standalone: false,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
//https://www.youtube.com/watch?v=r7mIY8Incog&ab_channel=NihiraTechiees
export class AppComponent {
    constructor() {
        console.log('app component');
    }
    title =
        'CometGymUserAppaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa sddsfc sdfdsf sdfdsf aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
}
