import { Component, OnInit,AfterViewInit,ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserData } from 'src/app/ModelInterface/modelInterface';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  @Input() deviceXs!: boolean;
  private mediaSub!: Subscription;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  dataSource!: MatTableDataSource<UserData>;

  //to hold the data that are coming from srver
  users: UserData[] = [];

  //side bar category drop list
  typesOfCategory: Category[] = [];
  //for selecting default category
  catSelected!: Number;
  //define a value to hold data that are coming from html page on click event
  modifiedText!: string;
  
  
  
  displayedColumns: string[] = ['userId', 'userEmail', 'userName','userMobile', 'userCity', 'userZipcode', 'userRole','userAction'];
  
  
  constructor(private userService:UserService,
              private cdRef: ChangeDetectorRef,
              private router:Router,private spinner: NgxSpinnerService,
               private mediaObserver: MediaObserver) { }
   ngOnInit(): void {
    

        //to initialize Category Array
          this.typesOfCategory=[
            {Id:1,Name:"userList"},
      {Id:2,Name:"addBrand"},
      {Id:3,Name:"addModal"},
      {Id:4,Name:"adminDash"},
      {Id:5,Name:"addParts"},
      {Id:6,Name:"brandList"},
      {Id:7,Name:"modelList"},
      {Id:8,Name:"addMenu"}
          ];
          this.catSelected=4;

          /** spinner starts on init */
               this.spinner.show();
               /** spinner ends after 5 seconds */
               setTimeout(() => {
               this.spinner.hide();
               }, 2000);
             this.getUser();
          } 

      //userList on click event
  onCategorySelected(val:any){
    //you can call web api
     this.customFunction(val);
      }
     customFunction(val:any){
        console.log(val);
        if(val==1){this.router.navigateByUrl("/userList");} 
        else if(val==2){this.router.navigateByUrl("/addBrand");}
        else if(val==3){this.router.navigateByUrl("/addModal");}
        else if(val==4){this.router.navigateByUrl("/admin")}
        else if(val==5){this.router.navigateByUrl("/addPart");}
        else if(val==6){this.router.navigateByUrl("/brandList");}
        else if(val==7){this.router.navigateByUrl("/modelList");}
        else if(val==8){this.router.navigateByUrl("/category");}

      } 
          onClick(val:any){
            console.log("onclick "+val)
          }

  getUser(){
    this.users=[];
    this.userService.getUsers().subscribe((response:any)=>{
       //console.log(response)
       this.users=response;
       //console.log(this.users);
       this.dataSource=new MatTableDataSource(this.users); 
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

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
}
