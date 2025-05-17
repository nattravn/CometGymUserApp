import { NgModule } from '@angular/core';

import { AsyncClickDirective } from './async-click.directive';

/**
 * Main module of @ntm/async-click exporting NtmAsyncClickDirective.
 * Could be imported once in your Shared Module to work everywhere.
 */
@NgModule({
    declarations: [],
    imports: [AsyncClickDirective],
    exports: [AsyncClickDirective],
})
export class AsyncClickModule {}
