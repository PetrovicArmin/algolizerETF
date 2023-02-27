import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BubbleSortComponent } from './algorithms/bubble-sort/bubble-sort.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'quiz', component: QuestionComponent},
  {path: 'bubble-sort', component: BubbleSortComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
