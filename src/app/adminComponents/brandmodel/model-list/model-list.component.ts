import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Brand } from 'src/app/model/Brand';
import { Category } from 'src/app/model/Category';
import { ModelData } from 'src/app/ModelInterface/modelInterface';
import { BrandModelService } from 'src/app/service/brand-model.service';
//for the table view
/**export interface ModelData{
  modelId:string;
  modelName:string;
  brand:Brand[];
}**/

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  @Input() deviceXs!:boolean;
  //side bar drop List
  typesOfCategory:Category[]=[];
  //for selecting value i.e coming from [(ngModel)]
  catSelected!:Number;


  @ViewChild(MatPaginator,{static:true})
  paginator!:MatPaginator;

  @ViewChild(MatSort,{static:true})
  sort: MatSort = new MatSort;

  dataSource!: MatTableDataSource<ModelData>;  
  //to hold the data that are coming from server
  models:ModelData[]=[];
  displayedColumns:string[] =['brandName','modelName','Action'];

  constructor(private router:Router,private http:HttpClient,
    private spinner: NgxSpinnerService,private modelService:BrandModelService) { }

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
             this.getModel();
  }
   
   getModel(){
       this.models=[];
       this.modelService.getModels().subscribe(
        (response:any)=>{
         this.models=response;
         console.log(response);
         this.dataSource=new MatTableDataSource(this.models);
         this.dataSource.paginator=this.paginator;
         this.dataSource.sort=this.sort;
       });
       
     }
    
     updateModel(any:string){
      console.log("update model"+any)

      this.router.navigate(['updateModel',any],{ skipLocationChange: true });
    }
   
    deleteModel(any:string){
        console.log("delete model"+any)
        if(any!=null){
          this.modelService.deleteModel(any).subscribe(
            response=>{
              console.log(response);
              this.spinner.show();      
              this.getModel();
              setTimeout(() => {
               this.spinner.hide();
               }, 2000);
            },error=> console.log(error)
            );
          }
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

     
    
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }}
}
