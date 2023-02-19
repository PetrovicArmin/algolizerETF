import { Component, OnInit } from '@angular/core';
import ProblemType from 'src/app/enums/ProblemType';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import AddedProblemType from 'src/app/interfaces/AddedProblemType';
import { ProblemTypeService } from 'src/app/services/problem-type.service';


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
    private problemTypeService: ProblemTypeService
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

  onSubmit(): void {
    if (this.addedProblemTypes.filter(prT => prT.problemType == this.problemTypeService.getProblemTypeFromValue(this.problemType)).length != 0) {
      alert("That item is already in the list!");
      return;
    }
    this.addedProblemTypes.push({
      problemType: (<any>ProblemType)[this.problemTypeService.getKeyByValue(this.problemType)],
      quantity: this.numOfProblems
    });
  }

  onDelete(problemTypeToDelete: ProblemType) {
    this.addedProblemTypes = this.addedProblemTypes.filter(addedProblem => addedProblem.problemType != problemTypeToDelete);
  }
}
