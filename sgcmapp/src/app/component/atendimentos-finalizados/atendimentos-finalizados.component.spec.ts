import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosFinalizadosComponent } from './atendimentos-finalizados.component';

describe('AtendimentosFinalizadosComponent', () => {
  let component: AtendimentosFinalizadosComponent;
  let fixture: ComponentFixture<AtendimentosFinalizadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosFinalizadosComponent]
    });
    fixture = TestBed.createComponent(AtendimentosFinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
