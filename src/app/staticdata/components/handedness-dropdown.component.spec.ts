import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HandednessDropdownComponent } from './handedness-dropdown.component';

describe('HandednessDropdownComponent', () => {
  let component: HandednessDropdownComponent;
  let fixture: ComponentFixture<HandednessDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandednessDropdownComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HandednessDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include B option by default', () => {
    expect(component.options.map(o => o.code)).toEqual(['L', 'R', 'B']);
  });

  it('should omit B option when includeBoth is false', () => {
    component.includeBoth = false;
    expect(component.options.map(o => o.code)).toEqual(['L', 'R']);
  });

  it('should map S to B when includeBoth is true', () => {
    component.includeBoth = true;
    component.writeValue('S');
    expect(component.value).toBe('B');
  });

  it('should map full-word values to code values', () => {
    component.includeBoth = true;

    component.writeValue('Left');
    expect(component.value).toBe('L');

    component.writeValue('Right');
    expect(component.value).toBe('R');

    component.writeValue('Both');
    expect(component.value).toBe('B');
  });

  it('should map Switch to B when includeBoth is true', () => {
    component.includeBoth = true;
    component.writeValue('Switch');
    expect(component.value).toBe('B');
  });

  it('should map verbose values to short codes', () => {
    component.includeBoth = true;

    component.writeValue('Left Shot');
    expect(component.value).toBe('L');

    component.writeValue('Right Hand');
    expect(component.value).toBe('R');

    component.writeValue('Both Hands');
    expect(component.value).toBe('B');
  });

  it('should clear unknown values', () => {
    component.includeBoth = true;
    component.writeValue('Unknown');
    expect(component.value).toBe('');
  });
});
