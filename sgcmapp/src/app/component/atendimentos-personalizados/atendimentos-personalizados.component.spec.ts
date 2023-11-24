import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosPersonalizadosComponent } from './atendimentos-personalizados.component';

describe('AtendimentosPersonalizadosComponent', () => {
  let component: AtendimentosPersonalizadosComponent;
  let fixture: ComponentFixture<AtendimentosPersonalizadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosPersonalizadosComponent]
    });
    fixture = TestBed.createComponent(AtendimentosPersonalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
