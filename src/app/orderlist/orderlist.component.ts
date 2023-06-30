import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrderAddEditComponent } from '../order-add-edit/order-add-edit.component';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'lunch',
    'dinner',
    'order_date',
    'additional',
    'note',
    'action'
];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( 
    private _orderService : OrderService, 
    private _dialog: MatDialog,
    private _coreService : CoreService
  ) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  openOrderForm(){
    const dialogRef = this._dialog.open(OrderAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if( val){
          this.getOrderList();
        }
      }
    });
  }

  openEditForm(data :any){
    const dialogRef = this._dialog.open(OrderAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrderList();
        }
      }
    })
  }
  
  getOrderList(){
    this._orderService.getOrderList().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=>{
        console.log(err); 
      }

    })
  }

  deleteOrder(id : number){    
    this._orderService.deleteOrder(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar("Order Deleted")
        this.getOrderList()
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
}
