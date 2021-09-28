import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MydailogComponent } from 'src/app/mydailog/mydailog.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() deviceXs!: boolean;
  isActive = false;
  public loggedIn=false;

  constructor(public dialog: MatDialog,private loginService:LoginService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(MydailogComponent,{
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.loggedIn=this.loginService.isLoggedIn();
  }
  logoutUser(){
    this.loginService.logout();
    location.reload()
  }

}
