import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameProblemTypeErrorComponent } from './same-problem-type-error.component';

describe('SameProblemTypeErrorComponent', () => {
  let component: SameProblemTypeErrorComponent;
  let fixture: ComponentFixture<SameProblemTypeErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SameProblemTypeErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SameProblemTypeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
