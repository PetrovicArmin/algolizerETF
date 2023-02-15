import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})

export class AssignmentFormComponent implements OnInit {
  problemType: string = "";
  numOfProblems: Number = 0;

  constructor() {

  }

  ngOnInit():void {

  }

  onSubmit(): void {
    console.log("My variables are: " + this.problemType + ", and " + this.numOfProblems);
  }
}
