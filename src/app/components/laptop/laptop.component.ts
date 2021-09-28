import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
  @Input() deviceXs!: boolean;

  constructor(private snack:MatSnackBar) { }

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
    console.log("btn click");
    this.snack.open("Hey Welcome to this App","Cancel")
      }
}
