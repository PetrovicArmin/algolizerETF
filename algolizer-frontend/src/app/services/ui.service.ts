import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import RecommendationState from '../enums/RecommendationState';
import QuizInformation from '../interfaces/QuizInformation';

@Injectable({
  providedIn: 'root'
})

export class UiService {
  recommendations: Subject<RecommendationState> = new Subject<RecommendationState>();
  quiz: BehaviorSubject<QuizInformation> = new BehaviorSubject({} as QuizInformation);

  constructor() { }

  recommendationSubject(): Observable<RecommendationState> {
    return this.recommendations.asObservable();
  }

  quizSubject(): Observable<QuizInformation> {
    return this.quiz.asObservable();
  }

  toggleQuizInformation(quizInformation: QuizInformation): void {
    this.quiz.next(quizInformation);
  }

  toggleRecommendationState(recommendationState: RecommendationState): void {
    this.recommendations.next(recommendationState);
  }
}
