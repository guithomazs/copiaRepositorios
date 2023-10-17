import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesFormComponent } from './pacientes-form.component';

describe('PacientesFormComponent', () => {
  let component: PacientesFormComponent;
  let fixture: ComponentFixture<PacientesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientesFormComponent]
    });
    fixture = TestBed.createComponent(PacientesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
