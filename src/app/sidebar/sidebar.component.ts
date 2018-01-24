import { Component, OnInit, ElementRef, HostListener, NgZone } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private zone: NgZone) { }
  analyzeMenu : boolean = false;
  resourcesMenu : boolean = false;
  designMenu : boolean = false;

  ngOnInit() {
  }
  menuclick = function ($event, menu) {
    $event.stopPropagation();
    if(menu == 'analyze'){
      this.analyzeMenu = true;
      this.resourcesMenu = false;
      this.designMenu = false;
    }
    else if(menu == 'design'){
      this.analyzeMenu = false;
      this.resourcesMenu = false;
      this.designMenu = true;
    }
    else if(menu == 'resource'){
      this.analyzeMenu = false;
      this.resourcesMenu = true;
      this.designMenu = false;
    }
};

submenuClick($event){
  $event.stopPropagation();
  this.analyzeMenu = false;
  this.resourcesMenu = false;
  this.designMenu = false;
  this.zone.run(() => {});
}

@HostListener('document:click')
clickout() {
    this.analyzeMenu = false;
    this.resourcesMenu = false;
    this.designMenu = false;
}
}
