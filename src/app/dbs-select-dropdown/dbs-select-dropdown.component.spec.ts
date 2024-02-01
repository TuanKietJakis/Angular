import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbsSelectDropdownComponent } from './dbs-select-dropdown.component';

describe('DbsSelectDropdownComponent', () => {
  let component: DbsSelectDropdownComponent;
  let fixture: ComponentFixture<DbsSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbsSelectDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbsSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
