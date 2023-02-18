import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedProblemTypeComponent } from './added-problem-type.component';

describe('AddedProblemTypeComponent', () => {
  let component: AddedProblemTypeComponent;
  let fixture: ComponentFixture<AddedProblemTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedProblemTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedProblemTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
