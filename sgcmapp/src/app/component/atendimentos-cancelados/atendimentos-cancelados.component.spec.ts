import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosCanceladosComponent } from './atendimentos-cancelados.component';

describe('AtendimentosCanceladosComponent', () => {
  let component: AtendimentosCanceladosComponent;
  let fixture: ComponentFixture<AtendimentosCanceladosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosCanceladosComponent]
    });
    fixture = TestBed.createComponent(AtendimentosCanceladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
