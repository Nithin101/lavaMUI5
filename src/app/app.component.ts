import { Component } from '@angular/core';
import { MySharedService } from './Service/MySharedService';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _mySharedService : MySharedService
  ) { }
  title = 'app';
  ngOnInit() {
  }
}
