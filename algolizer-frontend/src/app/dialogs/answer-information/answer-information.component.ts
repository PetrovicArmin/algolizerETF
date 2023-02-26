import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import QuizInformation from 'src/app/interfaces/QuizInformation';

@Component({
  selector: 'app-answer-information',
  templateUrl: './answer-information.component.html',
  styleUrls: ['./answer-information.component.css']
})
export class AnswerInformationComponent implements OnInit{
  message: string = "bezze poruka";
  quiz: QuizInformation = {
    questions: [],
    currentQuestionIndex: 0,
    maxPoints: 0,
    currentPoints: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private uiService: UiService
  ){}

  ngOnInit(): void {
    this.uiService.quizSubject().subscribe(quiz => this.quiz = quiz);
    this.message = this.data;
  }

  goToVisualisation(): void {
    this.router.navigateByUrl(this.quiz.questions[this.quiz.currentQuestionIndex].algorithm.componentRoute);
    console.log("ovo je moja ruta: ");
    console.log(this.quiz.questions[this.quiz.currentQuestionIndex].algorithm.componentRoute);
  }

  goToNextQuestion(): void {
    this.quiz.currentQuestionIndex += 1;
    this.uiService.toggleQuizInformation(this.quiz);
    this.router.navigateByUrl("/quiz");
  }
}
