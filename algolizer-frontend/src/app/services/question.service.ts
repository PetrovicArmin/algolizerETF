import { Injectable } from '@angular/core';
import ProblemType from '../enums/ProblemType';
import Algorithm from '../interfaces/Algorithm';
import Question from '../interfaces/Question';
import { BUBBLE_SORT_CODE } from '../shared/algorithmCodes';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  generateQuestion(problemType: ProblemType): Question {
    let algorithm: Algorithm = {
      problemType: problemType,
      code: '',
      algorithmSteps: [],
      algorithmParameters: {}
    };

    let question: Question = {
      text: '',
      answer: '',
      maxPoints: 0,
      algorithm: algorithm
    };

    switch (problemType) {
      case ProblemType.BUBBLE_SORT:
        question.algorithm.code = BUBBLE_SORT_CODE;
        question.maxPoints = 2; //ovo mi odlučujemo koliko će koji algoritam nositi poena.

        question.text = "Moramo znati konkretan kod algoritma kojeg radimo!";
        question.answer = "Ovo se generiše preko koda koji pokrenemo";
        break;
      default:
        question.text = "These algorithms are in preparation!";
        question.answer = "These algorithms are in preparation!";
        question.algorithm.code = "Nešto bezveze!";
        break;
    }

    return question;
  }

  
}
