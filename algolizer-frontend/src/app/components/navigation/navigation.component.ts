import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import RecommendationState from 'src/app/enums/RecommendationState';

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

  constructor(
    private uiService: UiService
  ) {

  } 
  ngOnInit(): void {
    this.uiService.recommendationSubject().subscribe(state => this.recommendationState = state);
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
