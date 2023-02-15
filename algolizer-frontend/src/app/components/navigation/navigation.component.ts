import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit{
  applicationName: string = "Algolizer ETF";
  version: string = "1.0.0";
  showCircle: Boolean = false;

  constructor() {

  } 
  ngOnInit(): void {
    
  }

  refreshRecommendations():void {
    this.showCircle = true;
    //call server to bring new recommendations from AI that we will build 
    setTimeout(() => {
      //if it is really fast, then do it here just to simulate slowness.
      this.showCircle = false;
    }, 1000);
  }

}
