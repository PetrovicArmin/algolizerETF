import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentFormComponent } from './components/assignment-form/assignment-form.component';
import { BubbleSortComponent } from './components/bubble-sort/bubble-sort.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  {path: 'dashboard', component: AssignmentFormComponent},
  {path: 'quiz', component: QuestionComponent},
  {path: 'bubble-sort', component: BubbleSortComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
