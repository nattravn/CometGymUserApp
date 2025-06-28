import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustumerComponent } from './custumer.component';

describe('CustumerComponent', () => {
    let component: CustumerComponent;
    let fixture: ComponentFixture<CustumerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CustumerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustumerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
