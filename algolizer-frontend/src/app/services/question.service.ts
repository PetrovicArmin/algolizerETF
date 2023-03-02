import { Injectable } from '@angular/core';
import ProblemType from '../enums/ProblemType';
import Algorithm from '../interfaces/Algorithm';
import Question from '../interfaces/Question';
import { ALGORITHMS, bubbleSortStepsGenerator, generateAlgorithmCodeString } from '../shared/algorithmHelper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  private randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  generateQuestion(problemType: ProblemType): Question {
    let algorithm: Algorithm = {
      problemType: problemType,
      code: '',
      algorithmSteps: [], //{lineOfCode, i, j}
      algorithmParameters: {},
      componentRoute: ""
    };

    let question: Question = {
      text: '',
      answer: '',
      maxPoints: 0,
      algorithm: algorithm
    };

    switch (problemType) {
      case ProblemType.BUBBLE_SORT:
        question.algorithm.code = generateAlgorithmCodeString(0, ALGORITHMS.BUBBLE_SORT_CODE_ARRAY);

        
        let n = this.randomIntFromInterval(7, 12);
        let arr = [];
        
        for (let i = 0; i < n; i++)
        arr.push(this.randomIntFromInterval(1, 100));
        
        question.algorithm.algorithmParameters.array = arr;
        question.text = "Let there be an array: [" + arr.toString() + "]. How many swap operations will bubble sort algorithm have when we use it to sort this array?";
        question.algorithm.algorithmSteps = bubbleSortStepsGenerator(arr);
        question.algorithm.componentRoute = "/bubble-sort";
        question.answer = question.algorithm.algorithmSteps[question.algorithm.algorithmSteps.length-1].numOfSwaps;
        question.maxPoints = Math.round((n/12.000 + question.algorithm.algorithmSteps[question.algorithm.algorithmSteps.length-1].numOfSwaps/100.0)*100)/100.00 ; //ovo mi odlučujemo koliko će koji algoritam nositi poena.
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
