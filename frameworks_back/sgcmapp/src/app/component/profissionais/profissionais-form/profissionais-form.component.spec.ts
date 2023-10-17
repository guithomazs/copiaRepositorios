import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionaisFormComponent } from './profissionais-form.component';

describe('ProfissionaisFormComponent', () => {
  let component: ProfissionaisFormComponent;
  let fixture: ComponentFixture<ProfissionaisFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionaisFormComponent]
    });
    fixture = TestBed.createComponent(ProfissionaisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
