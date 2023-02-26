import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import RecommendationState from 'src/app/enums/RecommendationState';
import { Router } from '@angular/router';
import QuizInformation from 'src/app/interfaces/QuizInformation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit{
  applicationName: string = "Algolizer ETF";
  version: string = "1.0.0";
  recommendationState: RecommendationState = RecommendationState.FINISHED;
  allRecommendationStates = RecommendationState;
  questionIndex: number = 0;
  points: number = 0;
  maxPoints: number = 0;
  totalQuestionNumber: number = 0;

  constructor(
    private uiService: UiService,
    public router: Router
  ) {

  } 
  ngOnInit(): void {
    this.uiService.recommendationSubject().subscribe(state => this.recommendationState = state);
    this.uiService.quizSubject().subscribe(quizInfo => {
      this.questionIndex = quizInfo?.currentQuestionIndex;
      this.points = quizInfo?.currentPoints;
      this.totalQuestionNumber = quizInfo?.questions?.length;
      this.maxPoints = quizInfo?.maxPoints;
    });
  }

  refreshRecommendations():void {
    this.uiService.toggleRecommendationState(RecommendationState.STARTED);
    //call server to bring new recommendations from AI that we will build 
    setTimeout(() => {
      //if it is really fast, then do it here just to simulate slowness.
      this.uiService.toggleRecommendationState(RecommendationState.FINISHED);
    }, 1000);
  }

}
