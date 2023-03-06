import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BubbleSortComponent } from './algorithms/bubble-sort/bubble-sort.component';
import { MergeSortComponent } from './algorithms/merge-sort/merge-sort.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'quiz', component: QuestionComponent},
  {path: 'bubble-sort', component: BubbleSortComponent},
  {path: 'merge-sort', component: MergeSortComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
