import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarFileComponent } from './cargar-file.component';

describe('CargarFileComponent', () => {
  let component: CargarFileComponent;
  let fixture: ComponentFixture<CargarFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
