import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import RecommendationState from '../enums/RecommendationState';

@Injectable({
  providedIn: 'root'
})

export class UiService {
  recommendations: Subject<RecommendationState> = new Subject<RecommendationState>();

  constructor() { }

  recommendationSubject(): Observable<RecommendationState> {
    return this.recommendations.asObservable();
  }

  toggleRecommendationState(recommendationState: RecommendationState): void {
    this.recommendations.next(recommendationState);
  }
}
