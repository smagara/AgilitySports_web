import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NflComponent } from './nfl.component';

describe('NflComponent', () => {
  let component: NflComponent;
  let fixture: ComponentFixture<NflComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NflComponent]
    });
    fixture = TestBed.createComponent(NflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
