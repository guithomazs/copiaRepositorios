import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosCanceladosListComponent } from './atendimentos-cancelados-list.component';

describe('AtendimentosCanceladosListComponent', () => {
  let component: AtendimentosCanceladosListComponent;
  let fixture: ComponentFixture<AtendimentosCanceladosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosCanceladosListComponent]
    });
    fixture = TestBed.createComponent(AtendimentosCanceladosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
