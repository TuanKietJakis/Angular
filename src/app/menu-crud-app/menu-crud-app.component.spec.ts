import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCrudAppComponent } from './menu-crud-app.component';

describe('MenuCrudAppComponent', () => {
  let component: MenuCrudAppComponent;
  let fixture: ComponentFixture<MenuCrudAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCrudAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCrudAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
