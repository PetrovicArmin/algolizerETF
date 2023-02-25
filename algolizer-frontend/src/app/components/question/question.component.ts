import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import QuizInformation from 'src/app/interfaces/QuizInformation';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit{
  quizInformation: QuizInformation = {
    questions: [],
    currentQuestionIndex: 0,
    maxPoints: 0,
    currentPoints: 0
  };

  constructor(
    private router: Router,
    private uiService: UiService
  ) {

  }

  ngOnInit(): void {
    this.uiService.quizSubject().subscribe(quizInformation => this.quizInformation = quizInformation);
  }
}
