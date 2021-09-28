import { Component, OnInit ,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mydailog',
  templateUrl: './mydailog.component.html',
  styleUrls: ['./mydailog.component.css']
})
export class MydailogComponent implements OnInit {
   
  constructor(private route:Router) {}

  
  searchGadgets=new FormGroup({
    userBookedId:new FormGroup({
      userBookedId:new FormControl('',[Validators.required])
    })

  })
  ngOnInit(): void {
  }
  
  submit(){
    this.route.navigate(['searchGadget/',this.searchGadgets.value.userBookedId]);
      }
  

}
