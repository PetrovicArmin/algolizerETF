import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import ProblemType from 'src/app/enums/ProblemType';
import Algorithm from 'src/app/interfaces/Algorithm';
import AlgorithmContext from 'src/app/interfaces/AlgorithmContext';
import QuizInformation from 'src/app/interfaces/QuizInformation';
import { CanvasService } from 'src/app/services/canvas.service';
import { UiService } from 'src/app/services/ui.service';
import { ALGORITHMS, createAlgorithmContextArray, generateAlgorithmCodeString } from 'src/app/shared/algorithmHelper';

@Component({
  selector: 'app-merge-sort',
  templateUrl: './merge-sort.component.html',
  styleUrls: ['./merge-sort.component.css']
})
export class MergeSortComponent implements OnInit, AfterViewInit{
  @ViewChild('myCanvas', {static: false})
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  context: any = {} as any;

  displayedColumns: string[] = ['context-property', 'property-value'];
  dataSource: AlgorithmContext[] = [];

  mergeSortProperties: string[] = ['Going back?', 'Going forward?', 'Merging phase?', 'Line that has been executed:', 'Number of true if conditions:', 'Number of false if conditions?', 'If condition status:', 'Recursion depth: '];
  mergeSortValues: string[] = ['', '', '', '', '', '', '', ''];

  WIDTH = 900;
  HEIGHT = 600;
  EL_WIDTH = 50;
  EL_HEIGHT = 50;

  setSortValues(step: any) {
    this.mergeSortValues[0] = step.going_back;
    this.mergeSortValues[1] = step.going_forward;
    this.mergeSortValues[2] = step.merging;
    this.mergeSortValues[3] = step.line;
    this.mergeSortValues[4] = step.numOfTrue;
    this.mergeSortValues[5] = step.numOfFalse;
    this.mergeSortValues[6] = step.if_condition;
    this.mergeSortValues[7] = step.recursion_depth;
  } 
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.canvasService.setCanvas(this.canvas);
      this.canvasService.setContext(this.context);
      this.uiService.quizSubject().subscribe(quiz => {
        if (quiz.questions) {
          this.algorithm = quiz.questions[quiz.currentQuestionIndex].algorithm;
          if (this.algorithm != undefined)
            this.showStep(this.algorithm.algorithmSteps[this.currentStep]);
        }
      });
    });
  }

  algorithm: Algorithm = {
    problemType: ProblemType.BUBBLE_SORT,
    code: '',
    algorithmSteps: [],
    algorithmParameters: undefined,
    componentRoute: ''
  }

  currentStep: number = 0;
  constructor(
    private uiService: UiService,
    private canvasService: CanvasService,
    private router: Router
  ) {}

  quiz: QuizInformation = {
    questions: [],
    currentQuestionIndex: 0,
    maxPoints: 0,
    currentPoints: 0
  };

  ngOnInit(): void {
    this.uiService.quizSubject().subscribe(quiz => this.quiz = quiz);
  }

  nextStep(): void {
    if (this.currentStep >= this.algorithm.algorithmSteps.length - 1)
      return;
    this.currentStep++;
    this.showStep(this.algorithm.algorithmSteps[this.currentStep]);
  }

  previousStep(): void {
    if (this.currentStep <= 0)
      return;
    this.currentStep--;
    this.showStep(this.algorithm.algorithmSteps[this.currentStep]);
  }

  closeVisualisation(): void {
    this.quiz.currentQuestionIndex += 1;
    this.uiService.toggleQuizInformation(this.quiz);
    this.router.navigateByUrl("/quiz");
  }

  showStep(step: any):void {
    this.canvasService.clear(this.WIDTH, this.HEIGHT);

    if (step.array != undefined) {
      let arrayColors: string[] = [];
      for (let i = 0; i < step.array.length; i++)
        arrayColors.push('black');
      this.canvasService.drawArray(step.array, 20, 0.2*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, arrayColors);
    }

    if (step.mid_position != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.mid_position), 0.2*this.HEIGHT + 50, 'mid', 30, -13);
    }

    if (step.left_array != undefined) {
      let leftArrayColors: string[] = [];
      for (let i = 0; i < step.left_array.length; i++)
        leftArrayColors.push('black');

      let color = 'black';
      if (step.if_condition != undefined) {
        if (step.if_condition == true)
          color = 'green';
        else 
          color = 'red';
      }
      
      leftArrayColors[step.left_arr_position] = color;

      this.canvasService.drawArray(step.left_array, 20, 0.4*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, leftArrayColors);
    }

    if (step.left_arr_position != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.left_arr_position), 0.4*this.HEIGHT + 50, 'left', 30, -11);
    }

    if (step.right_array != undefined) {
      let rightArrayColors: string[] = [];
      for (let i = 0; i < step.right_array.length; i++)
        rightArrayColors.push('black');

      let color = 'black';
      if (step.if_condition != undefined) {
        if (step.if_condition == true)
          color = 'red';
        else 
          color = 'green';
      }

      rightArrayColors[step.right_arr_position] = color;

      this.canvasService.drawArray(step.right_array, 20, 0.6*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, rightArrayColors);
    }

    if (step.right_arr_position != undefined) {
      this.canvasService.drawPointer(this.canvasService.getElementX(step.right_arr_position), 0.6*this.HEIGHT + 50, 'right', 30, -13);
    }

    if (step.sorted_array != undefined) {
      let sortedArrayColors: string[] = [''].fill("black", 0, step.right_array.length);
      this.canvasService.drawArray(step.sorted_array, 20, 0.8*this.HEIGHT, this.EL_WIDTH, this.EL_HEIGHT, sortedArrayColors);
    }

    if (step.line) {
      this.algorithm.code = generateAlgorithmCodeString(step.line, ALGORITHMS.MERGE_SORT_CODE_ARRAY);
    }


    this.setSortValues(step);
    this.dataSource = createAlgorithmContextArray(this.mergeSortProperties, this.mergeSortValues);
  }
}
