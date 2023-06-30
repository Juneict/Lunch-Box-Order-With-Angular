import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderAddEditComponent } from '../order-add-edit/order-add-edit.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {


  ngOnInit(): void {
  }
  constructor(private dialogRef: MatDialog){

  }
  openOrderForm(){
    this.dialogRef.open(OrderAddEditComponent);
  }

}
