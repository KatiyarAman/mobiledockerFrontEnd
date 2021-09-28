import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BrandServiceService } from 'src/app/service/brand-service.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  @Input() deviceXs!: boolean;

  constructor(private snack:MatSnackBar,private brandService:BrandServiceService,
    private route:Router) { }

  ngOnInit(): void {
  }
  topVal = 0;
  onScroll(e:any) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }
 

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  
  searchDetails=new FormGroup({
    seriesFiled:new FormGroup({
      seriesName:new FormControl('')
    })
  })

  btnClick(){
    this.snack.open("Hey Welcome to this App","Cancel")
      }
}
