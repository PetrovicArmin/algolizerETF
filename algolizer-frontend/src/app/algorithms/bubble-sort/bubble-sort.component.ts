import { Component, OnInit } from '@angular/core';
import ProblemType from 'src/app/enums/ProblemType';
import Algorithm from 'src/app/interfaces/Algorithm';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})
export class BubbleSortComponent implements OnInit{
  algorithm: Algorithm = {
    problemType: ProblemType.BUBBLE_SORT,
    code: '',
    algorithmSteps: [],
    algorithmParameters: undefined,
    componentRoute: ''
  }
  constructor(
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.uiService.quizSubject().subscribe(quiz => this.algorithm = quiz.questions[quiz.currentQuestionIndex].algorithm);
  }

  click(): void {
    console.log(this.algorithm);
  }
}
