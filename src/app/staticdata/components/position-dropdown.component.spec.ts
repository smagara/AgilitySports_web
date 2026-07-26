import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StaticDataService } from '../services/staticdata.service';
import { PositionDropdownComponent } from './position-dropdown.component';

describe('PositionDropdownComponent', () => {
  let component: PositionDropdownComponent;
  let fixture: ComponentFixture<PositionDropdownComponent>;
  let staticDataServiceSpy: jasmine.SpyObj<StaticDataService>;

  beforeEach(async () => {
    staticDataServiceSpy = jasmine.createSpyObj('StaticDataService', ['GetPositionCodes']);
    staticDataServiceSpy.GetPositionCodes.and.returnValue(of([
      { sport: 'nhl', positionCode: 'C', positionDesc: 'Center' },
      { sport: 'nhl', positionCode: 'G', positionDesc: 'Goalie' },
      { sport: 'nhl', positionCode: 'LW', positionDesc: 'Left Winger' }
    ]));

    await TestBed.configureTestingModule({
      declarations: [PositionDropdownComponent],
      providers: [{ provide: StaticDataService, useValue: staticDataServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PositionDropdownComponent);
    component = fixture.componentInstance;
    component.sport = 'nhl';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map description value to code for display and model', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.writeValue('Goalie');

    expect(component.selectedValue).toBe('G');
    expect(component.value).toBe('G');
    expect(onChangeSpy).toHaveBeenCalledWith('G');

    fixture.detectChanges();
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('#position-dropdown');
    expect(select.value).toBe('G');
  });

  it('should keep code value as-is when code is provided', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    component.registerOnChange(onChangeSpy);

    component.writeValue('LW');

    expect(component.selectedValue).toBe('LW');
    expect(component.value).toBe('LW');
    expect(onChangeSpy).not.toHaveBeenCalled();
  });

  it('should emit selected code on user change', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    component.onSelectChange({ target: { value: 'C' } });

    expect(component.value).toBe('C');
    expect(component.selectedValue).toBe('C');
    expect(onChangeSpy).toHaveBeenCalledWith('C');
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
