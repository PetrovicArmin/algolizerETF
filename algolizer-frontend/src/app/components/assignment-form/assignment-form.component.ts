import { Component, OnInit } from '@angular/core';
import ProblemType from 'src/app/enums/ProblemType';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import AddedProblemType from 'src/app/interfaces/AddedProblemType';
import { ProblemTypeService } from 'src/app/services/problem-type.service';
import { DialogOpenerService } from 'src/app/services/dialog-opener.service';
import { SameProblemTypeErrorComponent } from 'src/app/dialogs/same-problem-type-error/same-problem-type-error.component';
import { NonExistentProblemTypeComponent } from 'src/app/dialogs/non-existent-problem-type/non-existent-problem-type.component';
import { QuantityErrorComponent } from 'src/app/dialogs/quantity-error/quantity-error.component';


@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})

export class AssignmentFormComponent implements OnInit {
  problemType: string = "";
  numOfProblems: number = 0;
  problemTypes: string[] = Object.values(ProblemType);
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]> = new Observable<string[]>;
  addedProblemTypes: AddedProblemType[] = [];

  constructor(
    private problemTypeService: ProblemTypeService,
    private dialogOpenerService: DialogOpenerService
  ) {

  }
  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  _filter(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    return this.problemTypes.filter(option => option.toLowerCase().includes(filterValue));
  } 

  validateSubmit(): boolean {
    if (this.problemTypes.indexOf(this.problemType) == -1) {
      this.dialogOpenerService.openDialog(NonExistentProblemTypeComponent, '250px', '300ms', '100ms');
      return false;
    }
    if (this.addedProblemTypes.filter(prT => prT.problemType == this.problemTypeService.getProblemTypeFromValue(this.problemType)).length != 0) {
      this.dialogOpenerService.openDialog(SameProblemTypeErrorComponent, '250px', '300ms', '100ms');
      return false;
    }

    if (this.numOfProblems <= 0) {
      this.dialogOpenerService.openDialog(QuantityErrorComponent, '250px', '300ms', '100ms');
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (!this.validateSubmit())
      return;
    this.addedProblemTypes.push({
      problemType: (<any>ProblemType)[this.problemTypeService.getKeyByValue(this.problemType)],
      quantity: this.numOfProblems
    });
  }

  onDelete(problemTypeToDelete: ProblemType) {
    this.addedProblemTypes = this.addedProblemTypes.filter(addedProblem => addedProblem.problemType != problemTypeToDelete);
  }
}
