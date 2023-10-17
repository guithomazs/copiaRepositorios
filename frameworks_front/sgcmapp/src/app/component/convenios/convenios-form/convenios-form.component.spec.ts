import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveniosFormComponent } from './convenios-form.component';

describe('ConveniosFormComponent', () => {
  let component: ConveniosFormComponent;
  let fixture: ComponentFixture<ConveniosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConveniosFormComponent]
    });
    fixture = TestBed.createComponent(ConveniosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
