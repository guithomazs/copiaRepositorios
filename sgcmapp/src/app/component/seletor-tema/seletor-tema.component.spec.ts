import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorTemaComponent } from './seletor-tema.component';

describe('SeletorTemaComponent', () => {
  let component: SeletorTemaComponent;
  let fixture: ComponentFixture<SeletorTemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeletorTemaComponent]
    });
    fixture = TestBed.createComponent(SeletorTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
