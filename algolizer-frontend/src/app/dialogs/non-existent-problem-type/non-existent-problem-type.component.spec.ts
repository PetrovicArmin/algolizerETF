import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonExistentProblemTypeComponent } from './non-existent-problem-type.component';

describe('NonExistentProblemTypeComponent', () => {
  let component: NonExistentProblemTypeComponent;
  let fixture: ComponentFixture<NonExistentProblemTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonExistentProblemTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonExistentProblemTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
