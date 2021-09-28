import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BookUser } from 'src/app/ModelInterface/modelInterface';
import { BookedServiceService } from 'src/app/service/booked-service.service';
import { NgModule } from '@angular/core';
import { customFields } from 'src/app/shared/service/data/data.object';

@Component({
  selector: 'app-dash-board-list',
  templateUrl: './dash-board-list.component.html',
  styleUrls: ['./dash-board-list.component.css']
})
export class DashBoardListComponent implements OnInit {

  @Input() deviceXs!: boolean;

  dataForm!: FormGroup;
  params: any = {}
  fieldList: customFields[] = [];
  //side bar category drop list
  typesOfCategory: Category[] = [];
  //for selecting default category
  catSelected!: Number;
  
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  dataSource!: MatTableDataSource<BookUser>;
  displayedColumns: string[] = ['userName','userBookedId','userBrand','userModel','userStatus','userIssue','Action'];
  bookUser:BookUser[]=[];
  
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  

  constructor(private snack:MatSnackBar,private router:Router,private route: ActivatedRoute,
    private bookUserService:BookedServiceService) { }
    
    topVal = 0;
    onScroll(e:any) {
      let scrollXs = this.deviceXs ? 55 : 73;if (e.srcElement.scrollTop < scrollXs)
       { this.topVal = e.srcElement.scrollTop;} else {this.topVal = scrollXs; }
    }
    sideBarScroll() {let e = this.deviceXs ? 160 : 130;return e - this.topVal;}
  
    ngOnInit(): void {

      this.route.params.subscribe(params=>{
       // console.log(params)
           // this.params = JSON.parse(params.params)
            this.params.action = params.action
            this.params.data = params.data
        this.fieldList = []
        this.fieldList = JSON.parse(this.params.headerObject)
        //console.log(this.fieldList)
      })
       this.typesOfCategory=[{Id:1,Name:"userList"},{Id:2,Name:"addBrand"},{Id:3,Name:"addModal"},
       {Id:4,Name:"adminDash"},{Id:5,Name:"addParts"},{Id:6,Name:"brandList"},
       {Id:7,Name:"modelList"},{Id:8,Name:"addMenu"}];
       this.getBookUser();
      }
  
  searchDetails=new FormGroup({
      seriesFiled:new FormGroup({
      seriesName:new FormControl('')
      })
    })

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
   }
  btnClick(){
    console.log("btn click");
    this.snack.open("Hey Welcome to this App","Cancel")
      }

  getBookUser(){
    this.bookUser=[];
        this.bookUserService.getBookUserDetails().subscribe((response:any)=>{
            //this.bookUser=response;
            let ob ={};
            ob=response;
            //console.log(ob);
            this.fieldList = []
            this.dataSource=new MatTableDataSource(response);
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
           })
        
      }
      editBookedUser(any:string){
        //console.log("editBookedUser"+any);
        this.router.navigate(['getbookedUserDetails',any],{ skipLocationChange: true });
      }
      updateBrand(any:string){}
      onCategorySelected(val:any){ this.customFunction(val);}
      customFunction(val:any){
        console.log(val);
        if(val==1)this.router.navigateByUrl("/userList");
        else if(val==2) this.router.onSameUrlNavigation;
        else if(val==3){this.router.navigateByUrl("/addModal");}
        else if(val==4){this.router.navigateByUrl("/admin")}
        else if(val==5){this.router.navigateByUrl("/addPart");}
        else if(val==6){this.router.navigateByUrl("/brandList");}
        else if(val==7){this.router.navigateByUrl("/modelList");}
        else if (val==8){this.router.navigateByUrl("/category");}
      }

}
