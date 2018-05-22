import { Component, OnInit, TemplateRef, AfterViewInit, ContentChild } from '@angular/core';
import { LavaService } from '../Service/lava.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { setDefaultService } from 'selenium-webdriver/chrome';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// declare var $: any;

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css'],
  providers: [ConfigService]
})
export class BroadcastComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  public loading = false;
  public selectAppList; selectApp; appModalDisplay;

  constructor(
    private _lavaService: LavaService, private router: Router, private _global: ConfigService, private modalService: BsModalService
  ) {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.selectAppList = this._global.config_data.APP_CONFIG;
    // this.openModal(this.template);

    // Step 1. Get all the object keys.
    // this._global.config_data.APP_CONFIG
    // let evilResponseProps = Object.keys(this._global.config_data.APP_CONFIG);
    // // Step 2. Create an empty array.
    // let goodResponse = [];
    // // Step 3. Iterate throw all keys.
    // for (var prop of evilResponseProps) {
    //   goodResponse.push(evilResponseProps[prop]);
    // }


    // this.selectAppList = this._global.APP_CONFIG;
    // this.selectApp = this.selectAppList[0].app_id
    console.log(Object.keys(this.selectAppList).length);
    if (Object.keys(this.selectAppList).length > 1) {
    //  $('#app-modal').modal('show');
     // this.appModalDisplay = "block";
      // angular.element('#app-modal').modal('show');
      //  angular.element('#app-modal').modal('show');
    // } else {
      // setTimeout(() => {
      //   this.getInstantBroadcast();
      // }, 2000);

    }
  }

  //
  openModal( template: TemplateRef<'template'>) {
    this.modalRef = this.modalService.show(template);
  }




  getInstantBroadcast = function () {
    console.log('hit selectApp', this.selectApp);

    this._lavaService.getInstantBroadcast(this.selectApp).then(data => {
      this.instantBroadcastData = JSON.parse(data);
    },
      error => {
        console.log(error);
      });
  };

  clearSubscriptions (segmentDesign, event) {
    console.log(event);
    console.log(event.target.checked);
  }
  goBack() {
    window.history.back();
  }

}
