import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PepeAndFooterComponent } from './pepe-and-footer.component';

describe('PepeAndFooterComponent', () => {
  let component: PepeAndFooterComponent;
  let fixture: ComponentFixture<PepeAndFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PepeAndFooterComponent]
    });
    fixture = TestBed.createComponent(PepeAndFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
