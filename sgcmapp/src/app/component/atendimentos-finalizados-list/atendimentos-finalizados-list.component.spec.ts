import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosFinalizadosListComponent } from './atendimentos-finalizados-list.component';

describe('AtendimentosFinalizadosListComponent', () => {
  let component: AtendimentosFinalizadosListComponent;
  let fixture: ComponentFixture<AtendimentosFinalizadosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosFinalizadosListComponent]
    });
    fixture = TestBed.createComponent(AtendimentosFinalizadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
