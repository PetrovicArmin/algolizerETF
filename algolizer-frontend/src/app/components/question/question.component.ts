import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerInformationComponent } from 'src/app/dialogs/answer-information/answer-information.component';
import QuizInformation from 'src/app/interfaces/QuizInformation';
import { DialogOpenerService } from 'src/app/services/dialog-opener.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit{
  answer?: number;
  quizInformation: QuizInformation = {
    questions: [],
    currentQuestionIndex: 0,
    maxPoints: 0,
    currentPoints: 0
  };

  constructor(
    private router: Router,
    private uiService: UiService,
    private dialogOpener: DialogOpenerService
  ) {

  }

  ngOnInit(): void {
    this.uiService.quizSubject().subscribe(quizInformation => this.quizInformation = quizInformation);
  }

  onSubmit(): void {
    //ovdje ćemo imati binarno i parcijalno bodovanje, pa je potrebno promijeniti input u string
    //te u ovisnosti od toga da li je pitanje markirano sa binarno ili parcijalno, ispitujemo
    //niz brojeva ili samo jedan broj, jer se bilo koja parcijalna informacija može interpretirati
    //kao niz brojeva.
    let correctAnswer = this.quizInformation.questions[this.quizInformation.currentQuestionIndex].answer;
    let questionPoints = this.quizInformation.questions[this.quizInformation.currentQuestionIndex].maxPoints;
    let message = "";
    if (correctAnswer != this.answer?.toString())
      message = "Your answer is incorrect! Correct answer is: " + correctAnswer;
    else {
      message = "Your answer is correct!"; 
      this.quizInformation.currentPoints += questionPoints;
    }

    this.uiService.toggleQuizInformation(this.quizInformation);
    this.dialogOpener.openDialog(AnswerInformationComponent, "500px", "200ms", "200ms", message);
  }
}
