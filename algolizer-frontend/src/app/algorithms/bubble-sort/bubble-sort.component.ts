import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ProblemType from 'src/app/enums/ProblemType';
import Algorithm from 'src/app/interfaces/Algorithm';
import AlgorithmContext from 'src/app/interfaces/AlgorithmContext';
import { CanvasService } from 'src/app/services/canvas.service';
import { UiService } from 'src/app/services/ui.service';
import { ALGORITHMS, createAlgorithmContextArray, generateAlgorithmCodeString } from 'src/app/shared/algorithmHelper';

@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})
export class BubbleSortComponent implements OnInit, AfterViewInit{
  @ViewChild('myCanvas', {static: false})
  canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef;
  context: any = {} as any;

  displayedColumns: string[] = ['context-property', 'property-value'];
  dataSource: AlgorithmContext[] = [];

  bubbleSortProperties: string[] = ['Is swapped', 'i', 'j', 'Line that has been executed', 'Should continue?', 'Should swap?', "Number of swaps"];
  bubbleSortValues: string[] = ['', '', '', '', '', '', ''];

  WIDTH = 800;
  HEIGHT = 280;
  EL_WIDTH = 50;
  EL_HEIGHT = 50;
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.canvasService.setCanvas(this.canvas);
      this.canvasService.setContext(this.context);
      this.uiService.quizSubject().subscribe(quiz => {
        this.algorithm = quiz.questions[quiz.currentQuestionIndex].algorithm;
        this.showStep(this.algorithm.algorithmSteps[this.currentStep]);
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
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    
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

  showStep(step: any):void {
    this.canvasService.clear(this.WIDTH, this.HEIGHT);
    let colors: string[] = [];
    for (let i = 0; i < this.algorithm.algorithmParameters.array.length; i++)
      colors.push("black");
    if (step.j != undefined) {
      this.bubbleSortValues[2] = step.j;
      let color = "red";
      if (step?.comparisonStatus?.shouldChange === true) {
        color = "green";
      }
      colors[step.j] = color;
      colors[step.j + 1] = color;
      this.canvasService.drawPointer(this.canvasService.getElementX(step.j), this.HEIGHT/2 + 20, "j", 30, 0);
    } else {
      this.bubbleSortValues[2] = '';
    }
    
    if (step.isSwapped != null && step.isSwapped != undefined) {
      this.bubbleSortValues[0] = step.isSwapped;
    } else {
      this.bubbleSortValues[0] = '';
    }

    if (step.isSwappedStatus != null && step.isSwappedStatus != undefined) {
      if (step.isSwappedStatus.shouldContinue)
        this.bubbleSortValues[4] = 'Yes';
      else 
        this.bubbleSortValues[4] = 'No';
    } else {
      this.bubbleSortValues[4] = '';
    }

    if (step.comparisonStatus != null && step.comparisonStatus != undefined) {
      if (step.comparisonStatus.shouldChange)
        this.bubbleSortValues[5] = 'Yes';
      else 
        this.bubbleSortValues[5] = 'No';
    } else {
      this.bubbleSortValues[5] = '';
    }

    if (step.numOfSwaps != undefined && step.numOfSwaps != null) {
      this.bubbleSortValues[6] = step.numOfSwaps;
    } else {
      this.bubbleSortValues[6] = '';
    }

    if (step.i != undefined) {
      this.bubbleSortValues[1] = step.i;
      this.canvasService.drawPointer(this.canvasService.getElementX(this.algorithm.algorithmParameters.array.length - step.i - 1), this.HEIGHT/2 + 20, "arr.len - i - 1", 30, -30);
    } else {
      this.bubbleSortValues[1] = '';
    }

    if (step.line) {
      this.bubbleSortValues[3] = step.line;
      this.algorithm.code = generateAlgorithmCodeString(step.line, ALGORITHMS.BUBBLE_SORT_CODE_ARRAY);
    } else {
      this.bubbleSortValues[3] = '';
    }

    this.canvasService.drawArray(step.arr, 20, this.HEIGHT/2 - 30, this.EL_WIDTH, this.EL_HEIGHT, colors);

    this.dataSource = createAlgorithmContextArray(this.bubbleSortProperties, this.bubbleSortValues);
  }
}
