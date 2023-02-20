import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { AssignmentFormComponent } from './components/assignment-form/assignment-form.component';
import { AddedProblemTypeComponent } from './components/added-problem-type/added-problem-type.component';
import { SameProblemTypeErrorComponent } from './dialogs/same-problem-type-error/same-problem-type-error.component';
import { NonExistentProblemTypeComponent } from './dialogs/non-existent-problem-type/non-existent-problem-type.component';
import { QuantityErrorComponent } from './dialogs/quantity-error/quantity-error.component';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RecommendationComponent,
    AssignmentFormComponent,
    AddedProblemTypeComponent,
    SameProblemTypeErrorComponent,
    NonExistentProblemTypeComponent,
    QuantityErrorComponent,
    QuestionComponent
  ],
  entryComponents: [SameProblemTypeErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
