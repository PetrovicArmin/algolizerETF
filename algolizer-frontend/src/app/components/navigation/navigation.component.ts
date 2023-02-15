import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit{
  applicationName: string = "Algolizer ETF";
  version: string = "1.0.0";
  developerEmail: string = "apetrovic1@etf.unsa.ba";

  constructor() {

  } 
  ngOnInit(): void {
    
  }

}
