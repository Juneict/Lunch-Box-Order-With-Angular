import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponentComponent } from '../alert-component/alert-component.component';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message : string, action : string = 'ok') {
    this._snackBar.open(message, action, {
      duration:5000,
      verticalPosition: 'top',
    });
  }
}
