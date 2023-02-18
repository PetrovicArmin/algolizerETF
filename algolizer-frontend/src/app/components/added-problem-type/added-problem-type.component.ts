import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ProblemType from 'src/app/enums/ProblemType';
import AddedProblemType from 'src/app/interfaces/AddedProblemType';

@Component({
  selector: 'app-added-problem-type',
  templateUrl: './added-problem-type.component.html',
  styleUrls: ['./added-problem-type.component.css']
})
export class AddedProblemTypeComponent implements OnInit{
  @Input() addedProblemType!: AddedProblemType;
  @Output() onDeleteEvent: EventEmitter<ProblemType> = new EventEmitter<ProblemType>();
  constructor(){}

  ngOnInit(): void {
  }

  onDelete(): void {
    this.onDeleteEvent.emit(this.addedProblemType.problemType);
  }
}
