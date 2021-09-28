import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() deviceXs!: boolean;
  navbarfixed:boolean = false;

  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100)
    {
      this.navbarfixed = true;
    }
    else
    {
      this.navbarfixed = false;
    }
  }
  constructor(public shoppingCart: ShoppingCartService,private router:Router) { }
  searchGadgets=new FormGroup({
    userKeyword:new FormGroup({
      userKeyword:new FormControl('',[Validators.required])
    })

  })
  ngOnInit(): void {
  }
  
  searchByKeyword(userKeyword:string){
    console.log(userKeyword)
    this.router.navigate(['searchGadget/',userKeyword]);
      }
}
