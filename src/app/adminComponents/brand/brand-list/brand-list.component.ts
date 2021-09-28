import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/model/Category';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BrandData } from 'src/app/ModelInterface/modelInterface';



@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  @Input() deviceXs!:boolean;
  //side bar drop List
  typesOfCategory:Category[]=[];
  //for selecting value i.e coming from [(ngmodel)]
  catSelected!:Number;


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  dataSource!: MatTableDataSource<BrandData>;  
  //to hold the data that are coming from server
  brands:BrandData[]=[];

  displayedColumns: string[] = ['brandName','Action'];

  constructor(private router:Router,private http:HttpClient,private dialog: MatDialog,
    private brandService:BrandServiceService,private spinner: NgxSpinnerService) { }

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
    this.spinner.show();
               /** spinner ends after 5 seconds */
               setTimeout(() => {
               this.spinner.hide();
               }, 2000);
             this.getBrand();
  }    
  
  getBrand(){
    this.brands=[];
    this.brandService.getBrands().subscribe(
      (response:any)=>{
                 //console.log("consolelog"+response);
                 this.brands=response;
                 this.dataSource=new MatTableDataSource(this.brands);
                 this.dataSource.paginator=this.paginator;
                 this.dataSource.sort=this.sort;
                }
    )
  }
 

  updateEmployee(id: number){
    this.router.navigate(['update', id],{ skipLocationChange: true });
  }
 
  deleteBrand(any:string){
    console.log("delete brand "+any)
    if(any!=null){
      this.brandService.deleteBrand(any)
           .subscribe(
             (response:any)=>{
               //console.log(response);
               this.spinner.show();      
               this.getBrand();
               setTimeout(() => {
                this.spinner.hide();
                }, 2000);
             },error=> console.log(error)
             );
          }
       }
 
       updateBrand(any:string){
              //console.log("update brand"+any)
              this.router.navigate(['updateBrand',any]);
          }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}
  
  //userList on click event
  onCategorySelected(val:any){
    //you can call web api
     this.customFunction(val);
      }
     customFunction(val:any){
        //console.log(val);
        if(val==1){this.router.navigateByUrl("/userList");} 
        else if(val==2){this.router.navigateByUrl("/addBrand");}
        else if(val==3){this.router.navigateByUrl("/addModal");}
        else if(val==4){this.router.navigateByUrl("/admin")}
        else if(val==5){this.router.navigateByUrl("/addPart");}
        else if(val==6){this.router.navigateByUrl("/brandList");}
        else if(val==7){this.router.navigateByUrl("/modelList");}
        else if(val==8){this.router.navigateByUrl("/category");}

      } 

}
