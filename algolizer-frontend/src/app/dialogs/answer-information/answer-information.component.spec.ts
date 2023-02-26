import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerInformationComponent } from './answer-information.component';

describe('AnswerInformationComponent', () => {
  let component: AnswerInformationComponent;
  let fixture: ComponentFixture<AnswerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
