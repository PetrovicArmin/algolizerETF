import { Injectable } from '@angular/core';
import ProblemType from '../enums/ProblemType';
import Algorithm from '../interfaces/Algorithm';
import Question from '../interfaces/Question';
import { ALGORITHMS, bubbleSortStepsGenerator, generateAlgorithmCodeString, mergeSortStepsGenerator } from '../shared/algorithmHelper';

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

    let n = 0;
    let arr = [];

    switch (problemType) {
      case ProblemType.BUBBLE_SORT:
        question.algorithm.code = generateAlgorithmCodeString(0, ALGORITHMS.BUBBLE_SORT_CODE_ARRAY);

        
        n = this.randomIntFromInterval(7, 12);
        arr = [];
        
        for (let i = 0; i < n; i++)
        arr.push(this.randomIntFromInterval(1, 100));
        
        question.algorithm.algorithmParameters.array = arr;
        question.text = "Let there be an array: [" + arr.toString() + "]. How many swap operations will bubble sort algorithm have when we use it to sort this array?";
        question.algorithm.algorithmSteps = bubbleSortStepsGenerator(arr);
        question.algorithm.componentRoute = "/bubble-sort";
        question.answer = question.algorithm.algorithmSteps[question.algorithm.algorithmSteps.length-1].numOfSwaps;
        question.maxPoints = Math.round((n/12.000 + question.algorithm.algorithmSteps[question.algorithm.algorithmSteps.length-1].numOfSwaps/100.0)*100)/100.00 ;
        break;
      case ProblemType.MERGE_SORT:
        question.algorithm.code = generateAlgorithmCodeString(0, ALGORITHMS.MERGE_SORT_CODE_ARRAY);

        
        n = this.randomIntFromInterval(10, 16);
        arr = [];
        
        for (let i = 0; i < n; i++)
          arr.push(this.randomIntFromInterval(1, 100));
        
        question.algorithm.algorithmParameters.array = arr;
        
        let step: any = {
          array: [],
          left_array: [],
          right_array: [],
          sorted_array: [],
          mid_position: 0,
          left_arr_position: 0,
          right_arr_position: 0,
          going_back: false,
          going_forward: false,
          merging: false,
          recursion_depth: -1,
          if_condition: undefined,
          line: 0,
          numOfFalse: 0,
          numofTrue: 0
        };

        question.algorithm.algorithmSteps.push(step);

        //utiče indirektno na objekat algorithmSteps.
        mergeSortStepsGenerator(arr, question.algorithm.algorithmSteps, step);

        console.log("Generirani algorithm koraci za merge sort:");
        console.log(question.algorithm.algorithmSteps);

        question.algorithm.componentRoute = "/merge-sort";
        question.maxPoints = Math.round((n/16.000 + question.algorithm.algorithmSteps[question.algorithm.algorithmSteps.length-1].numofFalse/100.0)*100)/100.00 ;

        let option = this.randomIntFromInterval(0,1);
        let stringAppendix = "false";
        question.answer = question.algorithm.algorithmSteps[question.algorithm.algorithmSteps.length-1].numOfFalse;

        if (option == 1) {        
          stringAppendix = "true";
          question.answer = question.algorithm.algorithmSteps[question.algorithm.algorithmSteps.length-1].numOfTrue;
          question.maxPoints = Math.round((n/16.000 + question.algorithm.algorithmSteps[question.algorithm.algorithmSteps.length-1].numofTrue/100.0)*100)/100.00 ;
        }

        question.text = "Let there be an array: [" + arr.toString() + "]. How many times will if condition in while loop be " + stringAppendix + " ?";
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
