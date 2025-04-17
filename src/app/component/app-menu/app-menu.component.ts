import { Component } from '@angular/core';

import { UserService } from '@app/services/user.service';

@Component({
    selector: 'app-app-menu',
    imports: [],
    templateUrl: './app-menu.component.html',
    styleUrl: './app-menu.component.scss',
})

//https://www.youtube.com/watch?v=r7mIY8Incog&ab_channel=NihiraTechiees
export class AppMenuComponent {
    constructor(private userService: UserService) {}
}
