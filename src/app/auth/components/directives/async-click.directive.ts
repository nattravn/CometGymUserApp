import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnDestroy } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, finalize, switchMap, takeUntil, tap } from 'rxjs/operators';

/**
 * This directive when set on a button takes an observable, or a function that returns an observable,
 * executes the function/makes the observable hot on click, and disables the host button until the observable completes.
 *
 * A common use case is that a button click should trigger an async function or http-request, and that the button should be disabled until the request is done.
 * This directive handles this case nicely.
 *
 * Eg:
 * <button [asyncClick]="selectValue$.bind(this, 42)">Select 42</button>
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[asyncClick]',
})
export class AsyncClickDirective implements OnDestroy {
    /**
     * To disable a native button, and also a mat-button, while working.
     */
    @HostBinding('class.mat-button-disabled') @HostBinding('disabled') internalDisabled = false;

    /**
     * On click: cold observable to make hot, or function that returns an observable to execute.
     */
    @Input() asyncClick!: Observable<any> | ((...params: any[]) => Observable<any>);

    /**
     * Support normal button disabled input.
     */
    @Input() set disabled(disabled: boolean) {
        this.internalDisabled = disabled;
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Internal subject, next:ed into on click.
     */
    private clickSubject = new Subject<boolean>();

    /**
     * Subject to to complete subscriptions on destroy.
     */
    private untilDestroyed$ = new Subject<boolean>();

    /**
     * Constructor
     * @param elementRef Host button element
     * @param changeDetectorRef To mark for check on button enable/disable
     */
    constructor(
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        /* Bind click event to the host button. Disable it and handle this.asyncClick on button click. */
        this.elementRef.nativeElement.addEventListener('click', () => {
            this.clickSubject.next(true);
            this.internalDisabled = true;
            this.changeDetectorRef.markForCheck();
        });

        /* Connect internal subject */
        this.setupClickListener().pipe(takeUntil(this.untilDestroyed$)).subscribe();
    }

    /**
     * Complete subscriptions on destroy
     */
    ngOnDestroy(): void {
        this.untilDestroyed$.next(true);
        this.untilDestroyed$.complete();
    }

    /**
     * Switch from internal Subject to this.asyncClick observable/observable function. Enable button when it completes.
     */
    private setupClickListener(): Observable<boolean> {
        return this.clickSubject.pipe(
            distinctUntilChanged(),
            filter(enabled => enabled),
            switchMap(() =>
                (typeof this.asyncClick === 'function' ? this.asyncClick() : this.asyncClick).pipe(
                    catchError(error => {
                        /* Intentionally catch any unhandled errors here. Real error handling should be done upstream if need be however. */
                        console.error(error);
                        return of(null);
                    }),
                    tap(() => {
                        this.clickSubject.next(false);
                        this.internalDisabled = false;
                        this.changeDetectorRef.markForCheck();
                    }),
                    finalize(() => {
                        this.clickSubject.next(false);
                        this.internalDisabled = false;
                        this.changeDetectorRef.markForCheck();
                    })
                )
            )
        );
    }
}
