import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  @Input() deviceXs!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
