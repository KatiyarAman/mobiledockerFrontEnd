import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';
  mediaSub!:Subscription;
 deviceXs!:boolean;
  constructor(public mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias);
      this.deviceXs = res.mqAlias === "xs" ? true : false;
    })
  }
  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
