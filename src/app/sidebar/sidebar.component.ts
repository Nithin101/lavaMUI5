import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  analyzeMenu : boolean = false;

  ngOnInit() {
  }
  menuclick = function ($event, menu) {
    console.log($event);
    if(menu == 'analyze'){
      this.analyzeMenu = true
    }
    console.log(this.analyzeMenu);
    // $event.stopPropagation();
    // angular.element('.nav-menu li').removeClass('hovered');
    // angular.element($event.currentTarget).addClass('hovered');
    // angular.element('.submenu').removeClass('show');
    // angular.element($event.currentTarget).children('ul').addClass('show');
};

}
