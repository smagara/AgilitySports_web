import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { FifComponent } from './fif.component';

describe('FifComponent', () => {
  let component: FifComponent;
  let fixture: ComponentFixture<FifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FifComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        NoopAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
