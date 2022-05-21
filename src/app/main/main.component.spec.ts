import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
    let componet : MainComponent;
    it('should be created', ()=> {
        componet = new MainComponent();
        expect(componet).toBeTruthy();
    });
});
