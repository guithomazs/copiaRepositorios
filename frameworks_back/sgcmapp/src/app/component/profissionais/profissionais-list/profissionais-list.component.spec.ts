import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionaisListComponent } from './profissionais-list.component';

describe('ProfissionaisListComponent', () => {
  let component: ProfissionaisListComponent;
  let fixture: ComponentFixture<ProfissionaisListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionaisListComponent]
    });
    fixture = TestBed.createComponent(ProfissionaisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
