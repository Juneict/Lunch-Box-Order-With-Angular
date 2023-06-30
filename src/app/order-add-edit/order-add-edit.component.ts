import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.scss']
})
export class OrderAddEditComponent implements OnInit {
  menuForm : FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _orderService: OrderService, 
    private _coreService : CoreService,
    private _dialogRef: MatDialogRef<OrderAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.menuForm = this._fb.group({
        name : '',
        lunch : '',
        dinner : '',
        order_date : '',
        additional : '',
        note : ''
    })
   }

  ngOnInit(): void {
    this.menuForm.patchValue(this.data);
  }
  

  menus: string[] = [
    'အမဲကြော်',
    'အမဲနှပ်',
    'အမဲအူကြမ်း',
    'အမဲအသဲ',
    'ကြက်သားဟင်း',
    'ကြက်ကုန်းဘောင်',
    'ငါးကြင်းကြော်နှပ်',
    'မယူ'
  ]
  
  onFormSubmit(){
    if(this.menuForm.valid){

      if(this.data){
        this._orderService.updateOrder(this.data.id, this.menuForm.value).subscribe({
          next: (val : any) => {
            this._coreService.openSnackBar('အမှာစာ ပြင်ဆင်ပီးပါပြီ', 'done');
            this._dialogRef.close(true);
          },
          error:(err : any) => {
            console.log(err);
          }
        })
      }else {
        this._orderService.addOrder(this.menuForm.value).subscribe({
          next: (val : any) => {
            this._coreService.openSnackBar('အမှာစာ ဖြည့်သွင်းပီးပါပြီ', 'done');
            this._dialogRef.close(true);
          },
          error:(err : any) => {
            console.log(err);
          }
        })
      }  
    }
  }
}
