import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StaticDataService } from '../services/staticdata.service';
import { LeagueDropdownComponent } from './league-dropdown.component';

describe('LeagueDropdownComponent', () => {
  let component: LeagueDropdownComponent;
  let fixture: ComponentFixture<LeagueDropdownComponent>;
  let staticDataServiceSpy: jasmine.SpyObj<StaticDataService>;

  beforeEach(async () => {
    staticDataServiceSpy = jasmine.createSpyObj('StaticDataService', ['GetLeagueCodes']);
    staticDataServiceSpy.GetLeagueCodes.and.returnValue(of([
      { code: 'AL', label: 'AL' },
      { code: 'NL', label: 'NL' }
    ]));

    await TestBed.configureTestingModule({
      declarations: [LeagueDropdownComponent],
      providers: [{ provide: StaticDataService, useValue: staticDataServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueDropdownComponent);
    component = fixture.componentInstance;
    component.sport = 'mlb';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep valid code value', () => {
    component.writeValue('nl');

    expect(component.selectedValue).toBe('NL');
    expect(component.validate({} as any)).toBeNull();
  });

  it('should fail validation when value is not in options', () => {
    component.writeValue('AB');

    expect(component.selectedValue).toBe('');
    expect(component.validate({} as any)).toEqual({ invalidLeague: true });
  });
});
