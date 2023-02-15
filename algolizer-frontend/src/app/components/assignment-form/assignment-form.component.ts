import { Component, OnInit } from '@angular/core';
import ProblemType from 'src/app/enums/ProblemType';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})

export class AssignmentFormComponent implements OnInit {
  problemType: string = "";
  numOfProblems: Number = 0;
  problemTypes: string[] = Object.values(ProblemType);
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]> = new Observable<string[]>;

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
    console.log("My variables are: " + this.problemType + ", and " + this.numOfProblems);
  }
}
