import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentFormComponent } from './components/assignment-form/assignment-form.component';
import { QuestionComponent } from './components/question/question.component';

const routes: Routes = [
  {path: 'dashboard', component: AssignmentFormComponent},
  {path: 'quiz', component: QuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
