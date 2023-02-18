import { Component, OnInit } from '@angular/core';
import RecommendationState from 'src/app/enums/RecommendationState';
import { UiService } from 'src/app/services/ui.service';
import { trigger, transition, animate, style, state } from '@angular/animations';


@Component({
  selector: 'app-recommendation',
  animations: [
    trigger('insertRemoveRecommendations', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']

})
export class RecommendationComponent implements OnInit{
  isShown: boolean = true;
  constructor(
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.uiService.recommendationSubject().subscribe(recommendationState => {
      recommendationState == RecommendationState.FINISHED ? this.isShown = true : this.isShown = false;
    });
  }

}
