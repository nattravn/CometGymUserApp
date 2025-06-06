import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        console.log('');
    }
}
