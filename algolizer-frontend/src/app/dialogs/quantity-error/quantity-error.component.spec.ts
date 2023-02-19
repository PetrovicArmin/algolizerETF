import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityErrorComponent } from './quantity-error.component';

describe('QuantityErrorComponent', () => {
  let component: QuantityErrorComponent;
  let fixture: ComponentFixture<QuantityErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
