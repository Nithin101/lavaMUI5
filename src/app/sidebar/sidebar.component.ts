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
    console.log("menuclick");
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
    console.log(menu);
    // $event.stopPropagation();
    // angular.element('.nav-menu li').removeClass('hovered');
    // angular.element($event.currentTarget).addClass('hovered');
    // angular.element('.submenu').removeClass('show');
    // angular.element($event.currentTarget).children('ul').addClass('show');
};

submenuClick($event){
  $event.stopPropagation();
  this.analyzeMenu = false;
  this.resourcesMenu = false;
  this.designMenu = false;
  this.zone.run(() => {});
  console.log('submenu'); 
}

@HostListener('document:click')
clickout() {
    console.log('clicked out ')
    this.analyzeMenu = false;
    this.resourcesMenu = false;
    this.designMenu = false;
}
}
