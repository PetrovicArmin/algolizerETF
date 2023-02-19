import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogOpenerService {

  constructor(
    private matDialog: MatDialog
  ) { }

  openDialog(component: ComponentType<any>, width: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.matDialog.open(component, {width, enterAnimationDuration, exitAnimationDuration});
  }
}
